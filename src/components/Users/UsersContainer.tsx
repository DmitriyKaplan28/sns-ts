import React from 'react';
import {UsersC} from "./UsersC";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unfollowAC, UsersType, UserType} from "../../redux/usersReducer";


type UsersMapStateToPropsDialogsType = {
    usersState: UsersType
}

type UsersMapDispatchToPropsDialogsType = {
    follow: (id: number) => void
    unfollow: (id: number) => void
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
        follow: (id: number) => {
            dispatch(followAC(id))
        },
        unfollow: (id: number) => {
            dispatch(unfollowAC(id))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users))
        },
    }
}

export const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(UsersC);
