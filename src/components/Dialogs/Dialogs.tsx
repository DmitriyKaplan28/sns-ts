import React from 'react';
import classes from './Dialogs.module.css';
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Message/Message";

export const Dialogs = () => {
return (
    <div className={classes.dialogs}>
        <div className={classes.dialogsItems}>
        <Dialog name="Dmitriy" id="1"/>
        <Dialog name="Oksana" id="2"/>
        <Dialog name="Andrey" id="3"/>
        <Dialog name="4" id="4"/>
        <Dialog name="5" id="5"/>
        <Dialog name="6" id="6"/>
        </div>
        <div className={classes.messages}>
            <Message message="hi"/>
            <Message message="bye"/>
            <Message message="lol"/>
        </div>
    </div>
)
}