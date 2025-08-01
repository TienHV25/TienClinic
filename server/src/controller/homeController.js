const db = require('../models/index');
const CRUDService = require('../services/CRUDService');


let getHomePage = async (req,res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
};

let getAbout = (req,res) => {
    return res.render('test/about.ejs');
};

let getCRUD = (req,res) => {
    return res.render('crud.ejs');
};

let postCRUD = async (req,res) => 
{
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post CRUD successfully');
};

let displayGetCRUD = async (req,res) => 
{
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs',{
        dataTable: data
    });
};

let getEditCRUD = async (req,res) => {
    let userId = req.query.id;
    if(userId) 
    {
        let userData = await CRUDService.getUserInfoById(userId);
        console.log(userData);
        return res.render('editCRUD.ejs',{
            user:userData
        });
    }
    else {
        return res.send('User not found');
    }
};

let putCRUD = async (req,res) => {
    let allUser = await CRUDService.editUser(req.body);
    return res.render('displayCRUD.ejs',{
        dataTable: allUser
    });
};

let deleteCRUD = async (req,res) => {
    let id = req.query.id;
    if(id) {
        await CRUDService.deleteUser(id);
        return res.send('Delete successfully');
    }else {
        return  res.send('Not found User ID');
    }
};

module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
};