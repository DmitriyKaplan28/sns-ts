import React, {JSXElementConstructor} from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setUserProfileAC} from "../../redux/profileReducer";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {compose} from "redux";

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
export const WithRouter = (Component: JSXElementConstructor<any>): JSXElementConstructor<any> => {
    function WithRouterPropComponent(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return WithRouterPropComponent;
}


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


    componentDidMount(): void {

        // @ts-ignore
        let userId = Number(this.props.router.params.userId);
        // if (!userId ) {
        //     // @ts-ignore
        //     userId = this.props.profile.userId;}
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
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



export const ProfileContainer = compose<React.ComponentType>(connect(mapStateToProps, {setUserProfile: setUserProfileAC/*, setFetching*/}), WithRouter)(ProfileC);
