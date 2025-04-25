const express=require('express');
const app=express()
const port=8000
app.use(express.json())



app.listen(port,()=>{
    console.log(`server is  runing at port :${port}`); 
})

app.use((err, req, res, next) => {
    console.error(err.stack);;;
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });;;;;;;