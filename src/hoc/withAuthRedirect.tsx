import {Dialogs, DialogsPropsType} from "../components/Dialogs/Dialogs";
import {Navigate} from "react-router-dom";
import React from "react";
import {ReactComponent} from "*.svg";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStateToPropsForRedirectType = {
    //profile: ProfileType | null
    isAuth: boolean
}

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends ReactComponent {
        render() {
            if (!props.isAuth) return <Navigate replace to={'/login'}/>
            return <Dialogs {...props}/>
        }
    }

    let mapStateToPropsForRedirect = (state: AppStateType):MapStateToPropsForRedirectType => ({
        //profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    })

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent
}