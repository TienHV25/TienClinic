const axios = require('axios');

async function callGeocodeApi(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

 
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'TienClinic/1.0 (hvtienjv2005@gmail.com)'
    }
  });

  const data = response.data;

  if (Array.isArray(data) && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    };
  } else {
    throw new Error(`Geocoding error: No results found`);
  }
}

let geocodeAddress = (address) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!address) {
        resolve({
          errCode: 1,
          message: "Missing input parameter"
        });
      } else {
        const location = await callGeocodeApi(address);
        resolve({
          errCode: 0,
          message: "Ok",
          data: location
        });
      }
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  geocodeAddress
}
