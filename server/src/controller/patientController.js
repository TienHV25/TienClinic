const patientService = require('../services/patientService');

let postBookAppointment = async (req,res) => {
   try {
       let infors = await patientService.postBookAppointment(req.body);
       return res.status(200).json(infors);
   } catch (error) {
      console.log('Controller error:', error); 
      return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
   } 
}

let postVerifyBookAppointment = async (req,res) => {
    try {
       let infors = await patientService.postVerifyBookAppointment(req.body);
       return res.status(200).json(infors);
    } catch (error) {
        console.log('Controller error:', error); 
        return res.status(500).json({
                errCode: -1,
                message: "Error from server"
            })
    } 
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}