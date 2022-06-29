import {ActionTypes} from "./store";
import {authAPI} from "../api/api";
import {ThunkDispatchType, ThunkType} from "./usersReducer";

const SET_USER_DATA = 'SET-USER-DATA'

export type AuthPropsType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

let initialState: AuthPropsType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

export const authReducer = (state: AuthPropsType = initialState, action: ActionTypes): AuthPropsType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload};
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

export const getAuthUserDataThunkCreator = (): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        authAPI.me().then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                dispatch(setUserDataAC(id, email, login, true));
            }
        })

    }
}

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean = false): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        authAPI.login(email, password, rememberMe).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserDataThunkCreator())
            }
        })
    }
}

export const logoutThunkCreator = (): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        authAPI.logout().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserDataAC(null, null, null, false))
            }
        })
    }
}