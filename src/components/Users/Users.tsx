import React from "react";
import {UsersType} from "../../redux/usersReducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";


type UsersPropsType = {
    usersState: UsersType
    follow: (id: number) => void
    unfollow: (id: number) => void
    setCurrentPage: (pageNumber: number) => void
    onPageChanged: (pageNumber: number) => void
    toggleIsFollowingProgress: (isFetching: boolean, id: number) => void
}

export const Users = (props: UsersPropsType) => {

    return <div>
        <Paginator totalItemsCount={props.usersState.totalUsersCount}
                   pageSize={props.usersState.pageSize}
                   currentPage={props.usersState.currentPage}
                   onPageChanged={props.onPageChanged}
                   portionSize={10}/>
        {
            props.usersState.users.map(u => <User key={u.id} user={u}
                                                  followingInProgress={props.usersState.followingInProgress}
                                                  follow={props.follow}
                                                  unfollow={props.unfollow}/>)
        }
    </div>;
}