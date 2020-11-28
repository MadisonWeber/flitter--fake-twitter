import React, { useEffect , useState, useContext } from 'react';
import "../css/users.css";
import Avatar from './Avatar';
import axios from 'axios';
import Loader from './Loader';
import { GlobalContext } from "../context/globalContext"



const Users = () => {

    const { currentUser, allUsers, setAllUsers, followUser, unfollowUser, showUsers, setShowUsers } = useContext(GlobalContext)
    
    const [ usersLoading, setUsersLoading] = useState(false)

    useEffect(()=> {
        const getAllUsers = async ()=> {
            setUsersLoading(true)
            const theUsers = await axios.get('http://localhost:4500/users');
            setAllUsers(theUsers.data)
            setShowUsers(theUsers.data.slice(0, 3))
            setUsersLoading(false)
        }
        getAllUsers()
    }, [])


    const shuffleUsers = () => {
        const nums = new Set();
        const filteredUsers = allUsers.filter(user => user._id !== currentUser._id)
        while(nums.size !== 3) {
            nums.add(Math.floor(Math.random() * filteredUsers.length));
        }

        const newShowArr = []


        for(let num of nums){
            newShowArr.push(filteredUsers[num])
        }
        setShowUsers(newShowArr)
    }

  

    return (
        <div className = 'users__section'>
            <div className="users__container">
                <h2 className = "users__container__title" >Who to Follow</h2>
                <div className="users__follow_suggestion">
                    {usersLoading ? ( <Loader /> ) :  
                    (
                    showUsers.map( (user) => {
                        return(
                            <div className="suggested__user" key = {user._id}>
                                <Avatar profilePic = {user.profilePic} id = {user._id}/>
                                <div className="suggested__user__info">
                                    <p className = 'suggested__user__user'>@{user.user}</p>
                                    <p className = 'suggested__user__followerCount'><span>Followers: </span> {user.followers.length}</p>
                                    <p className = 'suggested__user__followingCount'><span>Following: </span> {user.following.length}</p>
                                </div>
                                {currentUser.following.includes(user._id) ?
                                    (<button className="unfollow__user" onClick = {()=> unfollowUser(user)}> UnFollow</button> ):
                                    (<button className="follow__user" onClick = {()=> followUser(user)}> Follow</button>)
                                }
                            </div>
                        )
                        })
                    )}
                    <p className = 'show__more__users' onClick = {shuffleUsers}>Show More</p>

                </div>
            </div> 
        </div>
    )
}

export default Users
