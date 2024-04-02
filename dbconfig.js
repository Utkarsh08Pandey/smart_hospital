const mongoose = require('mongoose')

require('dotenv').config()
const URL = process.env.URL

mongoose.connect(URL)
        .then(console.log(`db connected successfully`))
        .catch((e)=>{console.log('error in connecting db')})