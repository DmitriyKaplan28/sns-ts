import React, {JSXElementConstructor} from "react";
import {Profile} from "./Profile";

import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfileThunkCreator} from "../../redux/profileReducer";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {Dialogs} from "../Dialogs/Dialogs";


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
    //isAuth: boolean
}



type MapDispatchToPropsProfileType = {

    getUserProfile: (userId: number) => void

}

export type ProfileStateType = MapStateToPropsProfileType & MapDispatchToPropsProfileType

export class ProfileC extends React.Component<ProfileStateType> {


    componentDidMount(): void {

        // @ts-ignore
        this.props.getUserProfile(Number(this.props.router.params.userId))
    }


    render() {


        return (
            <Profile {...this.props}
            profile={this.props.profile}/>
        );
    }
}


let AuthRedirectComponent = withAuthRedirect(ProfileC)
/*let AuthRedirectComponent = (props:ProfileStateType) => {
    if (!props.isAuth) return <Navigate replace to={'/login'}/>
    return <ProfileC {...props}/>
}*/



let mapStateToProps = (state: AppStateType):MapStateToPropsProfileType => ({
    profile: state.profilePage.profile,
    //isAuth: state.auth.isAuth
})



export const ProfileContainer = compose<React.ComponentType>(connect(mapStateToProps, { getUserProfile:getUserProfileThunkCreator}), WithRouter)(AuthRedirectComponent/*ProfileC*/);
