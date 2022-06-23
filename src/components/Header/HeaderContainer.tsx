import React from "react";

import {Header} from "./Header";

import {connect} from "react-redux";
import {getAuthUserDataThunkCreator} from "../../redux/authReducer";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";


type MapStatePropsType = {
    login: string | null,
    isAuth: boolean,
}

type MapDispatchToPropsType = {
    getAuthUserData: () => void
}

export type HeaderContainerPropsType = MapStatePropsType & MapDispatchToPropsType

class HeaderC extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return (
            <Header login={this.props.login} isAuth={this.props.isAuth}/>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export const HeaderContainer = compose<React.ComponentType>(connect(mapStateToProps, {getAuthUserData:getAuthUserDataThunkCreator}))(HeaderC);