import {ActionTypes} from "./store";
import {DialogsStateType} from "../components/Dialogs/DialogsContainer";

const SEND_MESSAGE = 'DIALOGS/SEND-MESSAGE'

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
}

export const dialogsReducer = (state: DialogsStateType = initialState, action: ActionTypes): DialogsStateType => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: '6', message: body}]
            };
        default:
            return state;
    }
}

export const sendMessageAC = (newMessageBody: string) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    } as const
}