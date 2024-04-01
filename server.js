const mongoose = require('mongoose');
const dotenv= require('dotenv')

dotenv.config();
const MONGO_URL=process.env.MONGO_URL

const Connection = async()=>{
    try {
        await mongoose.connect(MONGO_URL,{useUnifiedTopoLogy:true,
            useNewUrlParser:true})
            console.log('Database connected successfully')
    } catch (error) {
        console.log('An error while connecting to the DB')
    }
}
module.exports = Connection;