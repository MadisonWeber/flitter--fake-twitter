import React, { useContext } from 'react'
import { GlobalContext } from '../context/globalContext'
import "../css/avatar.css"
import defaultImage from '../images/NOUSER.jpg'

const Avatar = ({profilePic, id}) => {

    const { handleFeatureProfile } = useContext(GlobalContext);

    return (
        <div className="avatar" onClick = {(e)=> handleFeatureProfile(e, id)}> 
            {profilePic ? <img className = 'avatar__image' src={profilePic} alt={"broke"}/> : <img className = 'avatar__image_no_user' src={defaultImage} alt={"broke"}/>}
        </div>
    )
}

export default Avatar
