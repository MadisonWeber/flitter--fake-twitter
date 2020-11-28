import React, { useContext, useState } from 'react';
import "../css/comment.css";
import { GlobalContext } from "../context/globalContext";
import Avatar from './Avatar'
import axios from 'axios'


const Comment = () => {

    const { setAddCommentOpen, currentAddComment, setCurrentAddComment, currentUser, setFeedTweets, feedTweets } = useContext(GlobalContext)
    
    const closeAddComment = () => {
        setAddCommentOpen(p => !p)
        setCurrentAddComment(null)
    }

    const [ response, setResponse ] = useState('')

    const submitComment = async (e) => {
        e.preventDefault()
        let URL = `http://localhost:4500/tweets/comment/${currentAddComment._id}`
        const newDate = new Date()
        const newComment = {
            content : response,
            likedBy : [],
            retweetedBy : [],
            tweetPicture : currentUser.profilePic,
            comments : [],
            createdAt: newDate,
            updatedAt : newDate,
            user : currentUser.user,
            userID : currentUser._id }
        try{
            await axios.post(URL, {
                 comment : newComment
            })
            setResponse('Comment Added !')
            const newFeedTweets = feedTweets.map( (tweet) => {
                if(tweet._id === currentAddComment._id){
                    return {...tweet, comments : [...tweet.comments, newComment]}
                }else{
                    return tweet
                }
            })
            setFeedTweets(newFeedTweets)
            setTimeout(()=> {
                setResponse('')
                setAddCommentOpen(false)
            },1000)
        }catch(err){
            console.log(err.response)
        }
    }

    return (
        <div className="add__comment__overlay">
            <div className = 'add__comment__popup'>
                <div className="add__comment__orig__comment">
                    <div className = 'add__comment__avatar__holder original__comment__avatar'>
                        <Avatar profilePic = {currentAddComment.tweetPicture} />
                    </div>
                    <div className="add__comment__text__holder">
                        <p className="add__comment__user">@{currentAddComment.user}</p>
                        <p className="add__comment__comment">{currentAddComment.content}</p>
                    </div>
                </div>
                <span className="add__comment__reply__to"> Replying to <span className = "add__comment__reply__to-blue">@{currentAddComment.user}</span></span>
                <form className = "add__comment__form" onSubmit = {submitComment}>
                    <div className = 'add__comment__avatar__holder'>
                        <Avatar profilePic = {currentUser.profilePic} />
                    </div>
                    <div className = 'add__comment__form__bottom'>
                        <textarea type="text"  maxLength  = "140" rows = "6" wrap="hard" value = {response} autoFocus = {true} className = 'add__comment__textarea' placeholder = 'Tweet Your Reply' onChange = {(e)=> setResponse(e.currentTarget.value)}/>
                        <div className = "add__comment__length__counter" >
                            <span className = {response.length !== 140 ? 'add__comment__length__counter' : "add__comment__length__counter-red" }>
                                {response.length}/140
                            </span>
                            <button className= 'add__comment__reply'>Reply</button>
                        </div>                        
                    </div>
                </form>
                <i className = 'fas fa-times' onClick = {closeAddComment}/>
            </div>
        </div>
        
    )
}

export default Comment
