import React from 'react';
import {Users} from "./Users";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unfollowAC, UsersType} from "../../redux/usersReducer";


type UsersMapStateToPropsDialogsType = {
    users: UsersType
}

type UsersMapDispatchToPropsDialogsType = {
    follow: (id: string) => void
    unfollow: (id: string) => void
    setUsers: (users: UsersType) => void
}

export type UsersPropsType = UsersMapStateToPropsDialogsType & UsersMapDispatchToPropsDialogsType

let mapStateToProps = (state: UsersType): UsersMapStateToPropsDialogsType => {
    return {
        users: state.users
    }
}
let mapDispatchToProps = (dispatch: Dispatch): UsersMapDispatchToPropsDialogsType => {
    return {
        follow: (id: string) => {
            dispatch(followAC(id))
        },
        unfollow: (id: string) => {
            dispatch(unfollowAC(id))
        },
        setUsers: (users: UsersType) => {
            dispatch(setUsersAC(users))
        },
    }
}

export const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(Users);
