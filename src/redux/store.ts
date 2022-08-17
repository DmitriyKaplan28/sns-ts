import {DialogsStateType} from "../components/Dialogs/DialogsContainer";
import {addPostAC, deletePostAC, setStatusAC, setUserProfileAC, updateNewPostTextAC} from "./profileReducer";
import {sendMessageAC} from "./dialogsReducer";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    toggleIsFetchingAC, toggleIsFollowingProgressAC,
    unfollowAC
} from "./usersReducer";
import {ProfileStateType} from "../components/Profile/ProfileContainer";
import {setUserDataAC} from "./authReducer";
import {setInitializedAC} from "./appReducer";

export type StateType = {
    profilePage: ProfileStateType
    dialogsPage: DialogsStateType
    sidebar: any
}

export type StoreType = {
    _state: StateType
    _callSubscriber: () => void

    getState: () => StateType
    subscribe: (observer: () => void) => void

    dispatch: (action: ActionTypes) => void
}

export type ActionTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof toggleIsFetchingAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setUserDataAC>
    | ReturnType<typeof toggleIsFollowingProgressAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setInitializedAC>
    | ReturnType<typeof deletePostAC>

/*
export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: "1", post: "Hi how are you", like: '10 likes'},
                {id: "2", post: "my first post", like: '5 likes'}
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: "1", name: "Dmitriy"},
                {id: "2", name: "Oksana"},
                {id: "3", name: "Andrey"},
                {id: "4", name: "4"},
                {id: "5", name: "5"},
                {id: "6", name: "6"}
            ],
            messages: [
                {id: "1", message: "hi"},
                {id: "2", message: "bye"},
                {id: "3", message: "lol"},
                {id: "4", message: "4"},
                {id: "5", message: "5"},
            ],
            newMessageBody: ''
        },
        sidebar: {},
    },
    _callSubscriber() {
        console.log('state is changing')
    },

    getState() {
        return this._state
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber()
    }
}*/
