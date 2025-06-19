const db = require('../models/index');
import bcrypt from 'bcrypt';

let createNewUser = async (data) => {
    return new Promise (async (resolve,reject) => {
        try {
            let hashPasswordFromBcrypt = await hashPassword(data.password);
            await db.User.create(
                {
                    email:       data.email,
                    password:    hashPasswordFromBcrypt,
                    firstName:   data.firstName,
                    lastName:    data.lastName,
                    address:     data.address,
                    gender:      data.gender === '1' ? true : false,
                    roleID:      data.roleID,
                    phonenumber: data.phonenumber
                }
            )
            resolve('create user successfully');
        } catch (error) {
            reject(e);
        }
    })
};

let getAllUser = async () => { 
    return new Promise(async(resolve,reject) => {
        try {
            let users = await db.User.findAll({
                raw: true 
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
};

let hashPassword = (myPlaintextPassword) => {
    return new Promise(async (resolve,reject) => {
        try {
          const salt = await bcrypt.genSalt(10);
          let hashPassword = await bcrypt.hash(myPlaintextPassword, salt);
          resolve(hashPassword);
        } catch (error) {
           reject(error);
        }
    })
};

let getUserInfoById =  (userId) => {
    return new Promise(async (resolve,reject) => {
        try {
            let data = await db.User.findOne({ where: { id: userId }, raw: true });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
};

let editUser = (data) => {
    return new Promise(async(resolve,reject) => {
        try {
            await db.User.update(
                {
                    firstName:   data.firstName,
                    lastName:    data.lastName,
                    address:     data.address,
                    phonenumber: data.phonenumber
                },
                {
                    where: {
                        id: data.id
                    }
                }   
            );
            let allUsers = await db.User.findAll();
            resolve(allUsers);
        } catch (error) {
            reject(error);
        }
    })
};

let deleteUser = (userId) => {
    return new Promise( async(resolve,reject) => {
        try {
            await db.User.destroy({
                where: {
                  id: userId,
                },
            });
            resolve('Delete User Successfully');
        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    editUser:editUser,
    deleteUser:deleteUser
};