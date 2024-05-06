/* eslint-disable prefer-destructuring */
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { schoolService } = require('../services');

const createSchool = catchAsync(async (req, res) => {
  const school = await schoolService.createSchool(req.body);
  res.status(httpStatus.CREATED).send(school);
});

const getSchools = catchAsync(async (req, res) => {
  let filter = {};
  const role = req.user.role;
  const assignedTo = req.user.asssignedTo;

  if (role === 'district_officer') {
    filter = { district: assignedTo };
  } else if (role === 'block_officer') {
    filter = { block: assignedTo };
  } else if (role === 'state_officer') {
    // No specific filtering needed for state officer
  }

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await schoolService.querySchool(filter, options);
  res.send(result);
});

const getSchoolsStats = catchAsync(async (req, res) => {
  let filter = {};
  let value;
  const role = req.user.role;
  const assignedTo = req.user.asssignedTo;
  if (role === 'division_officer') {
    filter = { division: assignedTo };
    value = 'district';
  } else if (role === 'district_officer') {
    filter = { district: assignedTo };
    value = 'block';
  } else if (role === 'block_officer') {
    filter = { block: assignedTo };
    value = 'name';
  } else if (role === 'state_officer') {
    value = 'division';
    // No specific filtering needed for state officer
  }

  const result = await schoolService.getSchoolStat(filter, value);
  res.send(result);
});

const getSchoolsStatsAll = catchAsync(async (req, res) => {
  let filter = {};
  const role = req.user.role;
  const assignedTo = req.user.asssignedTo;
  if (role === 'division_officer') {
    filter = { division: assignedTo };
  } else if (role === 'district_officer') {
    filter = { district: assignedTo };
  } else if (role === 'block_officer') {
    filter = { block: assignedTo };
  } else if (role === 'state_officer') {
    // No specific filtering needed for state officer
  }

  const result = await schoolService.getSchoolStatAll(filter);
  res.send(result);
});

const getSchoolCountDistrict = catchAsync(async (req, res) => {
  const result = await schoolService.getSchoolCountDistrict();
  res.send(result);
});

const getSchoolCountByBlock = catchAsync(async (req, res) => {
  const district = req.user.asssignedTo;
  const result = await schoolService.getSchoolCountByBlock(district);
  res.send(result);
});

const getSchool = catchAsync(async (req, res) => {
  const school = await schoolService.getSchoolByUdisecode(req.params.udisecode);
  if (!school) {
    throw new ApiError(httpStatus.NOT_FOUND, 'school not found');
  }
  res.send(school);
});

const getDivisionList = catchAsync(async (req, res) => {
  const districtList = await schoolService.getDivisionList();
  res.send(districtList);
});

const getDivisionWiseStat = catchAsync(async (req, res) => {
  const districtList = await schoolService.getDivisionStats(req.body.division);
  res.send(districtList);
});

const getDistrictList = catchAsync(async (req, res) => {
  const districtList = await schoolService.getDistrictList();
  res.send(districtList);
});

const getBlockList = catchAsync(async (req, res) => {
  const district = req.body.district;
  const districtList = await schoolService.getBlockList(district);
  res.send(districtList);
});

const getStudentClassWiseCount = catchAsync(async (req, res) => {
  let filter = {};
  const role = req.user.role;
  const assignedTo = req.user.asssignedTo;
  if (role === 'division_officer') {
    filter = { district: assignedTo };
  } else if (role === 'district_officer') {
    filter = { district: assignedTo };
  } else if (role === 'block_officer') {
    filter = { block: assignedTo };
  } else if (role === 'state_officer') {
    // No specific filtering needed for state officer
  }

  const result = await schoolService.getStudentClassWiseCount(filter);
  res.send(result);
});

const getSchoolDivisionWise = catchAsync(async (req, res) => {
  const result = await schoolService.getSchoolDivisionWise(req.body.division);
  res.send(result);
});

const getSchoolDistrictWise = catchAsync(async (req, res) => {
  const result = await schoolService.getSchoolDistrictWise(req.body.district);
  res.send(result);
});

const getSchoolBlockWise = catchAsync(async (req, res) => {
  const result = await schoolService.getSchoolBlockWise(req.body.block);
  res.send(result);
});

const getSchoolList = catchAsync(async (req, res) => {
  const result = await schoolService.getSchoolList(req.body.block);
  res.send(result);
});

const getManagWiseTeacherStudent = catchAsync(async (req, res) => {
  const result = await schoolService.getMnagmentWiseTeacherStudent();
  res.send(result);
});

const getDivisionStatsDistrictWise = catchAsync(async (req, res) => {
  const result = await schoolService.getDivisionStatsDistrictWise(req.body.district);
  res.send(result);
});

const getDivisionStatsBlockWise = catchAsync(async (req, res) => {
  const result = await schoolService.getDivisionStatsBlockWise(req.body.block);
  res.send(result);
});

const getSchoolByudiseArray = catchAsync(async (req, res) => {
  const result = await schoolService.getSchoolByudiseArray(req.body.udisecodeArray);
  res.send(result);
});

const updateSchool = catchAsync(async (req, res) => {
  const school = await schoolService.updateSchoolByScode(req.params.scode, req.body);
  res.send(school);
});
module.exports = {
  createSchool,
  getSchools,
  getSchool,
  getSchoolList,
  getDistrictList,
  getBlockList,
  getSchoolsStats,
  getSchoolCountDistrict,
  getSchoolCountByBlock,
  getStudentClassWiseCount,
  getSchoolDivisionWise,
  getSchoolDistrictWise,
  getSchoolBlockWise,
  getSchoolsStatsAll,
  getDivisionList,
  getDivisionWiseStat,
  updateSchool,
  getManagWiseTeacherStudent,
  getDivisionStatsDistrictWise,
  getDivisionStatsBlockWise,
  getSchoolByudiseArray,
};
