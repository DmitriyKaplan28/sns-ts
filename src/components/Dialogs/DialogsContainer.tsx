import React from 'react';
import {DialogType} from "./Dialog/Dialog";
import {MessageType} from "./Message/Message";
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

export type DialogsStateType = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageBody: string
}

type MapStateToPropsDialogsType = {
    dialogsState: DialogsStateType
    isAuth: boolean

}

type mapDispatchToPropsDialogsType = {
    sendMessage: () => void
    newMessage: (messageBody: string) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsDialogsType => {
    return {
        dialogsState: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsDialogsType => {
    return {
        sendMessage: () => {dispatch(sendMessageAC())},
        newMessage: (messageBody: string) => {dispatch(updateNewMessageBodyAC(messageBody))},
    }
}



//let AuthRedirectComponent = withAuthRedirect(Dialogs)

 /*   (props:DialogsPropsType) => {
    if (!props.isAuth) return <Navigate replace to={'/login'}/>
    return <Dialogs {...props}/>
}*/


export const DialogsContainer = compose<React.ComponentType>(connect(mapStateToProps,mapDispatchToProps),withAuthRedirect)(Dialogs)