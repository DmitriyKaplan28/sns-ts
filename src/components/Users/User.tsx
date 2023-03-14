import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UserType} from "../../redux/usersReducer";
import {NavLink} from "react-router-dom";
import classes from "../Navbar/Navbar.module.css";

type UserPropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: number[]
}

export const User = ({user, followingInProgress, follow, unfollow}: UserPropsType) => {

    return <div>
                    <span>
                        <div>
                            <NavLink to={"/profile/" + user.id}
                                     className={navData => navData.isActive ? classes.active : classes.item}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto}
                             className={styles.userPhoto}
                             alt={'user photo'}/>
                        </NavLink>
                            </div>
                        <div>
                            {user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              unfollow(user.id)
                                          }}>Unfollow</button>
                                : <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              follow(user.id)
                                          }}>Follow</button>}
                        </div>
                    </span>
        <span>
                       <span>
                           <div>{user.name}</div><div>{user.status}</div>
                       </span>
                        <span>
                            <div>Random Country</div>
                            <div>Random City</div>
                        </span>
                    </span>
    </div>
}