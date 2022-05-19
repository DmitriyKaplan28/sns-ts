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
    users: [
       /* {id: "1", photoUrl: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg', followed: true, fullName: "Dmitriy", status: 'asff', location: {city: 'Saint-Petersburg', country: 'Russia'}},
        {id: "2", photoUrl: 'https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg', followed: true, fullName: "Oksana", status: 'asff', location: {city: 'Saint-Petersburg', country: 'Russia'}},
        {id: "3", photoUrl: 'data:image/jpeg;base64,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',
            followed: false, fullName: "Alex", status: 'asff', location: {city: 'Moscow', country: 'Russia'}},*/

    ]
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


