import React, { useContext } from 'react';
import  { GlobalContext } from '../context/globalContext';
import Tweet from './Tweet';
import Loader from './Loader';
import NoMore from "./NoMore";


const Feed = () => {

    const { feedTweets, feedLoading } = useContext(GlobalContext)
    


    return (
        <>
            {feedLoading ? <div className = 'loaderholder'> <Loader /> </div> :
            (
            
            <div className = 'generic__tweets__container'>
                {feedTweets.map( tweet => (<Tweet tweet = {tweet} key = {tweet._id} features = {false}  nestedComment = {false}/>))}
                <NoMore input = {'Tweets'}/>
            </div>
            )
            }
        </>
         )
}

export default Feed
