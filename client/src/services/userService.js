import axios from '../axios';

const handleLoginApi = (email,password) => {
   return axios.post('/api/login',{email,password});
}

const handleRegisterApi = (userData) => {
   return axios.post('/api/register',userData);
}

const handleGetAllUser = (userId) => {
   return axios.get(`/api/get-all-users/?id=${userId}`);
}

const handleCreateUser = (userData) => {
   return axios.post('/api/create-new-user',userData);
}

const handleDeleteUser = (userID) => {
   return axios.delete('/api/delete-user',{
     data:{ id: userID}
   }
   )
}

const handleUpdateUser = (userData) => {
   return axios.put('/api/update-user',userData);
}

const handleGetCode = (userType) => {
   return axios.get(`/api/allcode/?type=${userType}`);
}

const handleGetTopDoctorHome = (limit, keyword) => {
   return axios.get(`/api/top-doctor-home?limit=${limit}&keyword=${keyword || ''}`);
}

const handleGetAllDoctors = () => {
   return axios.get('/api/get-all-doctors');
}

const handleSaveInforDoctor = (data) => {
   return axios.post('/api/save-info-doctors',data);
}

const handleGetDoctorById = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
}

const saveBulkScheduleDoctor = (data) => {
   return axios.post('/api/bulk-create-schedule',data);
}

const getScheduleDoctorByDate = (doctorID,date) => {
  return axios.get(`/api/get-schedule-doctor-by-date?doctorID=${doctorID}&date=${date}`);
}

const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?id=${doctorId}`);
}

const postBookingAppointment = (userData) => {
   return axios.post('/api/patient-book-appointment',userData);
}

const postVerifyBookAppointment = (data) => {
   return axios.post('/api/verify-book-appointment',data);
}

const createNewSpecialty = (data) => {
   return axios.post('/api/create-new-specialty',data);
}

const createNewClinic = (data) => {
   return axios.post('/api/create-new-clinic',data);
}


const getAllSpecialty = (limit, keyword) => {
   return axios.get(`/api/get-specialty?limit=${limit}&keyword=${keyword || ''}`);
}

const getAllClinic = (limit, keyword) => {
   return axios.get(`/api/get-clinic?limit=${limit}&keyword=${keyword || ''}`);
}

const getDoctorOfSpecialty = (specialtyId) => {
   return axios.get(`/api/get-specialty-doctor/?specialtyId=${specialtyId}`);
}

const getDoctorOfClinic = (clinicId) => {
   return axios.get(`/api/get-clinic-doctor/?clinicId=${clinicId}`);
}

const getSpecialtyDetail = (id) => {
   return axios.get(`/api/get-specialty-detail/?id=${id}`);
}

const getClinicDetail = (id) => {
   return axios.get(`/api/get-clinic-detail/?id=${id}`);
}

const geocodeAddress = (address) => {
   return axios.get(`/api/geocode?address=${encodeURIComponent(address)}`);
}

const getSpecialtyDoctorById = (id) => {
   return axios.get(`/api/get-specialty-by-doctor-id?doctorId=${id}`);
}

const getPatientByDocotorId  = (doctoroID,date) => {
   return axios.get(`/api/get-patient-by-doctor-id?doctorID=${doctoroID}&date=${date}`);
}

const createHandbookTest = (data) => {
  return axios.post('/api/create-handbook-test', data);
};

const getAllHandbookTests = () => {
  return axios.get('/api/get-handbook-tests');
};

const getHandbookTestDetail = (testId) => {
  return axios.get(`/api/get-handbook-test-detail?id=${testId}`);
};

const createHandbook = (data) => {
   return axios.post('/api/create-new-handbook',data);
}

const getAllHandbook = (limit, keyword) => { 
   return axios.get(`/api/get-handbook?limit=${limit}&keyword=${keyword || ''}`);
}

const getHandbookDetail = (id) => {
   return axios.get(`/api/get-handbook-detail/?id=${id}`);
}

const confirmPatientAppointment = (data) => {
    return axios.post(`/api/confirm-patient-appointment`, data);
}

export {
   handleLoginApi,
   handleRegisterApi,
   handleGetAllUser,
   handleCreateUser,
   handleDeleteUser,
   handleUpdateUser,
   handleGetCode,
   handleGetTopDoctorHome,
   handleGetAllDoctors,
   handleSaveInforDoctor,
   handleGetDoctorById,
   saveBulkScheduleDoctor,
   getScheduleDoctorByDate,
   getExtraInforDoctorById,
   getProfileDoctorById,
   postBookingAppointment,
   postVerifyBookAppointment,
   createNewSpecialty,
   getAllSpecialty,
   getAllClinic,
   getDoctorOfSpecialty,
   getDoctorOfClinic,
   getSpecialtyDetail,
   createNewClinic,
   getClinicDetail,
   geocodeAddress,
   getSpecialtyDoctorById,
   getPatientByDocotorId,
   createHandbookTest,
   getAllHandbookTests,
   getHandbookTestDetail,
   createHandbook,
   getAllHandbook,
   getHandbookDetail,
   confirmPatientAppointment
}