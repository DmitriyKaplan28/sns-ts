import React from 'react';

let reRenderEntireTree = () => {
    console.log('state is changing')
}

export let state = {
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
        ] ,
        messages: [
            {id: "1", message: "hi"},
            {id: "2", message: "bye"},
            {id: "3", message: "lol"}
        ]
    }
}

export const addPost = (newPostText:string) => {
    const newPost = {
        id: '5',
        post: state.profilePage.newPostText,
        like: '0 likes'
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText=''
    reRenderEntireTree()
}
export const updateNewPostText = (newText:string) => {
    state.profilePage.newPostText = newText;
    reRenderEntireTree()
}

export const subscribe = (observer: ()=> void) => {
    reRenderEntireTree = observer;
}