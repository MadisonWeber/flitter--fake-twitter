import React, { useContext } from 'react';
import { GlobalContext } from "../context/globalContext";
import ShowUser from './ShowUser';
import NoMore from './NoMore'


const ProfileFollowing = () => {

    const { allUsers, featureProfile } = useContext(GlobalContext);

    const allFollowing = allUsers.filter((user) => {
        return user.followers.includes(featureProfile._id)
    })

    return (
        <div className = 'generic__tweets__container-80'>
            {allFollowing.map( follower => <ShowUser key = {follower._id} user = {follower}/>)}
            <NoMore input = {"Users"} />
        </div>
    )
}

export default ProfileFollowing
