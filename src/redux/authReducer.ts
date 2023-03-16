import {ActionTypes} from "./store";
import {authAPI, securityAPI} from "../api/api";
import {ThunkDispatchType, ThunkType} from "./usersReducer";
import {FormAction, stopSubmit} from "redux-form";

const SET_USER_DATA = 'AUTH/SET-USER-DATA'
const GET_CAPTCHA_URL = 'AUTH/GET_CAPTCHA_URL'

export type AuthPropsType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaURL: string | null
}

let initialState: AuthPropsType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaURL: null,
}

export const authReducer = (state: AuthPropsType = initialState, action: ActionTypes): AuthPropsType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload};
        case GET_CAPTCHA_URL:
            return {...state, captchaURL: action.URL};
        default:
            return state;
    }
}

export const setUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth}
    } as const
}

export const getCaptchaURLAC = (URL: string) => {
    return {
        type: GET_CAPTCHA_URL,
        URL
    } as const
}


export const getAuthUserDataThunkCreator = (): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        let response = await authAPI.me()
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(setUserDataAC(id, email, login, true));
        }
    }
}

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean = false): ThunkType<FormAction> => async dispatch => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataThunkCreator())
    } else {

        if (response.data.resultCode === 10) {
            dispatch(getCaptchaURLThunkCreator())}

        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logoutThunkCreator = (): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        let response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setUserDataAC(null, null, null, false))
        }
    }
}

export const getCaptchaURLThunkCreator = (): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        let response = await securityAPI.getCaptchaURL()
        dispatch(getCaptchaURLAC(response.data.url))
    }
}