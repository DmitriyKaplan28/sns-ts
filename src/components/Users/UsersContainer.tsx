import React from 'react';

import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC, toggleIsFetchingAC, toggleIsFollowingProgressAC,
    unfollowAC,
    UsersType,
    UserType
} from "../../redux/usersReducer";
import {UsersFunctional} from "./UsersFunctional";
import {Preloader} from "../common/Preloader";
import { usersAPI} from "../../api/api";


type UsersMapStateToPropsType = {
    usersState: UsersType
}

type UsersMapDispatchToPropsType = {
    follow: (id: number) => void
    unfollow: (id: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleIsFollowingProgress:(isFetching: boolean, id: number) => void
}

export type UsersPropsType = UsersMapStateToPropsType & UsersMapDispatchToPropsType

export class UsersC extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.usersState.currentPage, this.props.usersState.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(pageNumber, this.props.usersState.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        });
    }

    render() {
        return <>
            {this.props.usersState.isFetching ? <Preloader/> : null}
            <UsersFunctional usersState={this.props.usersState}
                             follow={this.props.follow}
                             unfollow={this.props.unfollow}
                             setCurrentPage={this.props.setCurrentPage}
                             onPageChanged={this.onPageChanged}
                             toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
            />;
        </>
    }
}


let mapStateToProps = (state: AppStateType): UsersMapStateToPropsType => {
    return {
        usersState: state.usersPage
    }
}

export const UsersContainer = connect(mapStateToProps,
    {
        follow: followAC,
        unfollow: unfollowAC,
        setUsers: setUsersAC,
        setCurrentPage: setCurrentPageAC,
        setTotalUsersCount: setTotalUsersCountAC,
        toggleIsFetching: toggleIsFetchingAC,
        toggleIsFollowingProgress: toggleIsFollowingProgressAC,
    })(UsersC);
