import {ActionTypes} from "./store";
import {DialogsStateType} from "../features/Dialogs/DialogsContainer";

const SEND_MESSAGE = "DIALOGS/SEND-MESSAGE";

const initialState: DialogsStateType = {
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
};

export const dialogsReducer = (state: DialogsStateType = initialState, action: ActionTypes): DialogsStateType => {

	switch (action.type) {
	case SEND_MESSAGE:
		return {
			...state,
			messages: [...state.messages, {id: "6", message: action.newMessageBody}]
		};
	default:
		return state;
	}
};

export const sendMessageAC = (newMessageBody: string) => {
	return {
		type: SEND_MESSAGE,
		newMessageBody
	} as const;
};