import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import classes from './MyPosts.module.css';
import {Post, PostPropsType} from "./Post/Post";
import {AppStateType} from "../../../App";

type MyPostsType = {
    posts: PostPropsType[]
    addPost: (newPostText:string) => void
    newPostText: string
    updateNewPostText: (newText: string) => void
}

export const MyPosts = (props: MyPostsType) => {

    let postsElements = props?.posts?.map((post) =>
        <Post post={post.post} like={post.like}/>
    )


    let addPostOne = () => {
        debugger;
        props.addPost(props.newPostText)
    }

    let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{props.updateNewPostText(e.currentTarget.value)}

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