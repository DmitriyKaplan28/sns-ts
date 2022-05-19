import {ActionTypes} from "./store";
import {DialogsStateType} from "../components/Dialogs/DialogsContainer";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

type UserType = {
    id: string
    followed: boolean
    fullName: string,
    status: string
    location: {city: string, country: string}
}

export type UsersType = {
    users: UserType[]
}

let initialState: UsersType = {
    users: [
        {id: "1", followed: true, fullName: "Dmitriy", status: 'asff', location: {city: 'Saint-Petersburg', country: 'Russia'}},
        {id: "2", followed: true, fullName: "Oksana", status: 'asff', location: {city: 'Saint-Petersburg', country: 'Russia'}},
        {id: "3", followed: false, fullName: "Alex", status: 'asff', location: {city: 'Moscow', country: 'Russia'}},

    ]
}

export const usersReducer = (state :UsersType = initialState, action: ActionTypes): UsersType => {

    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)};

        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)};

            case SET_USERS:
            return {...state, users: [...state.users, action.users]};

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

export const setUsersAC = (users: UsersType) => {
    return {
        type: SET_USERS,
        users: users,
    } as const
}


