import React, { useContext } from 'react';
import Avatar from './Avatar';
import "../css/showuser.css"
import { GlobalContext } from '../context/globalContext'

const ShowUser = ({user}) => {
   

    const { unfollowUser, followUser, currentUser } = useContext(GlobalContext)

    return (
        <div className = 'show__user__container'>
            <div className="show__user__left">
                <Avatar id = {user._id} profilePic = {user.profilePic}/>
            </div>
            <div className="show__user__center">
                <p className="show__user__name">{user.user}</p>
                <p className = "show__user__handle">@{user.user}</p>
            </div>
            <div className="show__user__right">
            {currentUser._id !== user._id ? (
                currentUser.following.includes(user._id) ?
                    (<button className="unfollow__user" onClick = {()=> unfollowUser(user)}> UnFollow</button> ):
                    (<button className="follow__user" onClick = {()=> followUser(user)}> Follow</button>)
                ) : <></>
            }
            </div>
        </div>
    )
}



export default ShowUser
