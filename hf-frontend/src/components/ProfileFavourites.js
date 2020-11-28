import React, { useContext } from 'react';
import NoMore from './NoMore';
import { GlobalContext } from "../context/globalContext";
import Tweet from './Tweet';

const ProfileFavourites = () => {

    const { feedTweets, featureProfile } = useContext(GlobalContext)

    return (
        <div className = 'generic__tweets__container-80'>
            {feedTweets.filter( (tweet) => {
                return tweet.likedBy.includes(featureProfile._id)
            }).map(tweet => <Tweet key = {tweet._id} tweet = {tweet} featured = {false} nestedComment = {false}/>) }
            <NoMore input = {'Tweets'}/>
        </div>
    )
}

export default ProfileFavourites
