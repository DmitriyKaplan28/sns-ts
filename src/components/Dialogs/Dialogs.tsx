import React from 'react';
import classes from './Dialogs.module.css';
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


/*export type DialogsPropsType = {
    dialogsState: DialogsStateType
    sendMessage: () => void
    newMessage: (messageBody: string) => void
    isAuth: boolean
}*/

export const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props?.dialogsState.dialogs?.map((dialog, index) => <Dialog key={index} name={dialog.name}
                                                                                      id={dialog.id}/>)
    let messagesElements = props?.dialogsState.messages?.map((message, index) => <Message key={index}
                                                                                          message={message.message}/>)

    const addNewMessage = (formData: FormDataType) => {
        props.sendMessage(formData.newMessageBody)
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>

                {dialogsElements}

            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <div>
                    <AddMessageReduxForm onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>
    )
}

type FormDataType = {
    newMessageBody: string
}

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
        <Field placeholder={'Enter your message'} name={'newMessageBody'} component={'textarea'}/>
        <button>Send</button>
    </form>)
}

const AddMessageReduxForm = reduxForm<FormDataType>({form: 'addMessageForm'})(AddMessageForm)