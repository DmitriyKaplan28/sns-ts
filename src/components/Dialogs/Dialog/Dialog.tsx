import classes from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

type DialogType={
    name: string
    id: string
}

export const Dialog = (props: DialogType) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}