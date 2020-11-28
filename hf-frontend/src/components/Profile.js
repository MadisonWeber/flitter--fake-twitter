import React, { useContext } from 'react'
import { GlobalContext } from "../context/globalContext"
import "../css/profile.css"
import Avatar from './Avatar'
import { VIEW } from '../utilities/currentView'


const Profile = () => {

    const { logout, currentUser, toggleUploadModal, setCurrentMain, setFeatureProfile } = useContext(GlobalContext)


    const handleFollowersClick = () => {
        setFeatureProfile(currentUser)
        setCurrentMain(VIEW.FEATUREDPROFILEFOLLOWERS)
    }

    const handleFollowingClick = () => {
        setFeatureProfile(currentUser)
        setCurrentMain(VIEW.FEATUREDPROFILEFOLLOWING)
    }

    return (
        <div className = 'profile__section'>
            <div className="profile__inner__section">
                <h2 className = 'profile__title'>Profile</h2>
                <div className="main__profile__container">
                    <div className="profile__avatar__holder">
                        <Avatar profilePic = {currentUser.profilePic} id = {currentUser._id}/>
                        <p className="update__profile__pic" onClick = {toggleUploadModal}>Update Picture</p>
                    </div>
                    <div className="main__profile__info">
                        <p className = "profile__info__currentUser">@{currentUser.user} </p>
                        <p className = "profile__info__currentEmail">{currentUser.email} </p>
                        <p className = "profile__followers-count">Followers: <span className = "followers-count" onClick = {handleFollowersClick}>{currentUser.followers.length}</span></p>
                        <p className = "profile__following-count">Following: <span className = "following-count" onClick = {handleFollowingClick}>{currentUser.following.length}</span></p>
                    </div>
                </div>
                <button onClick = {logout} className = "logout__btn btn">Logout</button>
            </div>
        </div>
    )
}

export default Profile 
