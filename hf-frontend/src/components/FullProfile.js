import React, { useContext, useEffect } from 'react';
import "../css/fullprofile.css";
import { GlobalContext } from "../context/globalContext";
import "../css/fullprofile.css";
import defaultImage from '../images/NOUSER.jpg';
import {VIEW} from "../utilities/currentView";
import axios from 'axios';


const FullProfile = () => {

    const { featureProfile, currentUser, followUser, unfollowUser, setCurrentMain,
         currentMain, setFeatureProfileTweets, 
          setProfileTweetsLoading } = useContext(GlobalContext)

    

    useEffect(()=>{

        const getFeatureProfileTweets = async (id) => {
            const URL = `http://localhost:4500/tweets/${id}`
            setProfileTweetsLoading(true)
            const tweets = await axios.get(URL);
            setFeatureProfileTweets(tweets.data)
            setProfileTweetsLoading(false)
        }

        getFeatureProfileTweets(featureProfile._id)

        return ()=> {
            setFeatureProfileTweets([]) 
        }

    },[featureProfile])


  
    return (

        <div className = 'full__profile__container'>
            <div className="full__profile__top">
                <div className="avatar__large"> 
                    {featureProfile.profilePic ? <img className = 'avatar__image__large' src={featureProfile.profilePic} alt={"broke"}/> : <img className = 'avatar__image_no_user__large' src={defaultImage} alt={"broke"}/>}
                </div>
                <div className="full__profile__info">
                    <p className="full__profile__user">@{featureProfile.user}</p>
                    <p className="full__profile__email">{featureProfile.email}</p>
                    <p className="full__profile__followers" onClick = {() => setCurrentMain(VIEW.FEATUREDPROFILEFOLLOWERS)}><span className = 'GREY'>Followers : </span>{featureProfile.followers.length}</p>
                    <p className="full__profile__following" onClick = {() => setCurrentMain(VIEW.FEATUREDPROFILEFOLLOWING)}><span className = 'GREY'>Following : </span>{featureProfile.following.length}</p>
                    {currentUser._id !== featureProfile._id ?(   
                        currentUser.following.includes(featureProfile._id) ?
                            (<button className="unfollow__user" onClick = {()=> unfollowUser(featureProfile)}> UnFollow</button> ):
                            (<button className="follow__user" onClick = {()=> followUser(featureProfile)}> Follow</button>)
                        ) : <></>
                    }
                </div>
            </div>
            <div className="full__profile__bottom">
                <button className = {currentMain === VIEW.FEATUREDPROFILE ? "full__profile__change currently_main" : "full__profile__change"} onClick = {()=> setCurrentMain(VIEW.FEATUREDPROFILE)}>Tweets</button>
                <button className = {currentMain === VIEW.FEATUREDPROFILEFOLLOWERS ? "full__profile__change currently_main" : "full__profile__change"} onClick = {()=> setCurrentMain(VIEW.FEATUREDPROFILEFOLLOWERS)}>Followers</button>
                <button className = {currentMain === VIEW.FEATUREDPROFILEFOLLOWING ? "full__profile__change currently_main" : "full__profile__change"} onClick = {()=> setCurrentMain(VIEW.FEATUREDPROFILEFOLLOWING)}>Following</button>
                <button className = {currentMain === VIEW.FEATUREDPROFILEFAVOURITES? "full__profile__change currently_main" : "full__profile__change"} onClick = {()=> setCurrentMain(VIEW.FEATUREDPROFILEFAVOURITES)}>Favourites</button>
            </div>
        </div>
    )
}

export default FullProfile
