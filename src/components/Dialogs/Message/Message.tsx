import classes from "../Dialogs.module.css";
import React from "react";

export type MessageType={
    message: string
    id?: string
}

export const Message = (props: MessageType) => {
    return (
        <div className={classes.message}>{props.message}</div>
    )
}