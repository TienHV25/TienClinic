import express from "express";
import homeController  from "../controller/homeController";
import userController from "../controller/userController";

let router = express.Router();

let initWebRoutes = (app) => {
   router.get('/', homeController.getHomePage);
   router.get('/about', homeController.getAbout);
   router.get('/crud', homeController.getCRUD);
   router.post('/post-crud', homeController.postCRUD);
   router.get('/get-crud', homeController.displayGetCRUD);
   router.get('/edit-crud', homeController.getEditCRUD);
   router.post('/put-crud',homeController.putCRUD );
   router.get('/delete-crud', homeController.deleteCRUD);

   router.post('/api/login',userController.handleLogin);
   router.get(`/api/get-all-users`,userController.handleGetAllUser);
   router.post('/api/create-new-user',userController.handleCreateNewUser);
   router.put('/api/update-user',userController.handleUpdateUser);
   router.delete('/api/delete-user',userController.handleDeleteUser);

   router.get('/allcode',userController.getAllCode);

   return app.use("/",router);

} 

module.exports = initWebRoutes