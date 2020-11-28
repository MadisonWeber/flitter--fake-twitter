const express = require('express')
const router = express.Router()
const tweetModel = require('../models/tweet.model')

// Get All Tweets in Descending Order
router.get('/', async (req, res) =>{
    try{
        const allTweets = await tweetModel.find().sort({"createdAt": 'desc'})
        res.status(200).json(allTweets)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})


// Add a New Tweet 
router.post('/', async (req, res) => {
      
    const tweet = new tweetModel({
        user : req.body.user,
        userID: req.body.userID,
        content : req.body.content, 
        likedBy : [],
        retweetedBy: [],
        comments : [],
        tweetPicture: req.body.profilePic,
    })

    try{
        let savedTweet = await tweet.save()
        res.status(200).json(savedTweet)

    }catch(err){
        res.status(400).json({message : err.message})
    }
})


//  Allow User to Like a Tweet 
router.post("/like/:id", async(req, res)=> {
    if(req.body.add){
        try{
            await tweetModel.findByIdAndUpdate( req.params.id, 
                {$push : {likedBy : req.body.likeID} } )
                res.status(200)
            }catch(err){
                    err.status(400).json({message: 'was not able to update like'})
             }
    }else{
        try{
             await tweetModel.findByIdAndUpdate( req.params.id, 
                { $pull : {likedBy : req.body.likeID}})
        }catch(err){
            err.status(500).json({message : 'was not able to update like'})
        }
    }
    
})


// All User To Retweet -- not done yet 
router.post("/retweet/:id", async(req, res)=> {
    try{
        const newTweet = await tweetModel.findByIdAndUpdate( req.params.id, 
            {$push : {retweetedBy : req.body.retweetID} } )
        res.status(200).json(newTweet)
    }catch(err){
        err.status(400).json({message: 'was not able to update sorry'})
    }

})

// Add A comment to a tweet 

router.post('/comment/:id', async(req, res) => {
    try{
        const updatedTweet = await tweetModel.findByIdAndUpdate( req.params.id, 
            {$push : {comments : req.body.comment}})
        res.status(200).json(updatedTweet)
    }catch(err){
        err.status(400).json({message : 'was not able to add comment'})
    }
})



// Delete a tweet --- not used yet 
router.delete('/:id', async (req, res)=>{
    try{
        await tweetModel.findOneAndDelete(req.params.id)
        res.status(200).send('tweet deleted')
    }catch(err){
        err.status(400).send('was not able to delete')
    }
})


// Get Your Individual Tweets 
router.get('/:id', async (req, res)=> {
    try{
        const selectedTweets = await tweetModel.find({ userID : req.params.id }).sort({"createdAt": 'desc'})
        res.status(200).json(selectedTweets)
    }catch(err){
        err.status(400).send('was not able to get your tweets')
    }
})

module.exports = router