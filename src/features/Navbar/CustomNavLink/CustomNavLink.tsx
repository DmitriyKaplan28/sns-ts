import React from "react";
import {NavLink} from "react-router-dom";
import classes from './CustomNavLink.module.css';

type CustomNavLinkPropsType = {
    path: string
    menuItem: string
}

export const CustomNavLink = ({path, menuItem} : CustomNavLinkPropsType) => {
    return (
            <div className={classes.item}>
                <NavLink to={path}
                         className={navData => navData.isActive ? classes.active : classes.item}>{menuItem}</NavLink>
            </div>
    );
}