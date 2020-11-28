import React, { useState, useContext } from 'react'
import "../css/uploadpic.css"
import { GlobalContext } from "../context/globalContext"
import FileBase from 'react-file-base64';
import axios from 'axios';


const UploadPic = () => {


    const [ profilePic, setProfilePic ] = useState(null)
    const [profilePicMessage, setProfilePicMessage ] = useState('')
    const { uploadFileOpen , setUploadFileOpen, toggleUploadModal, currentUser, setCurrentUser, setLocalStoreageUser } = useContext(GlobalContext)

    const handleUploadPic = async (e) => {
        e.preventDefault()
        try{
            const URL = "http://localhost:4500/users/profilePic"
            const update = await axios.patch(URL, { id : currentUser._id , profilePic : profilePic})
            setCurrentUser( previous => setCurrentUser({...previous, profilePic : update.data.profilePic}))
            setProfilePicMessage('Success !!');
            
            const prevItem = JSON.parse(localStorage.getItem("USER"))
            const updatedItem = {...prevItem, profilePic : update.data.profilePic}
            localStorage.setItem("USER", JSON.stringify(updatedItem))

            setTimeout(()=> {
                setProfilePicMessage('')
                setUploadFileOpen(false)
            },500)

        }catch(err){
            setProfilePicMessage('hmm we got an error..try again')
        }
    }

    const removeMessage = (e)=> {
        e.stopPropagation()
        setProfilePicMessage('')
    }

    return (
        <div className = 'upload__pic__overlay'>
            <form  className="upload__pic__form" onSubmit = {handleUploadPic}>
                <h4 className = "upload__pic__title">Upload New Profile Picture</h4>
                <FileBase id = 'upload-file' type = 'file' multiple = {false} onDone = {({base64})=> setProfilePic(base64) } />
                {profilePicMessage && <p className = "upload__pic__message">{profilePicMessage} <i className = 'fas fa-times' onClick = {removeMessage}/></p>}
                <button className = 'upload__pic__submit'>Submit</button>
                <button className = 'exit__upload__pic' onClick = {toggleUploadModal}><i className = 'fas fa-times' /></button>
            </form>
        </div>
    )
}

export default UploadPic
