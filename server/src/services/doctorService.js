import { where } from 'sequelize';
import db from '../models/index';
import moment from 'moment';
require('dotenv').config();
import { Op } from 'sequelize';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve,reject) => 
    {
       try {
        let users = await db.User.findAll({
            limit: limit,
            order: [[ "createdAt","DESC"]],
            attributes:{
                exclude: ['password']
            },
            where: {roleID:'R2'},
            include: [
                {model: db.Allcode, as: 'positionData', attributes: ['valueEn','valueVi']},
                {model: db.Allcode, as: 'genderData', attributes: ['valueEn','valueVi']},
            ],
            raw: true,
            nest: true
        })
          resolve({
             errCode: 0,
             data: users
          })
       } catch (error) {
          reject(error);
       }
    })
}

let getAllDoctors = () => {
    return new Promise(async (resolve,reject) => {
        try {
           let doctors = await db.User.findAll({
              where: {roleID:'R2'},
              attributes:{
                exclude: ['password','image']
              },
            });
           resolve({
             errCode : 0,
             data : doctors
           })
        } catch (error) {
            reject(error);
        }
    })
}

let saveInforDoctor = (inputdata) => {
    return new Promise(async (resolve,reject) => {
        try {
           if (!inputdata.doctorId || !inputdata.contentHTML || !inputdata.contentMarkdown || !inputdata.action
               || !inputdata.priceId || !inputdata.paymentId || !inputdata.provinceId || !inputdata.nameClinic || 
               !inputdata.addressClinic 
            ) {
            resolve({
             errCode : 1,
             message : "Misisng input parameter"
           })
           return;
           }
           else {
            if(inputdata.action === "CREATE") {
              await db.Markdown.create({
                contentHTML: inputdata.contentHTML,
                contentMarkdown: inputdata.contentMarkdown,	
                description: inputdata.description,
                doctorId: inputdata.doctorId
             });
              await db.Doctor_infor.create({
                doctorId: inputdata.doctorId,
                priceId:  inputdata.priceId,
                paymentId: inputdata.paymentId,
                provinceId: inputdata.provinceId,
                nameClinic: inputdata.nameClinic,
                addressClinic: inputdata.addressClinic,
                note: inputdata.note
             });
            }else if(inputdata.action === "EDIT"){
               await db.Markdown.update({
                contentHTML: inputdata.contentHTML,
                contentMarkdown: inputdata.contentMarkdown,	
                description: inputdata.description
                },
                {
                where: {
                    doctorId: inputdata.doctorId
                }
                }
            )
               await db.Doctor_infor.update({
                    priceId: inputdata.priceId, 
                    paymentId: inputdata.paymentId,
                    provinceId: inputdata.provinceId,
                    nameClinic: inputdata.nameClinic,
                    addressClinic: inputdata.addressClinic,
                    note: inputdata.note
                }, {
                    where: {
                        doctorId: inputdata.doctorId
                    }
                }
            );
            }else {
                resolve({
                    errCode: 1,
                    message: "Invalid action. Must be CREATE or EDIT"
                });
                return;
            }
            
            resolve({
             errCode : 0,
             message : "Save infor data successfully"
            })
           }
        } catch (error) {
             console.error('Error in saveInforDoctor:', error); 
            reject(error);
        }
    })
}

let getDetailDoctorById = (id) => {
    return new Promise(async (resolve,reject) => {
        try {
          if(!id) {
            resolve({
                errCode : 1,
                message: "Mising id"
            })
          } else {
            let data = await db.User.findOne({
                attributes:{
                  exclude: ['password']
                },
                where: {id:id},
                include: [
                    {model: db.Markdown,attributes: ['description','contentMarkdown','contentHTML']},
                    {model: db.Doctor_infor,attributes: ['priceId','paymentId','provinceId','nameClinic','addressClinic','note']},
                    {model: db.Allcode, as: 'positionData', attributes: ['valueEn','valueVi']},
                ],
                raw: false,
                nest: true
            }
            )
            if(data && data.image) {
                data.image = new Buffer(data.image,'base64').toString('binary');
            }
            if(!data) data = [];
            resolve({
                errCode : 0,
                data: data
            })
          }
        } catch (error) {
            reject(error);
        }
    })
}

