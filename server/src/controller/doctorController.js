const doctorService = require('../services/doctorService');

let getTopDoctorHome = async (req, res) => {
    try {
        let limit = +req.query.limit || 10;
        let keyword = req.query.keyword || null;

        let doctors = await doctorService.getTopDoctorHome(limit, keyword);
        return res.status(200).json(doctors);
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...'
        });
    }
};

let getAllDoctors = async(req,res) => {
    try {
       let doctors = await doctorService.getAllDoctors();
       return res.status(200).json(doctors);
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let postInforDoctor = async(req,res) => {
    try {
       let doctors = await doctorService.saveInforDoctor(req.body);
       return res.status(200).json(doctors);
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getDetailDoctorById = async(req,res) => {
    try {
       let infors = await doctorService.getDetailDoctorById(req.query.id);
       return res.status(200).json(infors);
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let bulkCreateSchedule = async(req,res) => {
    try {
       let infors = await doctorService.bulkCreateSchedule(req.body);
       return res.status(200).json(infors);
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getScheduleByDate = async (req,res) => {
    try {
       let infors = await doctorService.getScheduleByDate(req.query.doctorID,req.query.date);
       return res.status(200).json(infors);
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
    }

}

let getExtraInforDoctorById = async (req,res) => {
    try {
       let infors = await doctorService.getExtraInforDoctorById(req.query.doctorId);
       return res.status(200).json(infors);
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getProfileDoctorById = async (req,res) => {
    try {
       let infors = await doctorService.getProfileDoctorById(req.query.id);
       return res.status(200).json(infors);
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getSpecialtyDoctorById = async(req,res) => {
   try {
      let infors = await doctorService.getSpecialtyDoctorById(req.query.doctorId);
      return res.status(200).json(infors);
   } catch (error) {
      console.log(error)
      return res.status(500).json({
         errCode: -1,
         message: "Error from server"
      })
   }
}

let getPatientByDocotorId = async(req,res) => {
    try {
       let infors = await doctorService.getPatientByDocotorId(req.query.doctorID,req.query.date);
       return res.status(200).json(infors);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let confirmPatientAppointment = async(req, res) => {
    try {
        let result = await doctorService.confirmPatientAppointment(req.body);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        });
    }
}

module.exports = {
    getTopDoctorHome : getTopDoctorHome,
    getAllDoctors : getAllDoctors,
    postInforDoctor : postInforDoctor,
    getDetailDoctorById : getDetailDoctorById,
    bulkCreateSchedule : bulkCreateSchedule,
    getScheduleByDate : getScheduleByDate,
    getExtraInforDoctorById : getExtraInforDoctorById,
    getProfileDoctorById : getProfileDoctorById,
    getSpecialtyDoctorById : getSpecialtyDoctorById,
    getPatientByDocotorId : getPatientByDocotorId,
    confirmPatientAppointment : confirmPatientAppointment
}