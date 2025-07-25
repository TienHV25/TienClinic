import { where } from 'sequelize';
import db from '../models/index';
require('dotenv').config();

let postBookAppointment = (data) => {
    return new Promise(async (resolve,reject) => {
       try {
         if(!data){
            resolve({
            errCode : 1,
            message : "Misisng input parameter"
           })
         }else{
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
                    doctorID: data?.doctorID,
                    patienID: user[0]?.id,
                    date: data?.date,
                    timeType: data?.timeType
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

module.exports = {
    postBookAppointment: postBookAppointment
}