import React from 'react';
import classes from './Dialogs.module.css';
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Message/Message";
import {dialogs, messages} from "../../index";
import {DataType} from "../../App";

export const Dialogs = (props:DataType) => {

    let dialogsElements = props?.dialogs?.map((dialog, index) => <Dialog key={index} name={dialog.name} id={dialog.id}/>)
    let messagesElements = props?.messages?.map((message, index) => <Message key={index} message={message.message}/>)

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