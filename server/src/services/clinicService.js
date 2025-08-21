import { where } from 'sequelize';
import db from '../models/index';
const { Buffer } = require('buffer');
const { Op, fn, col } = require('sequelize');

let createClinic = (data) => {
    return new Promise(async (resolve,reject) => {
        try {
            if(!data.name || !data.address || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown){
                resolve({
                errCode : 1,
                message : "Misisng input parameter"
             })
            }else{
               await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML:data.descriptionHTML,
                    descriptionMarkdown:data.descriptionMarkdown
               })
                resolve({
                    errCode : 0,
                    message : "Create clinic succedd !"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllClinic = (limit, keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = {};
            if (keyword) {
                const keywordLower = keyword.toLowerCase();
                whereCondition = where(
                fn('LOWER', col('name')),
                {
                    [Op.like]: `%${keywordLower}%`
                }
                );
            }

            let data = await db.Clinic.findAll({
                where: whereCondition,
                limit: limit || undefined
            });

            if (data && data.length > 0) {
                data = data.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                });
            }

            resolve({
                errCode: 0,
                message: "Get clinic success!",
                data: data
            });
        } catch (error) {
            reject(error);
        }
    });
};

let getDoctorOfClinic = (clinicId) => {
    return new Promise(async (resolve,reject) => {
        try {
        if(!clinicId){
            resolve({
            errCode : 1,
            message : "Misisng input parameter !",
        })
        }else{
            let data = await db.Doctor_infor.findAll({
            where:{
                clinicId: clinicId
            }
           })
            resolve({
            errCode : 0,
            message : "Create specialty succedd !",
            data: data 
        })
        }
        } catch (error) {
            reject(error);
        }
    })
}

let getClinicDetail = (id) => {
    return new Promise(async (resolve,reject) => {
        try {
        if(!id){
            resolve({
            errCode : 1,
            message : "Misisng input parameter !",
        })
        }else{
            let data = await db.Clinic.findOne({
            where:{
                id: id,
            }
           })
            if(data){
                data.image = Buffer.from(data.image,'base64').toString('binary')
            }
            resolve({
            errCode : 0,
            message : "Create specialty succedd !",
            data: data 
        })
        }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getClinicDetail: getClinicDetail,
    getDoctorOfClinic: getDoctorOfClinic
}