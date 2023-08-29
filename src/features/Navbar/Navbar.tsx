import React from "react";
import classes from './Navbar.module.css';
import {CustomNavLink} from "./CustomNavLink/CustomNavLink";


export const Navbar = () => {

    const menuItems = [
        {path: "/profile/24103", menuItem: "Profile"},
        {path: "/dialogs", menuItem: "Messages"},
        {path: "/users", menuItem: "Users"},
        {path: "/news", menuItem: "News"},
        {path: "/music", menuItem: "Music"},
        {path: "/settings", menuItem: "Settings"},
    ]

    return (
        <nav className={classes.nav}>
            {menuItems.map(m => <CustomNavLink path={m.path} menuItem={m.menuItem} />)}
        </nav>
    );
}