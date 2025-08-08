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

module.exports = {
    createClinic: createClinic,
}