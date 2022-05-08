import React from 'react';
import {ProfileStateType} from "../components/Profile/Profile";
import {DialogsStateType} from "../components/Dialogs/Dialogs";

export type StateType = {
    profilePage: ProfileStateType
    dialogsPage: DialogsStateType
}

export type StoreType = {
    _state: StateType
    _callSubscriber: () => void

    getState: () => StateType
    subscribe: (observer: () => void) => void

    dispatch: (action: ActionTypes) => void
}

export type ActionTypes = ReturnType<typeof addPostAC> | ReturnType<typeof updateNewPostTextPostAC>

export const addPostAC = (newPostText: string) => {
    return {
        type: "ADD-POST",
        newPostText: newPostText
    } as const
}

export const updateNewPostTextPostAC = (newText: string) => {
    return {
        type: "UPDATE-NEW-POST-TEXT",
        newText: newText
    } as const
}

export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: "1", post: "Hi how are you", like: '10 likes'},
                {id: "2", post: "my first post", like: '5 likes'}
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: "1", name: "Dmitriy"},
                {id: "2", name: "Oksana"},
                {id: "3", name: "Andrey"},
                {id: "4", name: "4"},
                {id: "5", name: "5"},
                {id: "6", name: "6"}
            ],
            messages: [
                {id: "1", message: "hi"},
                {id: "2", message: "bye"},
                {id: "3", message: "lol"}
            ]
        }
    },
    _callSubscriber() {
        console.log('state is changing')
    },

    getState() {
        return this._state
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        if (action.type === 'ADD-POST') {
            const newPost = {
                id: '5',
                post: action.newPostText,
                like: '0 likes'
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = ''
            this._callSubscriber()
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber()
        }
    }
}


//window.store = store