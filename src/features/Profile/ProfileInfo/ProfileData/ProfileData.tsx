import React from 'react';
import {ProfileType} from "../../ProfileContainer";

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    editModeOn: () => void
}

export const ProfileData = ({profile, isOwner, editModeOn}: ProfileDataType) => {
    return (
        <div>
            {isOwner && <button onClick={editModeOn}>Edit profile</button>}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>

            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? "Yes" : "No"}
            </div>
            {profile.lookingForAJob &&
                <div>
                    <b>My professional skills</b>{profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
        </div>
    );
};