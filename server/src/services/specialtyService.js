import { where } from 'sequelize';
import db from '../models/index';
const { Buffer } = require('buffer');
const { Op, fn, col } = require('sequelize');


let createSpecialty = (data) => {
    return new Promise(async (resolve,reject) => {
        try {
            if(!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown){
                resolve({
                errCode : 1,
                message : "Misisng input parameter"
             })
            }else{
               await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML:data.descriptionHTML,
                    descriptionMarkdown:data.descriptionMarkdown
               })
                resolve({
                    errCode : 0,
                    message : "Create specialty succedd !"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

let getAllSpecialty = (limit, keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = {};
            if (keyword) {
                const keywordNormalized = removeAccents(keyword.toLowerCase());
                whereCondition = where(
                fn('unaccent',fn('LOWER', col('name'))),
                {
                    [Op.like]: `%${keywordNormalized}%`
                }
                );
            }

            let data = await db.Specialty.findAll({
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
                message: "Get specialty success!",
                data: data
            });
        } catch (error) {
            reject(error);
        }
    });
};

let getDoctorOfSpecialty = (specialtyId) => {
    return new Promise(async (resolve,reject) => {
        try {
        if(!specialtyId){
            resolve({
            errCode : 1,
            message : "Misisng input parameter !",
        })
        }else{
            let data = await db.Doctor_infor.findAll({
            where:{
                specialtyId: specialtyId
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

let getSpecialtyDetail = (id) => {
    return new Promise(async (resolve,reject) => {
        try {
        if(!id){
            resolve({
            errCode : 1,
            message : "Misisng input parameter !",
        })
        }else{
            let data = await db.Specialty.findOne({
            where:{
                id: id
            }
           })
            if(data && data.length > 0){
                data = data.map(item => {item.image = Buffer.from(item.image,'base64').toString('binary')
                return item
                })
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
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDoctorOfSpecialty: getDoctorOfSpecialty,
    getSpecialtyDetail: getSpecialtyDetail
}