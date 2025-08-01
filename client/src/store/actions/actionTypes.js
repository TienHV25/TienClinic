const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //admin 
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIL: 'FETCH_GENDER_FAIL',

    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAIL: 'FETCH_POSITION_FAIL',

    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAIL: 'FETCH_ROLE_FAIL',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAIL: 'CREATE_USER_FAIL',

    GET_ALL_USER_SUCCESS: 'GET_ALL_USER_SUCCESS',
    GET_ALL_USER_FAIL: 'GET_ALL_USER_FAIL',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAIL: 'DELETE_USER_FAIL',

    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAIL: 'UPDATE_USER_FAIL',

    FETCH_DOCTOR_SUCCESS: 'FETCH_DOCTOR_SUCCESS',
    FETCH_DOCTOR_FAIL: 'FETCH_DOCTOR_FAIL',

    FETCH_ALL_DOCTOR_SUCCESS: 'FETCH_ALL_DOCTOR_SUCCESS',
    FETCH_ALL_DOCTOR_FAIL: 'FETCH_ALL_DOCTOR_FAIL',

    SAVE_DOCTOR_SUCCESS: 'SAVE_DOCTOR_SUCCESS',
    SAVE_DOCTOR_FAIL: 'SAVE_DOCTOR_FAIL',

    RESET_SAVE_DOCTOR_SUCCESS: 'RESET_SAVE_DOCTOR_SUCCESS',

    FETCH_ALLCODE_SCHEDULE_TIMES_SUCCESS: 'FETCH_ALLCODE_SCHEDULE_TIMES_SUCCESS',
    FETCHALLCODE_SCHEDULE_TIMES_FAIL: 'FETCH_ALLCODE_SCHEDULE_TIMES_FAIL',

    FETCH_DOCTOR_PRICE_SUCCESS: 'FETCH_DOCTOR_PRICE_SUCCESS',
    FETCH_DOCTOR_PRICE_FAIL: 'FETCH_DOCTOR_PRICE_FAIL',

    FETCH_DOCTOR_PAYMENT_SUCCESS: 'FETCH_DOCTOR_PAYMENT_SUCCESS',
    FETCH_DOCTOR_PAYMENT_FAIL: 'FETCH_PAYMENT_FAIL',

    FETCH_DOCTOR_PROVINCE_SUCCESS: 'FETCH_DOCTOR_PROVINCE_SUCCESS',
    FETCH_DOCTOR_PROVINCE_FAIL: 'FETCH_DOCTOR_PROVINCE_FAIL',



})

export default actionTypes;