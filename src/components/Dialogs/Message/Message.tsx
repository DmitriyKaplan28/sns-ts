import classes from "../Dialogs.module.css";
import React from "react";

export type MessageType = {
    message: string
    id?: string
}

export const Message = ({message, id}: MessageType) => {
    return (
        <div className={classes.message}>{message}</div>
    )
}