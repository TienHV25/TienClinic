import { where } from 'sequelize';
import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';
import {v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (doctorID,token) => {
    let result = '';
    result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorID=${doctorID}`
    return result;
}

let postBookAppointment = (data) => {
    return new Promise(async (resolve,reject) => {
       try {
         if(!data){
            resolve({
            errCode : 1,
            message : "Misisng input parameter"
           })
         }else{

            let token = uuidv4();
             
            await emailService.sendEmail({
                receiverEmail: data?.email,
                patientName: data?.fullName,
                time:data?.timeBooking,
                language:data?.language,
                doctorName:data?.doctorName,
                redirectLink: buildUrlEmail(data?.doctorId,token)
            })

            let user = await db.User.findOrCreate({
                where: { email: data?.email},
                defaults: {
                    email:data?.email,
                    roleID: 'R3'
                }
            });

            if(user && user[0]){
                await db.Booking.findOrCreate({
                    where: { patienID: user[0]?.id},
                    defaults: {
                    statusID: 'S1',
                    doctorID: data?.doctorId,
                    patienID: user[0]?.id,
                    date: data?.date,
                    timeType: data?.timeType,
                    token: token
                    }
                })
            }

            resolve({
                errCode : 0,
                message: 'Save infor succeed !'
            });
         }
        } catch (error) {
          reject(error);
        }
    }) 
}

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve,reject) => {
        try {
            if(!data.token || !data.doctorId){
                resolve({
                errCode : 1,
                message : "Misisng input parameter"
            }) 
        }else{
            let appointment = await db.Booking.findOne({
                where: {
                    doctorID:data.doctorId,
                    token:data.token,
                    statusID: 'S1'
                },
                raw: false
            })

            if(appointment){
                await appointment.update({
                    statusID: 'S2'
                })
                resolve({
                    errCode : 0,
                    message : "Update the appointment succeed!"
                }) 
            }else{
                resolve({
                    errCode : 2,
                    message : "Appointment has been activated or deos not exists"
                }) 
            }
        }}catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}