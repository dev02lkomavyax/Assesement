const express = require('express')
const cookieParser= require('cookie-parser')
const cors = require('cors')
const Connection= require('./server')
const bodyParser= require('body-parser')
const router = require('./Routes/routes.js')

const app = express();
const Port= 8000;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express());
app.use(cookieParser());
app.use(
    cors({
      origin:"*" , 
      credentials: true,
    })
  );
app.use('/', router);
router.get('/admin', (req, res) => {
    res.send('Admin route accessed successfully');
});
app.use('/admin', router);
Connection();
app.listen(Port,()=>{
    console.log(`Server is running at ${Port}`)
})