import React from "react";
import {MyPosts} from "./MyPosts";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";
import {sendMessageAC, updateNewMessageBodyAC} from "../../../redux/dialogsReducer";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {ProfileStateType} from "../Profile";
import {DialogsStateType} from "../../Dialogs/DialogsContainer";
import {PostPropsType} from "./Post/Post";
import {Dispatch} from "redux";

type MyPostsContainerType = {
    /*state: ProfileStateType
    dispatch: (action: ActionTypes) => void*/
}

/*export const MyPostsContainer = (props: MyPostsContainerType) => {


    /!* const addPost = (postText: string) => {
         props.dispatch(addPostAC(postText))
     }

     const onPostChange = (newText: string) => {
         let action = updateNewPostTextAC(newText)
         props.dispatch(action)
     }*!/

    return (
        <StoreContext.Consumer>
            {
                (store) => {

                    let state = store.getState()

                    const addPost = (newPostText: string) => {
                        store.dispatch(addPostAC(newPostText))
                    };

                    const onPostChange = (newText: string) => {
                        let action = updateNewPostTextAC(newText)
                        store.dispatch(action)
                    };

                    return <MyPosts updateNewPostText={onPostChange}
                                    addPost={addPost}
                                    posts={state.profilePage.posts}
                                    newPostText={state.profilePage.newPostText}/>
                }

            }
        </StoreContext.Consumer>
        /!*<MyPosts updateNewPostText={onPostChange}
                 addPost={addPost}
                 posts={props.state.posts}
                 newPostText={props.state.newPostText}/>*!/
    );
}*/

type MapStateToPropsMyPostsType = {
    posts: PostPropsType[]
    newPostText: string
}

type mapDispatchToPropsMyPostsType = {
    updateNewPostText: (newText: string) => void
    addPost: (newPostText:string) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsMyPostsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsMyPostsType => {
    return {
        updateNewPostText: (newText: string) => {let action = updateNewPostTextAC(newText)
            dispatch(action)},
        addPost: (newPostText:string) => {dispatch(addPostAC(newPostText))},

    }
}

export const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);