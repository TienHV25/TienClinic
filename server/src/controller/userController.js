const userService = require('../services/userService');

let handleLogin = async (req,res) => {
   let email = req.body.email;
   let password = req.body.password;
   if(!email || !password) 
   {
     return res.status(500).json(
        {
            errCode: 1,
            message: 'Email or password must be fill !'
        }
     )
   };
   let dataUser = await userService.handleUserLogin(email,password);
    return res.status(200).json(
    {
        errCode:  dataUser.errCode,
        message:  dataUser.message,
        dataUser
    }
    )
};

let handleRegisterApi = async (req, res) => {
    try {
        let userData = await userService.createNewUser(req.body);
        return res.status(200).json(userData);
    } catch (error) {
        console.log('Error in handleRegisterApi:', error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server'
        });
    }
};


let handleGetAllUser = async (req,res) => {
    let id = req.query.id;
    if(!id) {
      return res.status(500).json(
        {
            errCode: 1,
            message: 'Missing Id user',
            users: []
        }
    )
    }
    let users = await userService.getAllUser(id);
    return res.status(200).json(
        {
            errCode: 0,
            message: 'OK',
            users
        }
    )
};

let handleCreateNewUser = async (req,res) => {
    let userData = await userService.createNewUser(req.body);
    return res.status(200).json(userData);
};


let handleUpdateUser = async (req,res) => {
    let userData = await userService.updateUser(req.body);
    return res.status(200).json(userData);
};

let handleDeleteUser = async (req,res) => {
    let userData = await userService.deleteUser(req.body.id);
    return res.status(200).json(userData);
};

let getAllCode = async (req,res) => {
    try {
        let data = await userService.getAllCode(req.query.type);
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

module.exports = {
    handleLogin : handleLogin,
    handleRegisterApi: handleRegisterApi,
    handleGetAllUser : handleGetAllUser,
    handleCreateNewUser : handleCreateNewUser,
    handleUpdateUser : handleUpdateUser,
    handleDeleteUser : handleDeleteUser,
    getAllCode : getAllCode
}