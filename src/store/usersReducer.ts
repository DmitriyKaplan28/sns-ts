import {ActionTypes} from "./store";
import {usersAPI} from "../api/api";
import {AppStateType} from "./redux-store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {AxiosResponse} from "axios";

const FOLLOW = "USERS/FOLLOW";
const UNFOLLOW = "USERS/UNFOLLOW";
const SET_USERS = "USERS/SET-USERS";
const SET_CURRENT_PAGE = "USERS/SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "USERS/SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "USERS/TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "USERS/TOGGLE-IS-FOLLOWING-PROGRESS";


export type UserType = {
	id: number
	photoUrl: string
	photos: { small: string }
	followed: boolean
	fullName: string
	name: string
	status: string
}

export type UsersType = {
	users: UserType[]
	pageSize: number
	totalUsersCount: number
	currentPage: number
	isFetching: boolean
	followingInProgress: Array<number>
}

const initialState: UsersType = {
	users: [],
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: []
};

export const usersReducer = (state: UsersType = initialState, action: ActionTypes): UsersType => {

	switch (action.type) {
	case FOLLOW:
		return {...state,
			users: state.users.map(u => u.id === action.userID ? {
				...u,
				followed: true
			} : u)
		};
		//return {...state, users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})};

	case UNFOLLOW:
		return {...state,
			users: state.users.map(u => u.id === action.userID ? {
				...u,
				followed: false
			} : u)
		};
		//return {...state, users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})};

	case SET_USERS:
		return {...state, users: [...action.users]};

	case SET_CURRENT_PAGE:
		return {...state, currentPage: action.currentPage};

	case SET_TOTAL_USERS_COUNT:
		return {...state, totalUsersCount: action.totalUsersCount};

	case TOGGLE_IS_FETCHING:
		return {...state, isFetching: action.isFetching};

	case TOGGLE_IS_FOLLOWING_PROGRESS:
		return {
			...state, followingInProgress: action.isFetching
				? [...state.followingInProgress, action.userId]
				: state.followingInProgress.filter(id => id != action.userId)
		};

	default:
		return state;
	}
};

export const followAC = (id: number) => {
	return {
		type: FOLLOW,
		userID: id,
	} as const;
};

export const unfollowAC = (id: number) => {
	return {
		type: UNFOLLOW,
		userID: id,
	} as const;
};

export const setUsersAC = (users: UserType[]) => {
	return {
		type: SET_USERS,
		users,
	} as const;
};

export const setCurrentPageAC = (currentPage: number) => {
	return {
		type: SET_CURRENT_PAGE,
		currentPage,
	} as const;
};

export const setTotalUsersCountAC = (totalUsersCount: number) => {
	return {
		type: SET_TOTAL_USERS_COUNT,
		totalUsersCount,
	} as const;
};

export const toggleIsFetchingAC = (isFetching: boolean) => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching,
	} as const;
};

export const toggleIsFollowingProgressAC = (isFetching: boolean, userId: number) => {
	return {
		type: TOGGLE_IS_FOLLOWING_PROGRESS,
		isFetching, userId
	} as const;
};


export type ThunkType<A extends Action = Action> = ThunkAction<void, AppStateType, unknown, ActionTypes | A>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionTypes>


const followUnfollowFlow = async (
	dispatch: ThunkDispatchType, userId: number,
	apiMethod: (userId: number) => Promise<AxiosResponse>,
	actionCreator: (userId: number) => ReturnType<typeof followAC> | ReturnType<typeof unfollowAC>
) => {
	dispatch(toggleIsFollowingProgressAC(true, userId));

	const response = await apiMethod(userId);

	if (response.data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleIsFollowingProgressAC(false, userId));
};


export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {
	return async (dispatch: ThunkDispatchType) => {
		dispatch(toggleIsFetchingAC(true));
		dispatch(setCurrentPageAC(currentPage));

		const data = await usersAPI.getUsers(currentPage, pageSize);

		dispatch(toggleIsFetchingAC(false));
		dispatch(setUsersAC(data.items));
		dispatch(setTotalUsersCountAC(data.totalCount));
	};
};

export const followThunkCreator = (userId: number): ThunkType => {
	return async (dispatch: ThunkDispatchType) => {

		followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followAC);
	};
};

export const unfollowThunkCreator = (userId: number): ThunkType => {
	return async (dispatch: ThunkDispatchType) => {

		followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowAC);
	};
};

