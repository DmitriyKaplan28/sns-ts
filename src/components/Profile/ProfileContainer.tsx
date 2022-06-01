import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setUserProfileAC} from "../../redux/profileReducer";

export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}

export type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

export type PhotosType = {
    small: string
    large: string
}

type MapStateToPropsProfileType = {
    profile: ProfileType | null
}

type MapDispatchToPropsProfileType = {
    setUserProfile: (profile: ProfileType) => void
}

export type ProfileStateType = MapStateToPropsProfileType & MapDispatchToPropsProfileType

export class ProfileC extends React.Component<ProfileStateType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    }

    render() {
        return (
            <Profile {...this.props}
            profile={this.props.profile}/>
        );
    }
}

let mapStateToProps = (state: AppStateType):MapStateToPropsProfileType => ({
    profile: state.profilePage.profile
})

export const ProfileContainer = connect(mapStateToProps, {setUserProfile: setUserProfileAC})(ProfileC);


/*
export const ProfileContainer = connect(mapStateToProps,
    {
        setUserProfile: setUserProfileAC
    })(ProfileC);
*/
