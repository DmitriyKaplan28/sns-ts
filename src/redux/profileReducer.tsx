import {ActionTypes} from "./state";
import {ProfileStateType} from "../components/Profile/Profile";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

export const profileReducer = (state: ProfileStateType, action: ActionTypes) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: '5',
                post: action.newPostText,
                like: '0 likes'
            };
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
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

export const updateNewPostTextPostAC = (newText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    } as const
}