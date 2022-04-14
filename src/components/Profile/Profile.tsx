import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {AppStateType} from "../../App";
import {PostPropsType} from "./MyPosts/Post/Post";

export type ProfileStateType = {
    posts: PostPropsType[]
}

type ProfileType = {
    profileState: ProfileStateType

}

export const Profile = (props: ProfileType) => {
    return (
        <div >
            <ProfileInfo/>
            <MyPosts posts={props.profileState.posts}/>
        </div>
    );
}