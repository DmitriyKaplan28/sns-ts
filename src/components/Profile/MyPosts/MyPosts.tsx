import React from "react";
import classes from './MyPosts.module.css';
import {Post} from "./Post/Post";

export const MyPosts = () => {
    return (

        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={classes.post}>
                <Post message='Hi how are you' like={'10 likes'}/>
                <Post message='my first post' like={'5 likes'}/>
            </div>
        </div>
    );
}