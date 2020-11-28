import React, { useContext } from 'react';
import NoMore from './NoMore'
import Tweet from '../components/Tweet'
import { GlobalContext } from '../context/globalContext';
import Loader from './Loader'

const ProfileTweets = ({featureProfile}) => {

    const { featureProfileTweets, profileTweetsLoading } = useContext(GlobalContext)

    return (
        <div className = 'generic__tweets__container-80'>
            {profileTweetsLoading ? <Loader /> : 
            (
            <>
                {featureProfileTweets.map( profileTweet => <Tweet key = {profileTweet._id} tweet = {profileTweet} featured = {false} nestedComment = {false}/> )}
                <NoMore input = {'Tweets'} />
            </>
            )}
        </div>
       
    )
}

export default ProfileTweets
