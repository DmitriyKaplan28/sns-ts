import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "./ProfileContainer";

export type ProfilePropsType = {
    isOwner: boolean
    profile: ProfileType | null
    updateUserStatus: (status: string) => void
    status: string
    savePhoto: (photo: string) => void
    saveProfile: (profile: ProfileType | null) => void
}


export const Profile = ({isOwner, profile, updateUserStatus, status, savePhoto, saveProfile}: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo isOwner={isOwner}
                         profile={profile}
                         status={status}
                         updateUserStatus={updateUserStatus}
                         savePhoto={savePhoto}
                         saveProfile={saveProfile}
            />
            <MyPostsContainer/>
        </div>
    );
}