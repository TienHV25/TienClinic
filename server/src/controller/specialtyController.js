const specialtyService = require('../services/specialtyService');

let createSpecialty = async (req,res) => {
     try {
        let infors = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(infors);
     } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
     }
}

let getAllSpecialty = async (req,res) => {
     try {
        let infors = await specialtyService.getAllSpecialty();
        return res.status(200).json(infors);
     } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
     }
}

let getDoctorOfSpecialty = async(req,res) => {
   try {
      let infors = await specialtyService.getDoctorOfSpecialty(req.query.specialtyId);
      return res.status(200).json(infors);
   } catch (error) {
      return res.status(500).json({
         errCode: -1,
         message: "Error from server"
      })
   }
}

let getSpecialtyDetail = async(req,res) => {
   try {
      let infors = await specialtyService.getSpecialtyDetail(req.query.id);
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
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDoctorOfSpecialty: getDoctorOfSpecialty,
    getSpecialtyDetail: getSpecialtyDetail
}