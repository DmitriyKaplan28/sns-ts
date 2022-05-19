import React from 'react';
import {Users} from "./Users";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unfollowAC, UsersType, UserType} from "../../redux/usersReducer";


type UsersMapStateToPropsDialogsType = {
    usersState: UsersType
}

type UsersMapDispatchToPropsDialogsType = {
    follow: (id: string) => void
    unfollow: (id: string) => void
    setUsers: (users: UserType[]) => void
}

export type UsersPropsType = UsersMapStateToPropsDialogsType & UsersMapDispatchToPropsDialogsType

let mapStateToProps = (state: AppStateType): UsersMapStateToPropsDialogsType => {
    return {
        usersState: state.usersPage
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
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users))
        },
    }
}

export const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(Users);
