import {Navigate} from "react-router-dom";
import React, {ComponentType} from "react";
import {AppStateType} from "../store/redux-store";
import {connect} from "react-redux";

type MapStateToPropsForRedirectType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsForRedirectType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStateToPropsForRedirectType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Navigate replace to={'/login'}/>
        return <Component {...restProps as T}/>
    }
    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}