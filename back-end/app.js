const express=require('express');
const app=express()
const port=8000
const bodyParser=require('body-parser');
const database=require('./config/bd');
const cors=require('cors');
app.use(express.json());
require('dotenv').config();

database.Connect();;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/auth',require('./Routes/Login'));
app.use('/hr',require('./Routes/hr'));
app.use('/employee',require('./Routes/User'));
app.use('/project',require('./Routes/project'));
app.use('/task',require('./Routes/task'));
app.use('/sprint',require('./Routes/sprint'));
app.use('/comments',require('./Routes/Comment'));
app.listen(port,()=>{
    console.log(`server is  runing at port :${port}`);;;
})

app.use((err, req, res, next) => {
    console.error(err.stack);;;
    res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      error: err.stack
    });
  });;;;;;;