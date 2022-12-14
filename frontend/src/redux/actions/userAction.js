import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    LOAD_USER_SUCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCESS,
    UPDATE_USERS_REQUEST,
    UPDATE_USERS_FAIL,
    UPDATE_USERS_SUCESS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCESS,
    ALL_USERS_BY_CADMIN_REQUEST,
    ALL_USERS_BY_CADMIN_FAIL,
    ALL_USERS_BY_CADMIN_SUCESS,
    ALL_USERS_REQUEST,
    ALL_USERS_FAIL,
    ALL_USERS_SUCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_FAIL,
    DELETE_USER_SUCESS,
    UPDATE_USER_REQUEST,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCESS,
    CLEAR_ERRORS,
} from '../constants/userConstants';

// Login 
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post("/api/v1/login", { email, password }, config);

        dispatch({
            type: LOGIN_SUCESS,
            payload: data.user,
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm, "").replace(/(?<=\&nbsp).*/gm, "").replace('&nbsp', ""),
        })
    }
};

// Register 
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        const { data } = await axios.post("/api/v1/register", { name, email, password }, { config });

        dispatch({
            type: REGISTER_USER_SUCESS,
            payload: data.user,
        });

    } catch (error) {
        console.log(error)
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm, "").replace(/(?<=\&nbsp).*/gm, "").replace('&nbsp', ""),
        })
    }
};

// Logout
export const logOut = () => async (dispatch) => {
    try {
        await axios.get("/api/v1/logout");

        dispatch({
            type: LOGOUT_SUCESS,
        });

    } catch (error) {
        console.log(error)
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.error,
        })
    }
};

// update profile 
export const updateUsers = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USERS_REQUEST });

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        const { data } = await axios.put("/api/v1/me/update", userData, { config });

        dispatch({
            type: UPDATE_USERS_SUCESS,
            payload: data.sucess,
        });

    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_USERS_FAIL,
            payload: error.response.data.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm, "").replace(/(?<=\&nbsp).*/gm, "").replace('&nbsp', ""),
        })
    }
};

// update password 
export const updatePassword = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.put("/api/v1/password/update", userData, { config });

        console.log(data)
        console.log("sdsdsdsdds")

        dispatch({
            type: UPDATE_PASSWORD_SUCESS,
            payload: data.sucess,
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm, "").replace(/(?<=\&nbsp).*/gm, "").replace('&nbsp', ""),
        })
    }
};

// forgot password 
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post(`/api/v1/forgot/password`, email, { config });

        dispatch({
            type: FORGOT_PASSWORD_SUCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm, "").replace(/(?<=\&nbsp).*/gm, "").replace('&nbsp', ""),
        })
    }
};

// reset password 
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, { config });

        dispatch({
            type: RESET_PASSWORD_SUCESS,
            payload: data.sucess,
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm, "").replace(/(?<=\&nbsp).*/gm, "").replace('&nbsp', ""),
        })
    }
};

// Load user 
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get("/api/v1/me");

        dispatch({
            type: LOAD_USER_SUCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm, "").replace(/(?<=\&nbsp).*/gm, "").replace('&nbsp', ""),
        })
    }
};

// All users by admin 
export const allUsersByCadmin = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_BY_CADMIN_REQUEST });

        const { data } = await axios.get("/api/v1/cadmin/users");

        dispatch({
            type: ALL_USERS_BY_CADMIN_SUCESS,
            payload: data.users,
        });

    } catch (error) {
        dispatch({
            type: ALL_USERS_BY_CADMIN_FAIL,
            payload: error.response.data.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm, "").replace(/(?<=\&nbsp).*/gm, "").replace('&nbsp', ""),
        })
    }
};

// clear all ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}