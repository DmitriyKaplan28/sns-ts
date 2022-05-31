import React from 'react';

import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unfollowAC,
    UsersType,
    UserType
} from "../../redux/usersReducer";
import axios from "axios";
import {UsersFunctional} from "./UsersFunctional";


type UsersMapStateToPropsDialogsType = {
    usersState: UsersType
}

type UsersMapDispatchToPropsDialogsType = {
    follow: (id: number) => void
    unfollow: (id: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
}

export type UsersPropsType = UsersMapStateToPropsDialogsType & UsersMapDispatchToPropsDialogsType

export class UsersC extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersState.currentPage}&count=${this.props.usersState.pageSize}`).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersState.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        });
    }

    render() {
        return <UsersFunctional usersState={this.props.usersState}
                                follow={this.props.follow}
                                unfollow={this.props.unfollow}
                                setCurrentPage={this.props.setCurrentPage}
                                onPageChanged={this.onPageChanged}
        />;
    }
}


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
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalUsersCount: number) => {
            dispatch(setTotalUsersCountAC(totalUsersCount))
        },
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC);
