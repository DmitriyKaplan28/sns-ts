import {ActionTypes} from "./store";
import {DialogsStateType} from "../components/Dialogs/DialogsContainer";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState: DialogsStateType = {
    dialogs: [
        {id: "1", name: "Dmitriy"},
        {id: "2", name: "Oksana"},
        {id: "3", name: "Andrey"},
        {id: "4", name: "4"},
        {id: "5", name: "5"},
        {id: "6", name: "6"}
    ],
    messages: [
        {id: "1", message: "hi"},
        {id: "2", message: "bye"},
        {id: "3", message: "lol"},
        {id: "4", message: "4"},
        {id: "5", message: "5"},
    ],
    newMessageBody: ''
}

export const dialogsReducer = (state: DialogsStateType = initialState, action: ActionTypes): DialogsStateType => {
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

export const sendMessageAC = () => {
    return {
        type: SEND_MESSAGE,
    } as const
}