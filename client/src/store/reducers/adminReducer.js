import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roleIDs: [],
    positions: [],
    users: [],
    doctors: [],
    allDoctors: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.genders = [];
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.positions = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roleIDs = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.roleIDs = [];
            return {
                ...state
            }
        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state
            }
        case actionTypes.CREATE_USER_FAIL:
            return {
                ...state
            }
        case actionTypes.GET_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.GET_ALL_USER_FAIL:
            state.users = [];
            return {
                ...state
            }
        case actionTypes.DELETE_USER_SUCCESS:
            return {
                ...state
            }
        case actionTypes.DELETE_USER_FAIL:
            return {
                ...state
            }
        case actionTypes.UPDATE_USER_SUCCESS:
            return {
                ...state
            }
        case actionTypes.UPDATE_USER_FAIL:
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_SUCCESS:
            state.doctors = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_FAIL:
            state.doctors = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            state.allDoctors = [];
            return {
                ...state
            }
        case actionTypes.SAVE_DOCTOR_SUCCESS:
            return {
                ...state
            }
        case actionTypes.SAVE_DOCTOR_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;