import React, { useContext } from 'react';
import { GlobalContext } from "../context/globalContext";
import ShowUser from './ShowUser';
import NoMore from './NoMore'

const ProfileFollowers = () => {

    const { allUsers, featureProfile } = useContext(GlobalContext);

    const allFollowers = allUsers.filter((user) => {
        return user.following.includes(featureProfile._id)
    })

    return (
        <div className = 'generic__tweets__container-80'>
            {allFollowers.map( follower => <ShowUser key = {follower._id} user = {follower}/>)}
            <NoMore input = {"Followers"} />
        </div>
    )
}

export default ProfileFollowers
