import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css';
import {Dialog, DialogType} from "./Dialog/Dialog";
import {Message, MessageType} from "./Message/Message";
import {ActionTypes} from "../../redux/store";
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogsReducer";
import {DialogsStateType} from "./DialogsContainer";


type DialogsPropsType = {
    dialogsState: DialogsStateType
    sendMessage: ()=> void
    newMessage: (messageBody: string)=> void
}

export const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props?.dialogsState.dialogs?.map((dialog, index) => <Dialog key={index} name={dialog.name}
                                                                                      id={dialog.id}/>)
    let messagesElements = props?.dialogsState.messages?.map((message, index) => <Message key={index}
                                                                                          message={message.message}/>)

    const sendMessageOnClick = () => {
        props.sendMessage()
    }

    const newMessageOnChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        let newMessageBody = e.currentTarget.value
        props.newMessage(newMessageBody)
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>

                {dialogsElements}

            </div>
            <div className={classes.messages}>

                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={props.dialogsState.newMessageBody}
                                   onChange={newMessageOnChange}
                                   placeholder='Enter your message'></textarea></div>
                    <div>
                        <button onClick={sendMessageOnClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}