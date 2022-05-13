import {ActionTypes} from "./state";
import {DialogsStateType} from "../components/Dialogs/Dialogs";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

export const dialogsReducer = (state: DialogsStateType, action: ActionTypes) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.newMessageBody;
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messages.push({id: '6', message: body});
            return state;
        default:
            return state;
    }
}

export const updateNewMessageBodyAC = (newMessageBody: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        newMessageBody: newMessageBody
    } as const
}

export const sendMessageAC = (newMessageBody: string) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody: newMessageBody
    } as const
}