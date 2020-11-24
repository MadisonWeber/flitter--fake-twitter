const express = require("express");
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();


dotenv.config()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify : false },()=> console.log('connected to database'))

//Tweets
const tweetRouter = require('./routes/tweets')
app.use('/tweets', tweetRouter)
    
//Users
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))

