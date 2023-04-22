import classes from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

export type DialogType = {
    name: string
    id: string
}

export const Dialog = ({name, id}: DialogType) => {
    let path = "/dialogs/" + id;
    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <NavLink to={path}>{name}</NavLink>
        </div>
    )
}