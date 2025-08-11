import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (doctorID, token) => {
  return `${process.env.URL_REACT}/verify-booking?token=${token}&doctorID=${doctorID}`;
};

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      
      if (
        !data.fullName ||
        !data.phoneNumber ||
        !data.email ||
        !data.address ||
        !data.reason ||
        !data.date ||
        !data.gender
      ) {
        return resolve({
          errCode: 1,
          message: 'Missing input parameter'
        });
      }

      const doctorId = data.doctorId;
      const timeType = data.timeType;
      const date = data.date;

      
      const existingConfirmed = await db.Booking.findOne({
        where: {
          doctorID: doctorId,
          date: date,
          timeType: timeType,
          statusID: 'S2'
        }
      });

      if (existingConfirmed) {
        return resolve({
          errCode: 2,
          message: 'This time slot has already been booked'
        });
      }

      
      const [user] = await db.User.findOrCreate({
        where: { email: data.email },
        defaults: {
          email: data.email,
          roleID: 'R3'
        }
      });

     
      const existingPending = await db.Booking.findOne({
        where: {
          doctorID: doctorId,
          date: date,
          timeType: timeType,
          statusID: 'S1'
        }
      });

      if (existingPending) {
        
        if (existingPending.patienID === user.id) {
          return resolve({
            errCode: 3,
            message: 'You have already booked this slot. Please check your email to confirm.'
          });
        } else {
          return resolve({
            errCode: 4,
            message: 'This time slot is already booked and awaiting confirmation by another patient.'
          });
        }
      }

      
      const token = uuidv4();
      const newBooking = await db.Booking.create({
        statusID: 'S1',
        doctorID: doctorId,
        patienID: user.id,
        date: date,
        timeType: timeType,
        token: token
      });

      const userUpdate = await db.User.update({
        phonenumber: data.phoneNumber,
        address: data.address,
        gender: data.gender,
        },
        {
          where:{
            email:data.email 
          }
        }
      )

      
      try {
        await emailService.sendEmail({
          receiverEmail: data.email,
          patientName: data.fullName,
          time: data.timeBooking,
          language: data.language,
          doctorName: data.doctorName,
          redirectLink: buildUrlEmail(doctorId, token)
        });
      } catch (err) {
        console.error('sendEmail failed: ', err);
      }

      return resolve({
        errCode: 0,
        message: 'Booking created successfully. Please check your email to confirm.'
      });

    } catch (error) {
      reject(error);
    }
  });
};

let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        return resolve({
          errCode: 1,
          message: 'Missing input parameter'
        });
      }

      let appointment = await db.Booking.findOne({
        where: {
          doctorID: data.doctorId,
          token: data.token,
          statusID: 'S1'
        },
        raw: false
      });

      if (!appointment) {
        return resolve({
          errCode: 2,
          message: 'Appointment has been activated or does not exist'
        });
      }

      const existingConfirmed = await db.Booking.findOne({
        where: {
          doctorID: appointment.doctorID,
          timeType: appointment.timeType,
          statusID: 'S2'
        }
      });

      if (existingConfirmed && existingConfirmed.id !== appointment.id) {
        return resolve({
          errCode: 3,
          message: 'This time slot has already been booked'
        });
      }

      await appointment.update({ statusID: 'S2' });

      return resolve({
        errCode: 0,
        message: 'Update the appointment succeed!'
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  postBookAppointment,
  postVerifyBookAppointment
};
