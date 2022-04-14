import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {DataType} from "../../App";



export const Profile = (props: DataType) => {
    return (
        <div >
            <ProfileInfo/>
            <MyPosts posts={props.posts}/>
        </div>
    );
}