import React, { useState, useContext } from 'react'
import "../css/compose.css"
import Avatar from './Avatar'
import axios from 'axios'
import { GlobalContext } from '../context/globalContext'

const Compose = () => {

    const { currentUser, setFeedTweets } = useContext(GlobalContext)
    const [ tweet, setTweet ] = useState('')

    const sendTweet = async(e) => {
        e.preventDefault()
        try{
            const newTweet = await axios.post("http://localhost:4500/tweets/", {
                user : currentUser.user,
                userID: currentUser._id,
                content : tweet, 
                likedBy : [],
                retweetedBy: [],
                comments : [],
                profilePic : currentUser.profilePic
        })
            
            setFeedTweets( (prev) => {
                setFeedTweets([newTweet.data , ...prev])
            })
            setTweet('')
        }catch(err){
            console.log(err.message)
        }
        
    }

    return (
        <div className = 'compose__section'>
            <form className = "compose__form" onSubmit = {sendTweet}>
                <div className="tweet__compose__container">
                    <Avatar profilePic = {currentUser.profilePic} id = {currentUser._id}/>
                    <textarea type="text" placeholder = "What's Happening?" className = "tweet__textarea" maxLength  = "140" rows = "6" value = {tweet} onChange = {(e)=> setTweet(e.currentTarget.value)}/>
                </div>
                <div className="tweet__compose__button__container">
                    <p className = "tweet__length__counter"><span>{tweet.length}</span>/140</p>
                    <button type = 'submit' className = 'btn send__tweet__btn'>Tweet</button>
                </div>
            </form>
        </div>
    )
}

export default Compose
