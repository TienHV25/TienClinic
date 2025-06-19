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

export {
   handleLoginApi,
   handleGetAllUser,
   handleCreateUser,
   handleDeleteUser,
   handleUpdateUser 
}