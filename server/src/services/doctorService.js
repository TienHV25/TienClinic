import { where } from 'sequelize';
import db from '../models/index';

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
           if (!inputdata.doctorId || !inputdata.contentHTML || !inputdata.contentMarkdown) {
            resolve({
             errCode : 1,
             message : "Misisng input parameter"
           })
           }
           else {
             await db.Markdown.create({
                contentHTML: inputdata.contentHTML,
                contentMarkdown: inputdata.contentMarkdown,	
                description: inputdata.description,
                doctorId: inputdata.doctorId
             });

            resolve({
             errCode : 0,
             message : "Save infor data successfully"
            })
           }
        } catch (error) {
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

module.exports = {
    getTopDoctorHome : getTopDoctorHome,
    getAllDoctors : getAllDoctors,
    saveInforDoctor : saveInforDoctor,
    getDetailDoctorById : getDetailDoctorById
}