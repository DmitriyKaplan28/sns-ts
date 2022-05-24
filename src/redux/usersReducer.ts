import {ActionTypes} from "./store";


const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

type UserLocationType = {
    city: string
    country: string
}

export type UserType = {
    id: number
    photoUrl: string
    photos: {small: string}
    followed: boolean
    fullName: string
    name: string
    status: string
    location: UserLocationType
}

export type UsersType = {
    users: UserType[]
}

let initialState: UsersType = {
    users: []
}

export const usersReducer = (state: UsersType = initialState, action: ActionTypes): UsersType => {

    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)};

        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)};

            case SET_USERS:
            return {...state, users: [...state.users, ...action.users]};

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


