import React from "react";
import {MyPosts} from "../MyPosts";
import {addPostAC, updateNewPostTextAC} from "../../../../redux/profileReducer";
import {ProfileStateType} from "../../Profile";
import {ActionTypes} from "../../../../redux/store";
import StoreContext from "../../../../StoreContext";

type MyPostsContainerType = {
    /*state: ProfileStateType
    dispatch: (action: ActionTypes) => void*/
}

export const MyPostsContainer = (props: MyPostsContainerType) => {


    /* const addPost = (postText: string) => {
         props.dispatch(addPostAC(postText))
     }

     const onPostChange = (newText: string) => {
         let action = updateNewPostTextAC(newText)
         props.dispatch(action)
     }*/

    return (
        <StoreContext.Consumer>
            {
                (store) => {

                    let state = store.getState()

                    const addPost = (postText: string) => {
                        store.dispatch(addPostAC(postText))
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
        /*<MyPosts updateNewPostText={onPostChange}
                 addPost={addPost}
                 posts={props.state.posts}
                 newPostText={props.state.newPostText}/>*/
    );
}