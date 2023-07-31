import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {getAuthUserDataThunkCreator, logoutThunkCreator} from "../../store/authReducer";
import {AppStateType} from "../../store/redux-store";
import {compose} from "redux";

type MapStatePropsType = {
    login: string | null,
    isAuth: boolean,
}

type MapDispatchToPropsType = {
    getAuthUserData: () => void
    logout: () => void
}

export type HeaderContainerPropsType = MapStatePropsType & MapDispatchToPropsType

class HeaderC extends React.Component<HeaderContainerPropsType> {

    render() {
        return (
            <Header login={this.props.login} isAuth={this.props.isAuth} logout={this.props.logout}/>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export const HeaderContainer = compose<React.ComponentType>(connect(mapStateToProps, {
    getAuthUserData: getAuthUserDataThunkCreator,
    logout: logoutThunkCreator
}))(HeaderC);