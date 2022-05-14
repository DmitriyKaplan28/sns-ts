import React, {ChangeEvent} from "react";
import classes from './MyPosts.module.css';
import {Post, PostPropsType} from "./Post/Post";
import {ActionTypes} from "../../../redux/store";
import {addPostAC, updateNewPostTextPostAC} from "../../../redux/profileReducer";
import {MyPosts} from "../MyPosts";

type MyPostsType = {
    posts: PostPropsType[]
    newPostText: string
    dispatch : (action:ActionTypes) => void
}

export const MyPostsContainer = (props: MyPostsType) => {

    let postsElements = props?.posts?.map((post) =>
        <Post post={post.post} like={post.like}/>
    )


    let addPost = () => {
        props.dispatch(addPostAC(props.newPostText))
    }

    let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        props.dispatch(updateNewPostTextPostAC(e.currentTarget.value))
    }

    return (
        <MyPosts />
    );
}