import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import styles from './Users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/user.png'

export class UsersC extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersState.currentPage}&count=${this.props.usersState.pageSize}`).then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            }
        )
    }

    onPageChanged = (pageNumber:number) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersState.pageSize}`).then(response => {
                this.props.setUsers(response.data.items)
            }
        )
    }

    render() {

        let pagesCount = Math.ceil(this.props.usersState.totalUsersCount / this.props.usersState.pageSize);

        let pages = []
        for (let i=1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return (
            <div>
                <div>
                    {pages.map(p => <span className={this.props.usersState.currentPage === p ? styles.selectedPage : ''}
                    onClick={(e) => {this.onPageChanged(p)}}>{p}</span>)}
                </div>
                {
                    this.props.usersState.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                        </div>
                        <div>
                            {u.followed ? <button onClick={() => {
                                    this.props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
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
            </div>
        );
    }
}

