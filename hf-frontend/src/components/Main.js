import React, { useContext } from 'react';
import Feed from './Feed';
import { GlobalContext } from "../context/globalContext";
import TweetComments  from '../components/TweetComments';
import { VIEW } from "../utilities/currentView";
import ProfileTweets from './ProfileTweets';
import ProfileFollowers from "./ProfileFollowers";
import ProfileFollowing from './ProfileFollowing';
import ProfileFavourites from './ProfileFavourites';

const Main = () => {

    const {featureTweet, currentMain, featureProfile} = useContext(GlobalContext)
   
    return (
        <div className = 'main__section'>
            {currentMain === VIEW.FEED && <Feed /> }
            {currentMain === VIEW.FEATUREDTWEET && <TweetComments featureTweet = {featureTweet}/>} 
            {currentMain === VIEW.FEATUREDPROFILE  && <ProfileTweets featureProfile = {featureProfile}/>}
            {currentMain === VIEW.FEATUREDPROFILEFOLLOWERS && <ProfileFollowers />}
            {currentMain === VIEW.FEATUREDPROFILEFOLLOWING && <ProfileFollowing />}
            {currentMain === VIEW.FEATUREDPROFILEFAVOURITES && <ProfileFavourites />}
        </div>
    )
}

export default Main
