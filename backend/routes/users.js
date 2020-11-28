const router = require('express').Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt');



router.get('/', async(req, res) => {
    try{
        const allUsers = await User.find()
        res.json(allUsers)

    }catch(err){
        res.json({message: err.message})
    }
})

//Create User
router.post('/signup', async (req, res) => {
   try{
    const allUsers = await User.find().select('user')
    const allUserNames = allUsers.map(user => user.user)

    if(allUserNames.includes(req.body.user)){
        res.status(400).json({message: "Already a User with This Username"})
    }else{
        const hashedPassword = await bcrypt.hash(req.body.password, 8)
        const user = new User({
            user : req.body.user,
            email : req.body.email, 
            password : hashedPassword,
            followers : [],
            following: [],
        })
        const savedUser = await user.save()
        res.json(savedUser)
        }
   }catch(err){
       res.status(400).json({message : "Something went wrong..make sure everything is filled out correctly"})
   }
})

//Log In User

router.post('/login', async(req, res) => {
    try{
        const user = await User.findOne({user : req.body.user})
        if(await bcrypt.compare(req.body.password, user.password)){
            res.json(user)
        }else{
            res.status(400).json({message: 'password did not match'})
        }
    }catch(err){
        res.status(400).json({message: 'hmm something went wrong..try again'}) 
    }
})

// Add User Pic 

router.patch('/profilePic', async(req, res)=>{
    try{
        const update = await User.findByIdAndUpdate({_id : req.body.id }, {profilePic : req.body.profilePic}, {new : true})
        res.status(200).json(update)
    }catch (err){
        res.status(400).send('failed to update')
    }
})

// Follow User 

router.post('/follow/:id', async(req, res)=>{
    try{
        const updateFollowers = await User.findByIdAndUpdate({_id : req.params.id}, 
            {$push : {followers : req.body.currentUserID} }, {new : true} )
        const updateFollowing = await User.findByIdAndUpdate({_id: req.body.currentUserID},
            {$push : { following : req.params.id}}, {new : true})
        res.status(200).json({updateUserFollowed : updateFollowers, updateCurrentUser : updateFollowing})
    }catch(err){
        res.status(400).json({message : "could not follow"})
    }
})


router.post('/unfollow/:id', async(req, res)=>{
    try{
        const updateFollowers = await User.findByIdAndUpdate({_id : req.params.id}, 
            {$pull : {followers : req.body.currentUserID} }, {new : true} )
        const updateFollowing = await User.findByIdAndUpdate({_id: req.body.currentUserID},
            {$pull : { following : req.params.id}}, {new : true})
        res.status(200).json({updateUserFollowed : updateFollowers, updateCurrentUser : updateFollowing})
    }catch(err){
        res.status(400).json({message : "could not follow"})
    }
})


module.exports = router;