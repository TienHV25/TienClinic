const clinicService = require('../services/clinicService');

let createClinic = async (req,res) => {
     try {
        let infors = await clinicService.createClinic(req.body);
        return res.status(200).json(infors);
     } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
     }
}

let getAllClinic = async (req,res) => {
     try {
        let infors = await clinicService.getAllClinic();
        return res.status(200).json(infors);
     } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
     }
}

let getDoctorOfClinic = async(req,res) => {
   try {
      let infors = await clinicService.getDoctorOfClinic(req.query.clinicId);
      return res.status(200).json(infors);
   } catch (error) {
      return res.status(500).json({
         errCode: -1,
         message: "Error from server"
      })
   }
}

let getClinicDetail = async(req,res) => {
   try {
      let infors = await clinicService.getClinicDetail(req.query.id);
      return res.status(200).json(infors);
   } catch (error) {
      console.log(error)
      return res.status(500).json({
         errCode: -1,
         message: "Error from server"
      })
   }
}


module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getClinicDetail: getClinicDetail,
    getDoctorOfClinic: getDoctorOfClinic
}