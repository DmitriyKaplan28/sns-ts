import {ActionTypes} from "./store";
import {PhotosType, ProfileType} from "../components/Profile/ProfileContainer";
import {profileAPI} from "../api/api";
import {ThunkDispatchType, ThunkType} from "./usersReducer";
import {stopSubmit} from "redux-form";

const ADD_POST = 'PROFILE/ADD-POST'
const UPDATE_NEW_POST_TEXT = 'PROFILE/UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'PROFILE/SET-USER-PROFILE'
const SET_STATUS = 'PROFILE/SET-STATUS'
const DELETE_POST = 'PROFILE/DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'PROFILE/SET-PHOTO-SUCCESS'

let initialState = {
    posts: [
        {id: "1", post: "Hi how are you", like: '10 likes'},
        {id: "2", post: "my first post", like: '5 likes'}
    ],
    newPostText: '',
    profile: null as null | ProfileType,
    status: '',
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: '5',
                post: action.newPostText,
                like: '0 likes'
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            };

        case SET_USER_PROFILE:
            return {...state, profile: action.profile};

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile!, photos: action.photo}
            };

        default:
            return state;
    }
}

export const addPostAC = (newPostText: string) => {
    return {
        type: ADD_POST,
        newPostText: newPostText
    } as const
}

export const deletePostAC = (postId: string) => {
    return {
        type: DELETE_POST,
        postId
    } as const
}

export const updateNewPostTextAC = (newText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    } as const
}

export const setUserProfileAC = (profile: ProfileType | null) => {
    return {
        type: SET_USER_PROFILE,
        profile,
    } as const
}

export const setStatusAC = (status: string) => {
    return {
        type: SET_STATUS,
        status,
    } as const
}

export const savePhotoSuccessAC = (photo: PhotosType) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photo,
    } as const
}

export const getUserProfileThunkCreator = (userId: number | null): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        let response = await profileAPI.getProfile(userId)
        dispatch(setUserProfileAC(response.data));
    }
}

export const getUserStatusThunkCreator = (userId: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatusAC(response.data));
    }
}

export const updateUserStatusThunkCreator = (status: string): ThunkType => async (dispatch: ThunkDispatchType) => {

    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatusAC(status))
        }
    } catch (error) {

    }
}

export const savePhotoThunkCreator = (photo: string): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        let response = await profileAPI.savePhoto(photo)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccessAC(response.data.data.photos))
        }
    }
}

export const saveProfileThunkCreator = (profile: ProfileType | null): ThunkType => async (dispatch: ThunkDispatchType, getState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfileThunkCreator(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
}