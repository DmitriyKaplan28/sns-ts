import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {AppStateType} from "../../App";
import {PostPropsType} from "./MyPosts/Post/Post";


export type ProfileStateType = {
    posts: PostPropsType[]
    newPostText: string
}

type ProfileType = {
    profileState: ProfileStateType
    addPost: (newPostText:string)=> void
    updateNewPostText: (newText:string)=> void
}

export const Profile = (props: ProfileType) => {
    return (
        <div >
            <ProfileInfo/>
            <MyPosts posts={props.profileState.posts}
                     newPostText={props.profileState.newPostText}
                     addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText}/>
        </div>
    );
}