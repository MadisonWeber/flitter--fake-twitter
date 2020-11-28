import React, { useContext } from 'react';
import Compose from "./Compose";
import "../css/maintop.css";
import { VIEW } from "../utilities/currentView";
import { GlobalContext } from "../context/globalContext";
import Tweet from './Tweet';
import FullProfile from './FullProfile';

const MainTop = () => {

    const {featureTweet, currentMain, setCurrentMain, featureProfile } = useContext(GlobalContext);


    return (
        <div className = 'main__top__section'>
            {currentMain === VIEW.FEED && 
            <div className = 'main__top__section'>
                <div className="main__section__header">
                    <h2 className="main__section__title">Home</h2>
                    <i className = 'fab fa-twitter' />
                </div>
                <Compose />
            </div>}
            {currentMain === VIEW.FEATUREDTWEET &&
            <div className = 'main__top__section'>
                <div className="main__section__header featuredTweet">
                    <i className = 'fas fa-arrow-left' onClick = {() => setCurrentMain(VIEW.FEED)}/>
                    <h2 className="main__section__title">Tweet</h2>
                </div>
                <Tweet tweet = {featureTweet} featured = {true} nestedComment = {false}/>
            </div>
            }
            {![VIEW.FEATUREDTWEET, VIEW.FEED].includes(currentMain) &&
            <div className = 'main__top__section'>
                <div className="main__section__header featuredTweet">
                    <i className = 'fas fa-arrow-left' onClick = {() => setCurrentMain(VIEW.FEED)}/>
                <h2 className="main__section__title">{featureProfile.user}</h2>
                </div>
                <FullProfile />
            </div>
            }            
        </div>
        
    
    )
}

export default MainTop
