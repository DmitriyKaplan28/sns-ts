import {Navigate} from "react-router-dom";
import React, {ComponentType} from "react";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStateToPropsForRedirectType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType):MapStateToPropsForRedirectType => ({
    //profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})


export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MapStateToPropsForRedirectType) => {

        let{isAuth, ...restProps} = props

        if (!isAuth) return <Navigate replace to={'/login'}/>
        return <Component {...restProps as T}/>
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}






/*
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
}*/
