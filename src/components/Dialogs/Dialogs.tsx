import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css';
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Message/Message";
import {DialogsStateType} from "./DialogsContainer";
import {Field, Form} from "react-final-form";


export type DialogsPropsType = {
    dialogsState: DialogsStateType
    sendMessage: () => void
    newMessage: (messageBody: string) => void
    isAuth: boolean
}

export const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props?.dialogsState.dialogs?.map((dialog, index) => <Dialog key={index} name={dialog.name}
                                                                                      id={dialog.id}/>)
    let messagesElements = props?.dialogsState.messages?.map((message, index) => <Message key={index}
                                                                                          message={message.message}/>)

    const sendMessageOnClick = () => {
        props.sendMessage()
    }

    const newMessageOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newMessageBody = e.currentTarget.value
        props.newMessage(newMessageBody)
    }

    //if (!props.isAuth) return <Navigate replace to={'/login'} />

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>

                {dialogsElements}

            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <div>
                    <DialogsReduxForm value={props.dialogsState.newMessageBody}
                                           onChange={newMessageOnChange}
                                           onClick={sendMessageOnClick}
                    />
                </div>
            </div>
        </div>
    )
}

type DialogsReduxFormType = {
    value: string
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onClick: () => void
}

const DialogsReduxForm = ({value, onChange, ...restProps}: DialogsReduxFormType) => {
    const onSubmit = () => {
        restProps.onClick();
        console.log('123')
    }
    return <Form onSubmit={onSubmit}>
        {props => (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name="message" component="textarea" placeholder="Enter your message"/>
                </div>
                <button>Send</button>
            </form>
        )}
    </Form>
}