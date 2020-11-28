import React, { useContext } from 'react';
import '../css/tweet.css';
import Avatar from './Avatar';
import axios from 'axios';
import { GlobalContext } from "../context/globalContext";
import { VIEW } from "../utilities/currentView"

const Tweet = ({tweet, featured, nestedComment}) => {

    const { currentUser, feedTweets, setFeedTweets, setAddCommentOpen, setCurrentAddComment, setCurrentMain, setFeatureTweet } = useContext(GlobalContext)

    const getTime = (time)=>{
        const first = new Date(tweet.createdAt).toLocaleTimeString()
        const second = new Date(tweet.createdAt).toDateString()
        return second + ", " + first
    }

    const evaluateLike = async (e, tweet) =>{
        e.stopPropagation()
       if(tweet.likedBy.includes(currentUser._id)){
            const newFeedTweets = feedTweets.map( t => {
                if(t._id === tweet._id){
                    let newLikeBy = t.likedBy.filter( like => like !== currentUser._id)
                    return ({ ...t, likedBy : [...newLikeBy]})
                }else{
                    return t
                }
            })
            setFeedTweets(newFeedTweets)

            try{
                await axios.post( `http://localhost:4500/tweets/like/${tweet._id}`, {
                    likeID : currentUser._id,
                    add : false
                })
            }catch(err){
                console.log(err)
            }
       }else{
            try{
                const newFeedTweets = feedTweets.map( t => {
                    if(t._id === tweet._id){
                        return {...t, likedBy : [...t.likedBy, currentUser._id]}
                    }else{
                    return t
                }})
                setFeedTweets(newFeedTweets)

                await axios.post( `http://localhost:4500/tweets/like/${tweet._id}`, {
                    likeID : currentUser._id,
                    add : true
                })
               
                }catch(err){
                    console.log(err)
                }
       }
    }

    const handleAddComment = (e, tweet) => {
        console.log('handlecomment e' , e)
        console.log('handlecomment tweet' , tweet)
        e.stopPropagation()
        setCurrentAddComment(tweet)
        setAddCommentOpen(p => !p)
    }

    const handleFeatureTweet = () => {
        setCurrentMain(VIEW.FEATUREDTWEET)
        setFeatureTweet(tweet)
    }

    
    return (
        <div className = { featured ? "tweet__container__featured" : "tweet__container" } onClick = {(tweet) => handleFeatureTweet(tweet)}>
            <div className="tweet__photo_container">
                <Avatar profilePic = {tweet.tweetPicture} id = {tweet.userID}/>
            </div>
            <div className="tweet__main__container">
                <div className="tweet__top__container">
                    <p className="tweet__user__name">@{tweet.user}</p>
                    <p className="tweet__time__since">{getTime(tweet.createdAt)}</p>
                </div>
                <div className="tweet__middle__container">
                    <p className="tweet__content">{tweet.content}</p>
                </div>
                {!nestedComment &&<div className="tweet__bottom__container">
                    <div className="tweet__comment__container" onClick = {(e)=>handleAddComment(e, tweet)}>
                        <i className="far fa-comment"></i>
                        <span className = 'number-comments'>{tweet.comments.length}</span>
                    </div>
                    <div className = 'tweet__likes__container'>
                        <i className = {tweet.likedBy.includes(currentUser._id) ? "fas fa-heart active-heart" : "fas fa-heart"} onClick = {(e)=>evaluateLike(e, tweet)}></i>
                        <span className = 'number-likes'>{tweet.likedBy.length}</span>
                    </div>
                    <div className="tweet__retweet__container">
                        <i className = 'fas fa-retweet' ></i>
                        <span className = 'number-retweets'>{tweet.retweetedBy.length}</span>
                    </div>
                    <div className="tweet__upload__container">
                        <i className="fas fa-upload"></i>
                    </div>
                </div>}
            </div>
            
        </div>
    )
}

export default Tweet
