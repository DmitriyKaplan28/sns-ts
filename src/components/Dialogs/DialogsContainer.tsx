import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css';
import {Dialog, DialogType} from "./Dialog/Dialog";
import {Message, MessageType} from "./Message/Message";
import {ActionTypes} from "../../redux/store";
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogsReducer";
import {Dialogs} from "./Dialogs";

export type DialogsStateType = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageBody: string
}

type DialogsPropsType = {
    dialogsState: DialogsStateType
    dispatch : (action:ActionTypes) => void
}

export const DialogsContainer = (props: DialogsPropsType) => {


    const sendMessageOnClick = () => {
        props.dispatch(sendMessageAC(props.dialogsState.newMessageBody))
    }

    const newMessageOnChange = (messageBody: string) => {
        props.dispatch(updateNewMessageBodyAC(messageBody))
    }

    return (
        <Dialogs dialogsState={props.dialogsState}
                 sendMessage={sendMessageOnClick}
                 newMessage={newMessageOnChange}/>
    )
}