import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {AppStateType} from "../../App";
import {PostPropsType} from "./MyPosts/Post/Post";
import {ActionTypes} from "../../redux/store";
import {MyPostsContainer} from "./MyPosts/Post/MyPostsContainer";


export type ProfileStateType = {
    posts: PostPropsType[]
    newPostText: string
}

type ProfileType = {
    profileState: ProfileStateType
    dispatch: (action: ActionTypes) => void
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer state={props.profileState}
                              dispatch={props.dispatch}/>
        </div>
    );
}