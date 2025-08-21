import { where } from 'sequelize';
import db from '../models/index';
import moment from 'moment';
require('dotenv').config();
import { Op, fn, col } from 'sequelize';
const { Buffer } = require('buffer');
import emailService from './emailService';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limit, keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = { roleID: 'R2' };
            if (keyword) {
                const keywordLower = keyword.toLowerCase();
                whereCondition[Op.or] = [
                    where(fn('LOWER', col('firstName')), {
                        [Op.like]: `%${keywordLower}%`
                    }),
                    where(fn('LOWER', col('lastName')), {
                        [Op.like]: `%${keywordLower}%`
                    }),
                    where(
                        fn('LOWER', fn('CONCAT', col('lastName'), ' ', col('firstName'))),
                        {
                            [Op.like]: `%${keywordLower}%`
                        }
                    )
                ];
            }

            let users = await db.User.findAll({
                limit: limit || undefined,
                order: [["createdAt", "DESC"]],
                attributes: {
                    exclude: ['password']
                },
                where: whereCondition,
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            });

            if (users && users.length > 0) {
                users = users.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                });
            }

            resolve({
                errCode: 0,
                data: users
            });
        } catch (error) {
            reject(error);
        }
    });
};

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
               || !inputdata.priceId || !inputdata.paymentId || !inputdata.provinceId || !inputdata.nameClinic 
               || !inputdata.addressClinic  || !inputdata.specialtyId || !inputdata.clinicId
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
                specialtyId:inputdata.specialtyId,
                clinicId:inputdata.clinicId,
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
                    specialtyId:inputdata.specialtyId,
                    clinicId:inputdata.clinicId,
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
                    {model: db.Doctor_infor,attributes: ['priceId','paymentId','provinceId','specialtyId','clinicId','nameClinic','addressClinic','note']},
                    {model: db.Allcode, as: 'positionData', attributes: ['valueEn','valueVi']},
                ],
                raw: false,
                nest: true
            }
            )
            if(data && data.image) {
                data.image = Buffer.from(data.image,'base64').toString('binary');
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
    console.log(data)
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
            message: "Create schedule successfully"
          })
        }
        } catch (error) {
            reject(error);
        }
    }
    )
}

let getScheduleByDate = (doctorID, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!doctorID || !date) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameter"
                });
            } else {
                const start = moment(date).utcOffset(7).startOf('day').toDate();
                const end   = moment(date).utcOffset(7).endOf('day').toDate();

                let data = await db.Schedule.findAll({
                    where: {
                        doctorID: doctorID,
                        date: { [Op.between]: [start, end] }
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
                });
            }
        } catch (error) {
            reject(error);
        }
    });
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
                data.image = Buffer.from(data.image,'base64').toString('binary');
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

let getSpecialtyDoctorById = (id) => {
    return new Promise(async (resolve,reject) => {
            try {
            if(!id){
                resolve({
                errCode : 1,
                message : "Misisng input parameter !",
            })
            }else{
                let data = await db.Doctor_infor.findAll({
                where:{
                    doctorId: id
                }
               })
                resolve({
                errCode : 0,
                message : "Get specialty succedd !",
                data: data 
            })
            }
            } catch (error) {
                reject(error);
            }
    })
}

let getPatientByDocotorId = (doctorID,date) => {
    return new Promise(async (resolve,reject) => {
        try {
          if(!doctorID || !date) {
            resolve({
                errCode : 1,
                message: "Mising input parameters"
            })
          } else {
            let data = await db.Booking.findAll({
                attributes:{
                  exclude: ['token']
                },
                where: {doctorID:doctorID,date:date,statusID:'S2'},
                include: [
                    {model: db.User, as: 'patientData',attributes: ['address','phonenumber','gender','firstName','lastName','email'],include:[
                        {model: db.Allcode, as: 'genderData', attributes: ['valueEn','valueVi']},
                    ]},
                    {model: db.Allcode, as: 'timeTypeDataBooking',attributes: ['valueEn','valueVi']}
                ],
                raw: false,
                nest: true
            }
            )
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

let confirmPatientAppointment = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.email || !inputData.billImage || !inputData.id) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                });
                return;
            }

            
            await db.Booking.update(
                { statusID: 'S3' },
                { where: { id: inputData.id } }
            );

            let emailData = {
                receiverEmail: inputData.email,
                patientName: inputData.patientName,
                language: inputData.language,
                billImage: inputData.billImage
            };

            await emailService.sendBillEmail(emailData);

            resolve({
                errCode: 0,
                message: "Confirm appointment and send bill successfully"
            });

        } catch (error) {
            console.error('Error in confirmPatientAppointment:', error);
            reject(error);
        }
    });
}

module.exports = {
    getTopDoctorHome : getTopDoctorHome,
    getAllDoctors : getAllDoctors,
    saveInforDoctor : saveInforDoctor,
    getDetailDoctorById : getDetailDoctorById,
    bulkCreateSchedule : bulkCreateSchedule,
    getScheduleByDate : getScheduleByDate,
    getExtraInforDoctorById : getExtraInforDoctorById,
    getProfileDoctorById : getProfileDoctorById,
    getSpecialtyDoctorById : getSpecialtyDoctorById,
    getPatientByDocotorId : getPatientByDocotorId,
    confirmPatientAppointment : confirmPatientAppointment
}