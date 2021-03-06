import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import { UsersType} from "../../redux/usersReducer";
import {NavLink} from "react-router-dom";
import classes from "../Navbar/Navbar.module.css";


type UsersFunctionalPropsType = {
    usersState: UsersType
    follow: (id: number) => void
    unfollow: (id: number) => void
    setCurrentPage: (pageNumber: number) => void
    onPageChanged: (pageNumber: number) => void
    toggleIsFollowingProgress: (isFetching: boolean, id: number) => void
}

export const UsersFunctional = (props: UsersFunctionalPropsType) => {
    let pagesCount = Math.ceil(props.usersState.totalUsersCount / props.usersState.pageSize);

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        <div>
            {pages.map(p => <span className={props.usersState.currentPage === p ? styles.selectedPage : ''}
                                  onClick={() => {
                                      props.onPageChanged(p)
                                  }}>{p}</span>)}
        </div>
        {
            props.usersState.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={"/profile/" + u.id} className={navData=>navData.isActive ? classes.active:classes.item}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} alt={'user photo'}/>
                        </NavLink>
                            </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.usersState.followingInProgress.some(id => id=== u.id)}
                                          onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                                : <button disabled={props.usersState.followingInProgress.some(id => id=== u.id)}
                                          onClick={() => {props.follow(u.id)}}>Follow</button>}
                        </div>
                    </span>
                <span>
                       <span>
                           <div>{u.name}</div><div>{u.status}</div>
                       </span>
                        <span>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </span>
            </div>)
        }
    </div>;
}

