import React, {ChangeEvent} from "react";
import {MyPosts} from "../MyPosts";
import {ReduxStoreType} from "../../../../redux/redux-store";
import {addPostAC, updateNewPostTextAC} from "../../../../redux/profileReducer";
import {ProfileStateType} from "../../Profile";
import {ActionTypes} from "../../../../redux/store";

type MyPostsContainerType = {
    state: ProfileStateType
    dispatch : (action:ActionTypes) => void
}

export const MyPostsContainer = (props: MyPostsContainerType) => {


    const addPost = (postText: string) => {
        props.dispatch(addPostAC(postText))
    }

    const onPostChange = (newText: string) => {
        let action = updateNewPostTextAC(newText)
        props.dispatch(action)
    }

    return (
        <MyPosts updateNewPostText={onPostChange}
                 addPost={addPost}
                 posts={props.state.posts}
                 newPostText={props.state.newPostText}/>
    );
}