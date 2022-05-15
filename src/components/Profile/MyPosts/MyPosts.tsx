import React, {ChangeEvent} from "react";
import classes from './MyPosts.module.css';
import {Post, PostPropsType} from "./Post/Post";
import {ActionTypes} from "../../../redux/store";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";

type MyPostsType = {
    posts: PostPropsType[]
    newPostText: string
    addPost: (newPostText:string) => void
    updateNewPostText: (newText: string) => void
}

export const MyPosts = (props: MyPostsType) => {

    let postsElements = props?.posts?.map((post) =>
        <Post post={post.post} like={post.like}/>
    )
    const newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPost = () => {
        props.addPost(props.newPostText)
    }

    let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        props.updateNewPostText(e.currentTarget.value)
    }

   /* let addPost = () => {
        props.dispatch(addPostAC(props.newPostText))
    }*/

    /*let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        props.dispatch(updateNewPostTextAC(e.currentTarget.value))
    }*/

    return (

        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}
                              value={props.newPostText}
                              placeholder='Enter your post'/>
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