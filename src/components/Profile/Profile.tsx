import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {AppStateType} from "../../App";
import {PostPropsType} from "./MyPosts/Post/Post";
import {ActionTypes} from "../../redux/state";


export type ProfileStateType = {
    posts: PostPropsType[]
    newPostText: string
}

type ProfileType = {
    profileState: ProfileStateType
    dispatch : (action:ActionTypes) => void
}

export const Profile = (props: ProfileType) => {
    return (
        <div >
            <ProfileInfo/>
            <MyPosts posts={props.profileState.posts}
                     newPostText={props.profileState.newPostText}

                     dispatch = {props.dispatch}/>
        </div>
    );
}