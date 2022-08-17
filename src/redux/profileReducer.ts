import {ActionTypes} from "./store";

import {ProfileType} from "../components/Profile/ProfileContainer";
import {profileAPI} from "../api/api";
import {ThunkDispatchType, ThunkType} from "./usersReducer";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const DELETE_POST = 'DELETE-POST'

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

export const getUserProfileThunkCreator = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        profileAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfileAC(response.data));
            });
    }
}

export const getUserStatusThunkCreator = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatusAC(response.data));
            });
    }
}

export const updateUserStatusThunkCreator = (status: string): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatusAC(status))
                }
            });
    }
}