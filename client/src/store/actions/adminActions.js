import actionTypes from './actionTypes';
import { handleGetCode,handleCreateUser,handleGetAllUser,handleDeleteUser,handleUpdateUser,handleGetTopDoctorHome,handleGetAllDoctors,handleSaveInforDoctor } from '../../services/userService';
import {  toast } from 'react-toastify';

export const fetchGenderStart =  () => {
    return async (dispatch) => {
        try {
            let res = await handleGetCode('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (error) {
            dispatch(fetchGenderFail());
            console.error("Fetch gender failed:", error);
        }
    }
}

export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: data
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchPositionStart =  () => {
    return async (dispatch) => {
        try {
            let res = await handleGetCode('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
        } catch (error) {
            dispatch(fetchPositionFail());
            console.error("Fetch position failed:", error);
        }
    }
}

export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

export const fetchRoleStart =  () => {
    return async (dispatch) => {
        try {
            let res = await handleGetCode('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
        } catch (error) {
            dispatch(fetchRoleFail());
            console.error("Fetch role failed:", error);
        }
    }
}

export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

export const createUserStart =  (data) => {
    return async (dispatch) => {
        try {
            let res = await handleCreateUser(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed !")
                dispatch(createUserSuccess());
                dispatch(getAllUserStart());
            } else {
                toast.error("Create a new user failed !")
                dispatch(createUserFail());
            }
        } catch (error) {
            toast.error("Create a new user failed !")
            dispatch(createUserFail());
            console.error("Create user failed:", error);
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})

export const getAllUserStart =  () => {
    return async (dispatch) => {
        try {
            let res = await handleGetAllUser('ALL');
            if (res && res.errCode === 0) {
                dispatch(getAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(getAllUserFail());
            }
        } catch (error) {
            dispatch(getAllUserFail());
            console.error("get all user failed:", error);
        }
    }
}

export const getAllUserSuccess = (users) => ({
    type: actionTypes.GET_ALL_USER_SUCCESS,
    users: users
})

export const getAllUserFail = () => ({
    type: actionTypes.GET_ALL_USER_FAIL
})

export const deleteUserStart =  (dataID) => {
    return async (dispatch) => {
        try {
            let res = await handleDeleteUser(dataID);
            if (res && res.errCode === 0) {
                toast.success("Delete user succeed !")
                dispatch(deleteUserSuccess());
                dispatch(getAllUserStart());
            } else {
                toast.error("Delete user error !")
                dispatch(deleteUserFail());
            }
        } catch (error) {
            toast.error("Delete user error !")
            dispatch(deleteUserFail());
            console.error("Delete user failed:", error);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

export const updateUserStart =  (data) => {
    return async (dispatch) => {
        try {
            let res = await handleUpdateUser(data);
            if (res && res.errCode === 0) {
                toast.success("Update user succeed !")
                dispatch(updateUserSuccess());
                dispatch(getAllUserStart());
            } else {
                toast.error("Update user error !")
                dispatch(updateUserFail());
            }
        } catch (error) {
            toast.error("Update user error !")
            dispatch(updateUserFail());
            console.error("Update user failed:", error);
        }
    }
}

export const updateUserSuccess = (data) => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
    data: data
})

export const updateUserFail = () => ({
    type: actionTypes.UPDATE_USER_FAIL
})

export const fetchDoctorStart =  () => {
    return async (dispatch) => {
        try {
            let res = await handleGetTopDoctorHome('');
            if (res && res.errCode === 0) {
                dispatch(fetchDoctorSuccess(res.data));
            } else {
                dispatch(fetchDoctorFail());
            }
        } catch (error) {
            dispatch(fetchDoctorFail());
            console.error("Fetch doctor failed:", error);
        }
    }
}

export const fetchDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_SUCCESS,
    data: data
})

export const fetchDoctorFail = () => ({
    type: actionTypes.FETCH_DOCTOR_FAIL
})

export const fetchAllDoctorStart =  () => {
    return async (dispatch) => {
        try {
            let res = await handleGetAllDoctors();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorSuccess(res.data));
            } else {
                dispatch(fetchAllDoctorFail());
            }
        } catch (error) {
            dispatch(fetchAllDoctorFail());
            console.error("Fetch all doctor failed:", error);
        }
    }
}

export const fetchAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: data
})

export const fetchAllDoctorFail = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAIL
})

export const saveDoctorStart =  (data) => {
    return async (dispatch) => {
        try {
            let res = await handleSaveInforDoctor(data);
            if (res && res.errCode === 0) {
                toast.success("Save doctor information succeed !")
                dispatch(saveDoctorSuccess());
            } else {
                toast.error("Save doctor information error !")
                dispatch(saveDoctorFail());
            }
        } catch (error) {
            toast.error("Save doctor information error !")
            dispatch(saveDoctorFail());
            console.error("Save doctor failed:", error);
        }
    }
}

export const saveDoctorSuccess = (data) => ({
    type: actionTypes.SAVE_DOCTOR_SUCCESS,
})

export const saveDoctorFail = () => ({
    type: actionTypes.SAVE_DOCTOR_FAIL
})

