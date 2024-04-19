const app = require('./server'); 
const mongoose = require('mongoose');
const dotenv= require('dotenv')
dotenv.config();
const MONGO_URL=process.env.MONGO_URL
const Port = 8000;


// For Db Connection
const Connection = async()=>{
    try {
        await mongoose.connect(MONGO_URL,{useUnifiedTopoLogy:true,
            useNewUrlParser:true})
            console.log('Database connected successfully')
    } catch (error) {
        console.log('An error while connecting to the DB')
    }
}
Connection();

app.listen(Port, () => {
    console.log(`Server is running at ${Port}`);
});
