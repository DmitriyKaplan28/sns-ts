import React from "react";

import {Header} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import { setUserDataAC} from "../../redux/authReducer";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";

type MapStatePropsType = {
    login: string | null,
    isAuth: boolean,
}

type MapDispatchToPropsType = {
    setUserData: (userId: number, email: string, login: string) => void
}

export type HeaderContainerPropsType = MapStatePropsType & MapDispatchToPropsType

class HeaderC extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,
            {
                withCredentials: true
            }).then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                this.props.setUserData(id, email, login);
            }
        });
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

export const HeaderContainer = compose<React.ComponentType>(connect(mapStateToProps, {setUserData: setUserDataAC}))(HeaderC);