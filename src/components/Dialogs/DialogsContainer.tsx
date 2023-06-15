import React from 'react';
import {DialogType} from "./Dialog/Dialog";
import {MessageType} from "./Message/Message";
import {sendMessageAC} from "../../redux/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";

export type DialogsStateType = {
    dialogs: DialogType[]
    messages: MessageType[]
}

type MapStateToPropsDialogsType = {
    dialogsState: DialogsStateType
    isAuth: boolean
}

type mapDispatchToPropsDialogsType = {
    sendMessage: (newMessageBody: string) => void
}

export type DialogsPropsType = MapStateToPropsDialogsType & mapDispatchToPropsDialogsType


let mapStateToProps = (state: AppStateType): MapStateToPropsDialogsType => {
    return {
        dialogsState: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsDialogsType => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageAC(newMessageBody))
        },
    }
}

export const DialogsContainer = compose<React.ComponentType>(connect(mapStateToProps, mapDispatchToProps))(Dialogs)