let bulkCreateSchedule = (data) => {
    return new Promise(async(resolve,reject) => {
        try {
        if(!data.arrSchedule){
            resolve({
                errCode : 1,
                message: "Mising required parameters"
            })
        }
        else{
          let schedule = data.arrSchedule;
          if(schedule && schedule.length > 0) {
            let existingSchedules = await db.Schedule.findAll({
                    where: {
                        [Op.or]: schedule.map(item => ({
                            doctorID: item.doctorID,
                            date: item.date,
                            timeType: item.timeType,
                        }))
                    }
                });

            if(existingSchedules && existingSchedules.length > 0) {
                    let conflictingTimeType = existingSchedules[0].timeType;
                    resolve({
                        errCode: 2,
                        message: "This doctor already has a schedule for this time slot",
                        conflictingTimeType: conflictingTimeType
                    });
            }
            if(existingSchedules.length === 0) {
                schedule = schedule.map(item => {
                item.maxNumber = MAX_NUMBER_SCHEDULE;
                item.date = new Date(item.date);
                return item;
                })
                await db.Schedule.bulkCreate(schedule);
            }
          }
         
          resolve({
            errCode : 0,
            essage: "Create schedule successfully"
          })
        }
        } catch (error) {
            reject(error);
        }
    }
    )
}

let getScheduleByDate = (doctorID,date) => {
    return new Promise((async (resolve,reject) => {
        try {
            if(!doctorID || !date) {
                resolve({
                    errCode: 1,
                    message: "Missing requried parameter"
                })
            } else {
                let data = await db.Schedule.findAll({
                    where:{
                        doctorID: doctorID,
                        date: date
                    },
                    include: [
                    {model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn','valueVi']},
                    ],
                    raw: false,
                    nest: true
                });

                if(!data) data = [];

                resolve({
                    errCode: 0,
                    message: 'Get schedule successfully',
                    data: data
                })
            }
        } catch (error) {
            reject(error);
        }
    }))
}

let getExtraInforDoctorById = (doctorId) =>{
    return new Promise(async (resolve,reject) => {
        try {
        if(!doctorId) {
          resolve({
            errCode : 1,
            message: "Mising required parameters"
          })
        } else {
            let data = await db.Doctor_infor.findOne({
                where: {doctorId:doctorId},
                include: [
                    {model: db.Allcode, as: 'priceIdData', attributes: ['valueEn','valueVi']},
                    {model: db.Allcode, as: 'provinceIdData', attributes: ['valueEn','valueVi']},
                    {model: db.Allcode, as: 'paymentIdData', attributes: ['valueEn','valueVi']}
                    ],
                    raw: false,
                    nest: true
            })
            resolve({
                errCode: 0,
                message: 'Get doctor infor successfully',
                data: data
            })
        }
        } catch (error) {
            reject(error);
        }
    })
}

let getProfileDoctorById = (doctorId) =>{
    return new Promise(async (resolve,reject) => {
        try {
        if(!doctorId) {
          resolve({
            errCode : 1,
            message: "Mising required parameters"
          })
        } else {
            let data = await db.User.findOne({
                attributes:{
                  exclude: ['password']
                },
                where: {id:doctorId},
                include: [
                    {model: db.Markdown,attributes: ['description']},
                    {model: db.Allcode, as: 'positionData', attributes: ['valueEn','valueVi']},
                    {model: db.Doctor_infor,attributes:{ exclude: ['id','doctorId']},include:[
                        {model: db.Allcode, as: 'priceIdData', attributes: ['valueEn','valueVi']},
                        {model: db.Allcode, as: 'provinceIdData', attributes: ['valueEn','valueVi']},
                        {model: db.Allcode, as: 'paymentIdData', attributes: ['valueEn','valueVi']}
                    ]},
                    ],
                    raw: false,
                    nest: true
            });
            if(data && data.image) {
                data.image = new Buffer(data.image,'base64').toString('binary');
            };
            if(!data) data = [];
            resolve({
                errCode: 0,
                message: 'Get doctor infor successfully',
                data: data
            })
        }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getTopDoctorHome : getTopDoctorHome,
    getAllDoctors : getAllDoctors,
    saveInforDoctor : saveInforDoctor,
    getDetailDoctorById : getDetailDoctorById,
    bulkCreateSchedule : bulkCreateSchedule,
    getScheduleByDate : getScheduleByDate,
    getExtraInforDoctorById : getExtraInforDoctorById,
    getProfileDoctorById : getProfileDoctorById
}