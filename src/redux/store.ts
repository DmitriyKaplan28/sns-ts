import {DialogsStateType} from "../components/Dialogs/DialogsContainer";
import {
    addPostAC,
    deletePostAC,
    savePhotoSuccessAC,
    setStatusAC,
    setUserProfileAC,
    updateNewPostTextAC
} from "./profileReducer";
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
import {getCaptchaURLAC, setUserDataAC} from "./authReducer";
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
    | ReturnType<typeof savePhotoSuccessAC>
    | ReturnType<typeof getCaptchaURLAC>
