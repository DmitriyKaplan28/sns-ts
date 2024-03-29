import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../store/redux-store";
import {
	followThunkCreator, getUsersThunkCreator,
	setCurrentPageAC,
	toggleIsFollowingProgressAC,
	unfollowThunkCreator,
	UsersType
} from "../../store/usersReducer";
import {Preloader} from "../../common/components/Preloader/Preloader";
import {compose} from "redux";
import {getUsersPageSuperSelector} from "../../store/usersSelector";
import {Users} from "./Users";


type UsersMapStateToPropsType = {
	usersState: UsersType
}

type UsersMapDispatchToPropsType = {
	follow: (id: number) => void
	unfollow: (id: number) => void
	setCurrentPage: (pageNumber: number) => void
	toggleIsFollowingProgress: (isFetching: boolean, id: number) => void
	getUsers: (currentPage: number, pageSize: number) => void
}

export type UsersPropsType = UsersMapStateToPropsType & UsersMapDispatchToPropsType

export class UsersC extends React.Component<UsersPropsType> {

	componentDidMount() {
		this.props.getUsers(this.props.usersState.currentPage, this.props.usersState.pageSize);
	}

	onPageChanged = (pageNumber: number) => {
		this.props.getUsers(pageNumber, this.props.usersState.pageSize);
	};

	render() {
		return <>
			{this.props.usersState.isFetching ? <Preloader/> : null}
			<Users usersState={this.props.usersState}
				   follow={this.props.follow}
				   unfollow={this.props.unfollow}
				   setCurrentPage={this.props.setCurrentPage}
				   onPageChanged={this.onPageChanged}
				   toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
			/>;
		</>;
	}
}

const mapStateToProps = (state: AppStateType): UsersMapStateToPropsType => {
	return {
		usersState: getUsersPageSuperSelector(state)
	};
};

export const UsersContainer = compose<React.ComponentType>(connect(mapStateToProps,
	{
		follow: followThunkCreator,
		unfollow: unfollowThunkCreator,
		setCurrentPage: setCurrentPageAC,
		toggleIsFollowingProgress: toggleIsFollowingProgressAC,
		getUsers: getUsersThunkCreator
	}))(UsersC);
