import React from 'react';
import classes from './Dialogs.module.css';
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Message/Message";

export const Dialogs = () => {

    let dialogs = [
        {id: "1", name: "Dmitriy"},
        {id: "2", name: "Oksana"},
        {id: "3", name: "Andrey"},
        {id: "4", name: "4"},
        {id: "5", name: "5"},
        {id: "6", name: "6"}
    ]

    let messages = [
        {id: "1", message: "hi"},
        {id: "2", message: "bye"},
        {id: "3", message: "lol"}
    ]
    let dialogsElements = dialogs.map((dialog, index) => <Dialog key={index} name={dialog.name} id={dialog.id}/>)
    let messagesElements = messages.map((message, index) => <Message key={index} message={message.message}/>)

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