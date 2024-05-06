/* eslint-disable no-console */
const httpStatus = require('http-status');
const cron = require('node-cron');
const axios = require('axios');
const { Attendance, School } = require('../models');
const ApiError = require('../utils/ApiError');

const fetchDataAndStoreInDB = async (scode) => {
  try {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    const response = await axios.get(
      `http://143.244.130.179/webservices/dailyattendancereport/${scode}/${year}-${month}-01`
    );
    const { data } = response;

    // Check if data already exists for the given scode and date
    const existingAttendance = await Attendance.findOne({ scode, date });
    if (existingAttendance) {
      await Attendance.updateOne({ scode, date }, data);
      console.log(`Attendance data for scode ${scode} and date ${date} updated successfully.`);
    } else {
      const attendance = new Attendance({ scode, date, ...data });
      await attendance.save();
      console.log(`Attendance data for scode ${scode} and date ${date} stored successfully.`);
    }
  } catch (error) {
    console.error(`Error fetching or storing data for scode ${scode} `, error);
  }
};

const getData = async () => {
  try {
    const schools = await School.find({}, { code: 1 });
    // eslint-disable-next-line no-restricted-syntax
    for (const school of schools) {
      // eslint-disable-next-line no-await-in-loop
      await fetchDataAndStoreInDB(school.code);
    }
  } catch (error) {
    console.error('Error querying schools or fetching data:', error);
  }
};

// cron.schedule(
//   '0 15 * * *',
//   async () => {
//     console.log('Running getData cron job...');
//     await getData();
//   },
//   {
//     timezone: 'Asia/Kolkata',
//   }
// );

const getAllAttendanceCount = async () => {
  const result = await Attendance.aggregate([
    {
      $unwind: '$resultlist',
    },
    {
      $group: {
        _id: '$resultlist.classSection',
        totalPresent: { $sum: '$resultlist.totalPresent' },
        totalAbsent: { $sum: '$resultlist.totalAbsent' },
      },
    },
  ]);
  return result;
};

const getAttendanceByDate = async (scode, date) => {
  return Attendance.findOne({ scode, date });
};
const CreateORUpdateAttendance = async (scode, date, reqBody) => {
  let attendance = await getAttendanceByDate(scode, date);
  if (!attendance) {
    attendance = new Attendance(reqBody);
  } else {
    Object.assign(attendance, reqBody);
  }
  // Save the instance
  await attendance.save();
  return attendance;
};

module.exports = {
  getAllAttendanceCount,
  getAttendanceByDate,
  CreateORUpdateAttendance,
};
