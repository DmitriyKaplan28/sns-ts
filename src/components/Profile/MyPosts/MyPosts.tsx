import React from "react";
import classes from './MyPosts.module.css';
import {Post, PostPropsType} from "./Post/Post";
import {AppStateType} from "../../../App";

type MyPostsType = {
    posts: PostPropsType[]
    addPost: (postMessage:string)=> void
}

export const MyPosts = (props: MyPostsType) => {

    let postsElements = props?.posts?.map((post) =>
        <Post post={post.post} like={post.like}/>
    )

    let newPostElement = React.createRef<HTMLTextAreaElement>();

   let addPostOne = () => {
        /*let text = newPostElement.current?.value;*/
       if (newPostElement.current)
       {props.addPost(newPostElement.current?.value)};
       /*newPostElement.current?.value = ''*/
    }

    return (

        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
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