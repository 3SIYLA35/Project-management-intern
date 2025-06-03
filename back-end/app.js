const express=require('express');
const app=express()
const port=8000
const bodyParser=require('body-parser');
const database=require('./config/bd');
const cors=require('cors');
const http=require('http');
const socketIo=require('socket.io');
const conversationService=require('./Services/conversationService');
const messageService=require('./Services/messageService');
app.use(express.json());
require('dotenv').config();

database.Connect();;

const corsOptions={
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
app.use('/conversations', require('./Routes/conversation'));
app.use('/messages', require('./Routes/message'));

const server=http.createServer(app);
const io=socketIo(server,{
  cors:{
    origin:'http://localhost:3000',
    methods:['GET','POST'],
    credentials: true
  }
});;

io.on('connection',(socket)=>{
  console.log('New client connected',socket.id);
  socket.on('join_conversation',(conversationId)=>{
    socket.join(conversationId);
    console.log(`User ${socket.userId} joined conversation: ${conversationId}`);
  });
  socket.on('leave_conversation',(conversationId)=>{
    socket.leave(conversationId);
    console.log(`User left conversation: ${conversationId}`);
  });
  socket.on('user_online',async(userId)=>{
    console.log("user id  from socket ",userId);
    if (userId){
      await conversationService.updateUserOnlineStatus(userId,true);
      socket.userId=userId;
      io.emit('user_status_change',{userId,isOnline: true });
    }
  });;
 
  socket.on('send_message',async(messageData)=>{
    try {
      console.log('send message from back-end',messageData);
      const {conversationId,sender,content}=messageData;
      console.log('messageData from socket',messageData);
      const newMessage=await messageService.createMessage({
        conversationId,
        sender,
        content
      });;;
     
      io.to(conversationId).emit('receive_message', newMessage);
      console.log('message sent to socket',newMessage);
    } catch (error){
      console.error('error sending message:', error);
      socket.emit('message_error', { error: error.message });
    }
  });
  
  socket.on('mark_messages_read',async(data)=>{
    try {
      const {conversationId,userId}=data;
      console.log('mark messagge read for this user',userId);
      await messageService.markMessagesAsRead(conversationId, userId);
      io.to(conversationId).emit('messages_read',{conversationId,userId});
    }catch(error){
      console.error('error marking messages as read:', error);
    }
  });;
  
  socket.on('typing',(data)=>{
    const { conversationId,userId,isTyping }=data;
    socket.to(conversationId).emit('user_typing',{
      conversationId,
      userId,
      isTyping
    });
  });
  
  socket.on('disconnect',async()=>{
    console.log('Client disconnected', socket.id);
    if (socket.userId) {
      await conversationService.updateUserOnlineStatus(socket.userId, false);
      io.emit('user_status_change', { userId: socket.userId, isOnline: false });
    }
  });
});;;;

server.listen(port,()=>{
  console.log(`Server is running at port: ${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);;;
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: err.stack
  });
});;;;;;;