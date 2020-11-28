import React from 'react'
import Tweet from "./Tweet"
import "../css/tweetcomments.css"
import NoMore from './NoMore'

const TweetComments = ({featureTweet}) => {
    return (
        <div className = 'generic__tweets__container'>
            <h2 className = 'tweet__comments__title'>{featureTweet.comments.length > 0? "Replies" : "No Comments On This Tweet"}</h2>
            {
                featureTweet.comments.map( comment => <Tweet key ={comment.createdAt} tweet = {comment} featured = {false} nestedComment = {true}/>)
            }
            <NoMore input = {'Tweets'}/>

        </div >
    )
}

export default TweetComments
