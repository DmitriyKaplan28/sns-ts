import React from "react";
import classes from './MyPosts.module.css';
import {Post, PostPropsType} from "./Post/Post";
import {AppStateType} from "../../../App";

type MyPostsType = {
    posts: PostPropsType[]
}

export const MyPosts = (props: MyPostsType) => {

    let postsElements = props?.posts?.map((post) =>
        <Post post={post.post} like={post.like}/>
    )

    let newPostElement = React.createRef<HTMLTextAreaElement>();

   let addPost = () => {
        let text = newPostElement.current?.value;
        alert( newPostElement.current?.value)
    }

    return (

        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={classes.post}>

                {postsElements}

            </div>
        </div>
    );
}