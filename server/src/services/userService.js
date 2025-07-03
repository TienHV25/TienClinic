import { where } from 'sequelize';
import db from '../models/index';
import bcrypt from 'bcrypt';

let handleUserLogin = (email,password) => {
   return new Promise (async (resolve,reject) => {
     try {
       let userData = {};
       let checkEmail = await checkEmailuser(email);
       if(checkEmail) {
        //user already exist
        let user = await db.User.findOne(
            {   
                where: {
                    email: email
                }
            }
        );
        if(user){
          //compare password
          let checkPassword = await bcrypt.compare(password,user.password);
          user =  await db.User.findOne(
            {   
                attributes: ['email','roleID','firstName','lastName'],
                where: {
                    email: email
                }
            }
          );
          if(checkPassword) {
            userData.errCode = 0;
            userData.message = `OK`;
            userData.user = user;
          }else{
           userData.errCode = 3;
           userData.message = `Password not match`;
          }

            
        }else {
           userData.errCode = 2;
           userData.message = `User not found`;
        }
         
       }else {
        //return error
        userData.errCode = 1;
        userData.message = `Your Email doesn't exit in system`;     
       };
       resolve(userData);
     } catch (error) {
        reject(error);
     }
   })
};

let checkEmailuser = (userEmail) => {
    return new Promise ( async (resovle,reject) => {
        try {
        let checkEmail = await db.User.findOne({
            where: {
                email:userEmail
            }
        })
        if(checkEmail) {
            resovle(true);
        } else {
            resovle(false);
        } 
        } catch (error) {
            reject(false);
        }
    });
};

let getAllUser = (userID) => {
    return new Promise (async (resolve,reject) => {
    try {
    let user = '';
    if(userID === 'ALL') 
    { 
        user = await db.User.findAll({
            attributes:{
                exclude: ['password']
            }
        }) 
    }
    if(userID && userID !== 'ALL') 
    { 
        user = await db.User.findOne({
            where: {
                id: userID
            },
            attributes:{
                exclude: ['password']
            }
        }) 
    }
    resolve(user);
    } catch (error) {
        reject(error)
    }
    
    }
)};

let hashPassword = (myPlaintextPassword) => {
    return new Promise(async (resolve,reject) => {
       try {
         const salt = await bcrypt.genSalt(10);
         let hashPassword = await bcrypt.hash(myPlaintextPassword,salt);
         resolve(hashPassword);
       } catch (error) {
          reject(error);
       }
    })
};

let createNewUser = (data) => {
    return new Promise(async(resolve,reject) => {
        try {
            let checkEmail = await checkEmailuser(data.email);
            if(checkEmail) {
               resolve({
                 errCode: 1,
                 message: "Email has already exists"
               })
            } else {
              let hashPassWord = await hashPassword(data.password);
              await db.User.create(
                {
                    email: data.email,
                    password: hashPassWord,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleID: data.role,
                    positionID: data.position,
                    image:data.avatar
                }
              )
              resolve({
                errCode: 0,
                message: "Create user successfully"
              })
            }
        } catch (error) {
            reject(error);
        }
    })
};

let updateUser = (data) => {
    return new Promise(async(resolve,reject) => {
        try {
            if(!data.id) {
                resolve({
                  errCode: 1,
                  message: "Missing User ID"
                })
            }
            else{
              let user = await db.User.findOne({
                where: {
                    id: data.id
                }
                })
                if(user) 
                {
                    await db.User.update({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        phonenumber: data.phonenumber,
                        gender: data.gender,
                        roleID: data.role,
                        positionID: data.position,
                        image:data.avatar
                        },
                        {
                        where: {
                            id: data.id
                        }
                        }
                    )
                    resolve({
                        errCode: 0,
                        message: "Update user successfully"
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        message: "User not found"
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
};

let deleteUser = (userID) => {
    return new Promise(async(resolve,reject) => 
    {
        try {
            if(!userID) {
                resolve({
                    errCode: 1,
                    message: "Missing User ID"
                })
            }
            let user = await db.User.findOne({
                where:{
                    id:userID
                }
            })
            if(user) {
                await db.User.destroy({
                    where: {
                        id: userID
                    }
                })
                resolve({
                    errCode: 0,
                    message: "Delete user successfully"
                })
            } else {
                resolve({
                    errCode: 2,
                    message: "User not found"
                })
            }
        } catch (error) {
            reject(error);
        }
    }
    )
};

let getAllCode = (typeUser) => {
    return new Promise(async (resolve,reject) =>{
        try {
            let res = {};
            if(!typeUser) {
                resolve({
                    errCode: 1,
                    message: "Missing input parameteter"
                })
            }
            else {
             let data = await db.Allcode.findAll({
                where: {
                    type:typeUser
                }
             })
             res.errCode = 0;
             res.message = "Get allcode successfully";
             res.data = data;
            }
            resolve(res);
        } catch (error) {
            reject(e);
        }
    });
}

module.exports =
{
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getAllCode: getAllCode
};
