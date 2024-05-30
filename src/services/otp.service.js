/* eslint-disable class-methods-use-this */
// const httpStatus = require('http-status');
const axios = require('axios');
const crypto = require('crypto');
const { Otp } = require('../models');
// const ApiError = require('../utils/ApiError');
const config = require('../config/config');

// class SMSAlert {
//   constructor() {
//     this.userID = config.SMS.SMS_USERID;
//     this.userPwd = '4DgN#F3n8ztVSK';
//     this.secureKey = config.SMS.SMS_SECUREKEY;
//     this.senderID = config.SMS.SMS_SENDERID;
//     this.templateID = config.SMS.SMS_TEMPLETID;
//   }

class SMSAlert {
  constructor() {
    this.userID = config.SMS.SMS_USERID;
    this.userPwd = '4DgN#F3n8ztVSK';
    this.secureKey = config.SMS.SMS_SECUREKEY;
    this.senderID = config.SMS.SMS_SENDERID;
    this.templateID = config.SMS.SMS_TEMPLETID;
  }

  validateMobileNumber(mobileNo) {
    // Ensure the mobile number is a valid format (e.g., E.164 format with country code)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(mobileNo);
  }

  async sendOTPMsg(mobileNo, message) {
    if (!this.validateMobileNumber(mobileNo)) {
      throw new Error('Invalid mobile number format');
    }

    const smsservicetype = 'otpmsg';
    const encryptedPassword = this.encryptedPassword(this.userPwd);
    const key = this.hashGenerator(this.userID, this.senderID, message, this.secureKey);

    const query = `username=${encodeURIComponent(this.userID)}&password=${encodeURIComponent(
      encryptedPassword
    )}&smsservicetype=${encodeURIComponent(smsservicetype)}&content=${encodeURIComponent(
      message
    )}&mobileno=${encodeURIComponent(mobileNo)}&senderid=${encodeURIComponent(this.senderID)}&key=${encodeURIComponent(
      key
    )}&templateid=${encodeURIComponent(this.templateID)}`;

    const response = await axios.post('https://msdgweb.mgov.gov.in/esms/sendsmsrequestDLT', query, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log(response.data);
    return response.data;
  }

  encryptedPassword(password) {
    const encPwd = Buffer.from(password, 'utf-8');
    const sha1 = crypto.createHash('sha1');
    const pp = sha1.update(encPwd).digest();
    return pp.toString('hex');
  }

  hashGenerator(username, senderID, message, secureKey) {
    const data = `${username}${senderID}${message}${secureKey}`;
    const genKey = Buffer.from(data, 'utf-8');
    const sha512 = crypto.createHash('sha512');
    const secKey = sha512.update(genKey).digest();
    return secKey.toString('hex');
  }
}

const createOtp = async (mobNumber, otp) => {
  const otpDoc = {
    mobNumber,
    otp,
  };
  await Otp.create(otpDoc);
};

const generateOTP = () => {
  const chars = '0123456789';
  let otp = '';
  for (let i = 0; i < 6; i += 1) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    otp += chars[randomIndex];
  }
  return otp;
};

const verifyOtp = async (mobNumber, otp) => {
  const otpDoc = await Otp.find({ mobNumber, otp });

  if (!otpDoc[0] || !otpDoc[0].otp) {
    throw new Error('Otp does not match');
  }

  await Otp.deleteMany({ mobNumber });

  return true;
};

// const smsAlert = new SMSAlert();

const smsAlert = new SMSAlert();
// const mobileNumber = '+917798940629'; // Example number in E.164 format

// smsAlert.sendOTPMsg(mobileNumber, 'Your OTP is 123456')
//   .then(response => console.log('OTP sent successfully:', response))
//   .catch(error => console.error('Error sending OTP:', error.message));

module.exports = {
  smsAlert,
  createOtp,
  generateOTP,
  verifyOtp,
};
