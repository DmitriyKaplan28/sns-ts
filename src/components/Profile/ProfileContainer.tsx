import React, {JSXElementConstructor} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    getUserProfileThunkCreator,
    getUserStatusThunkCreator, savePhotoThunkCreator, saveProfileThunkCreator,
    updateUserStatusThunkCreator
} from "../../redux/profileReducer";
import {
    RouteProps,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


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
    status: string
    currentUserId: number | null
}

type MapDispatchToPropsProfileType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    savePhoto: (photo: string) => void
    saveProfile: (profile: ProfileType | null) => void
}

export type ProfileStateType = MapStateToPropsProfileType & MapDispatchToPropsProfileType

export class ProfileC extends React.Component<ProfileStateType & RouteProps> {

    refreshProfile() {
        // @ts-ignore
        let userId = this.props.router.params.userId

        if (!userId) {
            userId = this.props.profile?.userId.toString() as string
        }
        this.props.getUserProfile(Number(userId));
        this.props.getUserStatus(Number(userId))

    }

    componentDidMount(): void {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileStateType & RouteProps>, prevState: Readonly<{}>, snapshot?: any): void {
        // @ts-ignore
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                // @ts-ignore
                     isOwner={+this.props.router.params.userId === this.props.currentUserId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}/>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsProfileType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    currentUserId: state.auth.userId,
})

export const ProfileContainer = compose<React.ComponentType>(connect(mapStateToProps, {
    getUserProfile: getUserProfileThunkCreator,
    getUserStatus: getUserStatusThunkCreator,
    updateUserStatus: updateUserStatusThunkCreator,
    savePhoto: savePhotoThunkCreator,
    saveProfile: saveProfileThunkCreator
}), WithRouter, withAuthRedirect)(ProfileC);