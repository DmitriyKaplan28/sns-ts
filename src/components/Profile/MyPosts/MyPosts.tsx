import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import classes from './MyPosts.module.css';
import {Post, PostPropsType} from "./Post/Post";
import {AppStateType} from "../../../App";
import {ActionTypes} from "../../../redux/state";

type MyPostsType = {
    posts: PostPropsType[]
    newPostText: string
    dispatch : (action:ActionTypes) => void
}

export const MyPosts = (props: MyPostsType) => {

    let postsElements = props?.posts?.map((post) =>
        <Post post={post.post} like={post.like}/>
    )


    let addPostOne = () => {
        props.dispatch({type: 'ADD-POST', newPostText:props.newPostText})
    }

    let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText:e.currentTarget.value})
    }

    return (

        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}
                              value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPostOne}>Add post</button>
                </div>
            </div>
            <div className={classes.post}>

                {postsElements}

            </div>
        </div>
    );
}