const mongoose = require('mongoose');
const express= require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
const Port = 8000;
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
    cors({
        origin: "*", 
        credentials: true,
    })
);


// For Db Connection
const Connection = async () => {
    try {
        await mongoose.connect(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('An error while connecting to the DB');
    }
};
Connection();

app.listen(Port, () => {
    console.log(`Server is running at ${Port}`);
});
module.exports= app