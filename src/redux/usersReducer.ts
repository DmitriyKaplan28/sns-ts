import {ActionTypes} from "./store";


const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'

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
}

let initialState: UsersType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 2
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



