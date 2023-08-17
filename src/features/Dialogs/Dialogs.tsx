import React from 'react';
import classes from './Dialogs.module.css';
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../../common/components/FormControls/FormControls";
import {maxLengthCreator, requiredField} from "../../common/utils/validators/validators";


type FormDataType = {
    newMessageBody: string
}

export const Dialogs = ({dialogsState, sendMessage, isAuth}: DialogsPropsType) => {

    let dialogsElements = dialogsState.dialogs?.map((dialog, index) => <Dialog key={index}
                                                                               name={dialog.name}
                                                                               id={dialog.id}/>)
    let messagesElements = dialogsState.messages?.map((message, index) => <Message
        key={index}
        message={message.message}/>)
    const addNewMessage = (formData: FormDataType) => {
        sendMessage(formData.newMessageBody)
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


const maxLength100 = maxLengthCreator(100)

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder={'Enter your message'}
                   name={'newMessageBody'}
                   component={TextArea}
                   validate={[requiredField, maxLength100]}
            />
            <button>Send</button>
        </form>)
}

const AddMessageReduxForm = reduxForm<FormDataType>({form: 'addMessageForm'})(AddMessageForm)