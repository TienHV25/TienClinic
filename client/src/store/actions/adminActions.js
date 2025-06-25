import actionTypes from './actionTypes';
import { handleGetCode,handleCreateUser,handleGetAllUser,handleDeleteUser } from '../../services/userService';
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

