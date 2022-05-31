import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersType, UserType} from "../../redux/usersReducer";

type UsersFunctionalPropsType = {
    usersState: UsersType
    follow: (id: number) => void
    unfollow: (id: number) => void
    setCurrentPage: (pageNumber: number) => void
    onPageChanged: (pageNumber: number) => void
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
                                  onClick={(e) => {
                                      props.onPageChanged(p)
                                  }}>{p}</span>)}
        </div>
        {
            props.usersState.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                        </div>
                        <div>
                            {u.followed ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.follow(u.id)
                                }}>Follow</button>}
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

