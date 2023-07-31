import React from "react";
import {MyPosts} from "./MyPosts";
import {addPostAC, updateNewPostTextAC} from "../../../store/profileReducer";
import {connect} from "react-redux";
import {AppStateType} from "../../../store/redux-store";
import {PostPropsType} from "./Post/Post";
import {Dispatch} from "redux";

type MapStateToPropsMyPostsType = {
    posts: PostPropsType[]
    newPostText: string
}

type mapDispatchToPropsMyPostsType = {
    updateNewPostText: (newText: string) => void
    addPost: (newPostText: string) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsMyPostsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsMyPostsType => {
    return {
        updateNewPostText: (newText: string) => {
            let action = updateNewPostTextAC(newText)
            dispatch(action)
        },
        addPost: (newPostText: string) => {
            dispatch(addPostAC(newPostText))
        },

    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);