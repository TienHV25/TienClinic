import { where } from 'sequelize';
import db from '../models/index';


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

let getAllSpecialty = () => {
    return new Promise(async (resolve,reject) => {
        try {
        let data = await db.Specialty.findAll()
        if(data && data.length > 0){
           data.map(item => {item.image = new Buffer(item.image,'base64').toString('binary')
           return item
           })
        }
        resolve({
            errCode : 0,
            message : "Create specialty succedd !",
            data: data 
        })
        } catch (error) {
            reject(error);
        }
    })
}

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
                data.map(item => {item.image = new Buffer(item.image,'base64').toString('binary')
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