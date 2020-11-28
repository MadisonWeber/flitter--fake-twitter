import React from 'react'
import Users from './Users'
import Happening from './Happening'

const SidebarRight = () => {
    return (
        <div className = 'sidebarRight__section'>
            <Happening />
            <Users />
        </div>
    )
}

export default SidebarRight
