import React from 'react';
import classes from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

export const Dialogs = () => {
return (
    <div className={classes.dialogs}>
        <div className={classes.dialogsItems}>
        <div className={classes.dialog + ' ' + classes.active}>
            <NavLink to="/dialogs/1">Dmitriy</NavLink>
            </div>
        <div className={classes.dialog}><NavLink to="/dialogs/2">Andrey</NavLink></div>
        <div className={classes.dialog}><NavLink to="/dialogs/3">Oksana</NavLink></div>
        <div className={classes.dialog}><NavLink to="/dialogs/4">4</NavLink></div>
        <div className={classes.dialog}><NavLink to="/dialogs/5">5</NavLink></div>
        <div className={classes.dialog}><NavLink to="/dialogs/6">6</NavLink></div>
        </div>
        <div className={classes.messages}>
            <div className={classes.message}>hi</div>
            <div className={classes.message}>bye</div>
            <div className={classes.message}>lol</div>
        </div>
    </div>
)
}