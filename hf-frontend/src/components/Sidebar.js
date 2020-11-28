import React, { useContext } from 'react'
import '../css/sidebar.css'
import { GlobalContext } from "../context/globalContext"
import { VIEW } from "../utilities/currentView"
import ReactTooltip from 'react-tooltip';

const Sidebar = () => {

    const {setCurrentMain, setFeatureProfile, currentUser} = useContext(GlobalContext)

    const handleProfileClick = () => {
        setFeatureProfile(currentUser)
        setCurrentMain(VIEW.FEATUREDPROFILE)
    }

    return (
        <div className = 'sidebar__section'>
            <div className="sidebar__container">
                <div className="sidebar__home__container" onClick = {()=> setCurrentMain(VIEW.FEED)}>
                    <i className = 'fas fa-home' ></i>
                    <p className = 'sidebar-home'>Home</p>
                </div>
                <div className="sidebar__profile__container" onClick = {handleProfileClick}>
                    <i className = 'far fa-user' ></i>
                    <p className = 'sidebar-explore'>Profile</p>
                </div>
                <div className="sidebar__notifications__container" data-tip data-for = 'working-tooltip'>
                    <i className = 'far fa-bell'></i>
                    <p className = 'sidebar-notifications'>Notifications</p>
                </div>
                <div className="sidebar__messages__container" data-tip data-for = 'working-tooltip'>
                    <i className="far fa-envelope"></i>
                    <p className = 'sidebar-messages'>Messages</p>
                </div>
                <div className="sidebar__bookmarks__container" data-tip data-for = 'working-tooltip'>
                    <i className="far fa-bookmark"></i>
                    <p className = 'sidebar-bookmarks'>Bookmarks</p>

                </div>
                <div className="sidebar__lists__container" data-tip data-for = 'working-tooltip'>
                    <i className="far fa-list-alt"></i>
                    <p className = 'sidebar-lists'>Lists</p>
                </div>
                <div className="sidebar__more__container" data-tip data-for = 'working-tooltip'>
                    <i className="fas fa-ellipsis-h"></i>
                    <p className = 'sidebar-more'>More</p>
                </div>
            </div>
            
            <ReactTooltip  id = 'working-tooltip' place = 'right' effect = 'solid' type = 'light' textColor ="rgb(29,161,242)" backgroundColor = 'rgb(20,29,38)'>Feature Coming Soon</ReactTooltip>
        </div>
    )
}

export default Sidebar
