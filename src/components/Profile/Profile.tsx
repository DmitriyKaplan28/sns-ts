import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "./ProfileContainer";

export type ProfilePropsType = {
    profile: ProfileType | null
    updateUserStatus: (status: string) => void
    status: string
}

export const Profile = (props: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer/>
        </div>
    );
}