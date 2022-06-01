import React from 'react';
import {DialogType} from "./Dialog/Dialog";
import {MessageType} from "./Message/Message";
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";

export type DialogsStateType = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageBody: string
}

type MapStateToPropsDialogsType = {
    dialogsState: DialogsStateType
}

type mapDispatchToPropsDialogsType = {
    sendMessage: () => void
    newMessage: (messageBody: string) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsDialogsType => {
    return {
        dialogsState: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsDialogsType => {
    return {
        sendMessage: () => {dispatch(sendMessageAC())},
        newMessage: (messageBody: string) => {dispatch(updateNewMessageBodyAC(messageBody))},
    }
}

export const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs);