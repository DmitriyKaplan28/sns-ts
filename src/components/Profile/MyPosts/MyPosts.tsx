import React from "react";
import classes from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {DataType} from "../../../App";

export const MyPosts = (props: DataType) => {

    let postsElements = props?.posts?.map((post) =>
        <Post post={post.post} like={post.like}/>
    )

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

                {postsElements}

            </div>
        </div>
    );
}