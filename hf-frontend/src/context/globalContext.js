import React, { createContext, useState, useEffect  } from 'react';
import { VIEW } from "../utilities/currentView";
import axios from 'axios'

export const GlobalContext = createContext()

const GlobalContextProvider = ({children}) => {

    const [ feedLoading, setFeedLoading ] = useState(false)
    const [ isAuthorised, setIsAuthorised] = useState(false);
    const [ currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('USER')) || "")
    const [ feedTweets, setFeedTweets] = useState([])
    const [ uploadFileOpen, setUploadFileOpen ] = useState(false);
    const [ addCommentOpen, setAddCommentOpen ] = useState(false);
    const [ currentAddComment, setCurrentAddComment ] = useState(null);
    const [ currentMain, setCurrentMain ] = useState(VIEW.FEED)
    const [ featureTweet, setFeatureTweet ] = useState(null)
    const [ featureProfile, setFeatureProfile ] = useState(null)
    const [ allUsers, setAllUsers ] = useState([])
    const [ showUsers, setShowUsers ] = useState([])
    const [featureProfileTweets, setFeatureProfileTweets] = useState([])
    const [ profileTweetsLoading, setProfileTweetsLoading ] = useState(false)
   
    useEffect(()=> {
        const getAllTweets = async () => {
            setFeedLoading(true)
            try{
                const allTweets = await axios.get('http://localhost:4500/tweets');
                setFeedTweets(allTweets.data)
                setFeedLoading(false)
            }catch(err){
                console.log('error response is ', err.response)
                console.log('error message is ', err.message)
            }
        }
        getAllTweets()

    }, [])

    const toggleUploadModal = ()=>{
        setUploadFileOpen( p => !p)
    }

    const logout = ()=>{
        setCurrentUser('')
        localStorage.removeItem('USER');
    }

    const setLocalStoreageUser = (user) =>{
        localStorage.setItem('USER' , JSON.stringify(user))
    }
    
    const handleFeatureProfile = (e, id) => {
        e.stopPropagation()
        const [newFeatureProfile] = allUsers.filter( user => user._id === id)
        setFeatureProfile(newFeatureProfile)
        setCurrentMain(VIEW.FEATUREDPROFILE)
    }

    const unfollowUser = async (user) => {
        const URL = `http://localhost:4500/users/unfollow/${user._id}`
        if(user._id === currentUser._id ) return 

        try{
            const unfollowJSON = await axios.post( URL, {
            currentUserID : currentUser._id
            })
            setCurrentUser(unfollowJSON.data.updateCurrentUser)
            //Update user stored in local storeage
            setLocalStoreageUser(unfollowJSON.data.updateCurrentUser)

            // If there is currently a feature profile, reset it with the updated followers //
            if(featureProfile._id === unfollowJSON.data.updateCurrentUser._id) {
                setFeatureProfile(unfollowJSON.data.updateCurrentUser)
            }

            // Update UI to include new followers / following
            const newAllUsers = allUsers.map( (user) => {
                if(user._id === unfollowJSON.data.updateUserFollowed._id){
                    return unfollowJSON.data.updateUserFollowed
                }else{
                    return user
                }
            })
            setAllUsers(newAllUsers)

            

            //Update The ShowUsers Array 
            const showUserIds = showUsers.map( user => user._id)
            const replaceUsers = newAllUsers.filter( user => showUserIds.includes(user._id))
            setShowUsers(replaceUsers)
            
        }catch(err){
            console.log(err.response)
        }

    }

    const followUser = async (user) => {
        const URL = `http://localhost:4500/users/follow/${user._id}`
        if(user._id === currentUser._id ) return 

        // Post new followers to following array in Mongo
        try{
            const followJSON = await axios.post( URL, {
            currentUserID : currentUser._id
            })
            setCurrentUser(followJSON.data.updateCurrentUser)
      
            //Update user stored in local storeage
            setLocalStoreageUser(followJSON.data.updateCurrentUser)

            // If there is currently a feature profile, reset it with the updated followers //
            if(featureProfile._id === followJSON.data.updateCurrentUser._id) {
                setFeatureProfile(followJSON.data.updateCurrentUser)
            }

            // Update UI to include new followers / following
            const newAllUsers = allUsers.map( (user) => {
                if(user._id === followJSON.data.updateUserFollowed._id){
                    return followJSON.data.updateUserFollowed
                }else{
                    return user
                }
            })
            setAllUsers(newAllUsers)

            //Update The ShowUsers Array 
            const showUserIds = showUsers.map( user => user._id)
            const replaceUsers = newAllUsers.filter( user => showUserIds.includes(user._id))
            setShowUsers(replaceUsers)
            
        }catch(err){
            console.log(err.response)
        }
    }



    return (
        <GlobalContext.Provider value = {{isAuthorised, setIsAuthorised, currentUser, setCurrentUser, logout, setLocalStoreageUser, feedTweets, setFeedTweets, uploadFileOpen, setUploadFileOpen, toggleUploadModal,
        addCommentOpen, setAddCommentOpen, currentAddComment, setCurrentAddComment, currentMain, setCurrentMain, featureTweet, setFeatureTweet, feedLoading, setFeedLoading, featureProfile, setFeatureProfile, handleFeatureProfile, allUsers, setAllUsers,
        unfollowUser, followUser, showUsers, setShowUsers, featureProfileTweets, setFeatureProfileTweets, profileTweetsLoading, setProfileTweetsLoading}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider
