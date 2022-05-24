import {ActionTypes} from "./store";


const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

export type UserType = {
    id: string
    photoUrl:string
    followed: boolean
    fullName: string,
    status: string
    location: {city: string, country: string}
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


export const followAC = (id: string) => {
    return {
        type: FOLLOW,
        userID: id,
    } as const
}

export const unfollowAC = (id: string) => {
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


