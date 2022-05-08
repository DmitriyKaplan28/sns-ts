import React from 'react';

export let store = {
    _state:{
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
    getState () {
        return this._state
    },
    _callSubscriber() {
        console.log('state is changing')
    },
    addPost (newPostText: string) {
        const newPost = {
            id: '5',
            post: this._state.profilePage.newPostText,
            like: '0 likes'
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = ''
        this._callSubscriber()
    },
    updateNewPostText (newText: string) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber()
    },
    subscribe (observer: () => void) {
        this._callSubscriber = observer;
    }
}


//window.store = store