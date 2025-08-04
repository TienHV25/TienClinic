import axios from '../axios';

const handleLoginApi = (email,password) => {
   return axios.post('/api/login',{email,password});
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

const handleGetTopDoctorHome = (limit) => {
   return axios.get(`/api/top-doctor-home/?limit=${limit}`);
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

const getAllSpecialty = () => {
   return axios.get('/api/get-specialty');
}

export {
   handleLoginApi,
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
   getAllSpecialty
}