import React from "react";
import classes from './MyPosts.module.css';
import {Post} from "./Post/Post";

export const MyPosts = () => {
    return (

        <div>My posts
            <div>
                New post</div>
            <Post message='Hi how are you' like={'10 likes'}/>
            <Post message='my first post' like={'5 likes'}/>

        </div>
    );
}