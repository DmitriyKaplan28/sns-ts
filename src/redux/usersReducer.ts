import {ActionTypes} from "./store";
import {usersAPI} from "../api/api";
import {AppStateType} from "./redux-store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Action} from "redux";


const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

type UserLocationType = {
    city: string
    country: string
}

export type UserType = {
    id: number
    photoUrl: string
    photos: { small: string }
    followed: boolean
    fullName: string
    name: string
    status: string
    location: UserLocationType
}

export type UsersType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

let initialState: UsersType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

export const usersReducer = (state: UsersType = initialState, action: ActionTypes): UsersType => {

    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)};

        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)};

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
}


export const followAC = (id: number) => {
    return {
        type: FOLLOW,
        userID: id,
    } as const
}

export const unfollowAC = (id: number) => {
    return {
        type: UNFOLLOW,
        userID: id,
    } as const
}

export const setUsersAC = (users: UserType[]) => {
    return {
        type: SET_USERS,
        users,
    } as const
}

export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage,
    } as const
}

export const setTotalUsersCountAC = (totalUsersCount: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount,
    } as const
}

export const toggleIsFetchingAC = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching,
    } as const
}

export const toggleIsFollowingProgressAC = (isFetching: boolean, userId: number) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching, userId
    } as const
}


export type ThunkType<A extends Action = Action> = ThunkAction<void, AppStateType, unknown, ActionTypes | A>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionTypes>

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {
    return (dispatch: ThunkDispatchType) => {

        dispatch(toggleIsFetchingAC(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetchingAC(false));
            dispatch(setUsersAC(data.items));
            dispatch(setTotalUsersCountAC(data.totalCount));
        });

    }
}

export const followThunkCreator = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatchType) => {

        dispatch(toggleIsFollowingProgressAC(true, userId));
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followAC(userId))
                }
                dispatch(toggleIsFollowingProgressAC(false, userId));
            })

    }
}

export const unfollowThunkCreator = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatchType) => {

        dispatch(toggleIsFollowingProgressAC(true, userId));
        usersAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode == 0) {
                    dispatch(unfollowAC(userId))
                }
                dispatch(toggleIsFollowingProgressAC(false, userId))
            })

    }
}

