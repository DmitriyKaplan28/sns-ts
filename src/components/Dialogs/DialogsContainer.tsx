import React from 'react';
import {DialogType} from "./Dialog/Dialog";
import {MessageType} from "./Message/Message";
import {ActionTypes} from "../../redux/store";
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogsReducer";
import {Dialogs} from "./Dialogs";
import StoreContext from '../../StoreContext';

export type DialogsStateType = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageBody: string
}

type DialogsPropsType = {
    /*dialogsState: DialogsStateType
    dispatch: (action: ActionTypes) => void*/
}

export const DialogsContainer = (props: DialogsPropsType) => {


/*
    const sendMessageOnClick = () => {
        props.dispatch(sendMessageAC(props.dialogsState.newMessageBody))
    }

    const newMessageOnChange = (messageBody: string) => {
        props.dispatch(updateNewMessageBodyAC(messageBody))
    }
*/

    return (
        <StoreContext.Consumer>
            {
                (store) => {

                    let state = store.getState()

                    const sendMessageOnClick = () => {
                        store.dispatch(sendMessageAC(state.dialogsPage.newMessageBody))
                    }

                    const newMessageOnChange = (messageBody: string) => {
                        store.dispatch(updateNewMessageBodyAC(messageBody))
                    }

                    return <Dialogs dialogsState={state.dialogsPage}
                                    sendMessage={sendMessageOnClick}
                                    newMessage={newMessageOnChange}/>
                }
            }
        </StoreContext.Consumer>
        /*<Dialogs dialogsState={props.dialogsState}
                 sendMessage={sendMessageOnClick}
                 newMessage={newMessageOnChange}/>*/
    )
}