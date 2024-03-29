import React from "react";
import {UsersType} from "../../store/usersReducer";
import {Paginator} from "../../common/components/Paginator/Paginator";
import {User} from "./User/User";

type UsersPropsType = {
	usersState: UsersType
	follow: (id: number) => void
	unfollow: (id: number) => void
	setCurrentPage: (pageNumber: number) => void
	onPageChanged: (pageNumber: number) => void
	toggleIsFollowingProgress: (isFetching: boolean, id: number) => void
}


export const Users = ({
	usersState,
	follow,
	unfollow,
	onPageChanged
}: UsersPropsType) => {

	return <div>
		<Paginator totalItemsCount={usersState.totalUsersCount}
				   pageSize={usersState.pageSize}
				   currentPage={usersState.currentPage}
				   onPageChanged={onPageChanged}
				   portionSize={10}/>
		{
			usersState.users.map(u => <User key={u.id}
				user={u}
				followingInProgress={usersState.followingInProgress}
				follow={follow}
				unfollow={unfollow}/>)
		}
	</div>;
};