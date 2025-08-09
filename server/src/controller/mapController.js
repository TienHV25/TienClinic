const mapService = require('../services/mapService');

let geocodeAddress = async (req,res) => {
   try {
       const address = req.query.address;
       let infors = await mapService.geocodeAddress(address);
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
    geocodeAddress: geocodeAddress
}