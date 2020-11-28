import React from 'react'
import '../css/home.css'
import Sidebar from '../components/Sidebar'
import MainTop from '../components/MainTop'
import Main from '../components/Main'
import Profile from '../components/Profile'
import SidebarRight from './SidebarRight'


const Home = () => {


    return (
        <div className = 'home'>
            <Sidebar />
            <MainTop />
            <Main />
            <Profile />
            <SidebarRight />
        </div>
    )
}

export default Home
