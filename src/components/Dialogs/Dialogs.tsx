import React from 'react';
import classes from './Dialogs.module.css';
import {Dialog, DialogType} from "./Dialog/Dialog";
import {Message, MessageType} from "./Message/Message";
import {AppStateType} from "../../App";

export type DialogsStateType ={
    dialogs: DialogType[]
    messages: MessageType[]
}

type DialogsPropsType = {
    dialogsState: DialogsStateType
}

export const Dialogs = (props:DialogsPropsType) => {

    let dialogsElements = props?.dialogsState.dialogs?.map((dialog, index) => <Dialog key={index} name={dialog.name} id={dialog.id}/>)
    let messagesElements = props?.dialogsState.messages?.map((message, index) => <Message key={index} message={message.message}/>)

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>

                {dialogsElements}

            </div>
            <div className={classes.messages}>

                { messagesElements }

            </div>
        </div>
    )
}