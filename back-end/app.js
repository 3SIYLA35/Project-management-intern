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
const messagemodel=require('./Models/messages');
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
});;;

io.on('connection',(socket)=>{
  console.log('new client connected', socket.id);
  socket.activeRooms=new Set();
  
  socket.on('join_conversation',(conversationId)=>{
    socket.join(conversationId);
    socket.activeRooms.add(conversationId);
    console.log(`User ${socket.userId} joined conversation: ${conversationId}`);
    console.log(`Socket ${socket.id} rooms: `, Array.from(socket.rooms));
    socket.to(conversationId).emit('user_joined',{userId:socket.userId,conversationId});
  });
  socket.on('leave_conversation',(conversationId)=>{
    socket.leave(conversationId);
    socket.activeRooms.delete(conversationId);
    console.log(`user ${socket.userId} left conversation:${conversationId}`);
  });;
  
  socket.on('user_online',async(userId)=>{
    console.log("User online: ",userId);;
    if(userId){
      await conversationService.updateUserOnlineStatus(userId,true);
      socket.userId=userId;
      io.emit('user_status_change',{userId,isOnline:true});
    }
  });
 
  socket.on('send_message',async(messageData)=>{
    try {
      console.log('send message from socket',messageData);
      const {conversationId,sender,content}=messageData;
      if (!conversationId || !sender || !content){
        console.error('missing required fields in message data');
        socket.emit('message_error',{error:'Missing required fields'});
        return;
      }
      const newMessage=await messageService.createMessage({
        conversationId,
        sender,
        content
      });;
      const populatedmessage=await messageService.getmessagebyID(newMessage._id);
      const countunreadconverstation=await conversationService.getunreadMessageCount(sender,conversationId);
      console.log('countunreadconverstation',countunreadconverstation);
      console.log(' New message created:', newMessage);;
      console.log(`Broadcasting to room ${conversationId}`);;
      // if(socket.activeRooms.has(conversationId)){
        console.log('user in conversation');
        io.to(conversationId).emit('receive_message', populatedmessage);
      // }else{
        console.log('user not in conversation');
        io.emit('recieve_message_outside_conversation',{
          lastmessage:populatedmessage.content,
          conversationId,
          unreadCount:countunreadconverstation
        });;;
      // }
    }catch(error){
      console.error('error sending message:',error);
      socket.emit('message_error',{error:error.message});
    }
  });;
  
  socket.on('mark_messages_read',async(data)=>{
    try{
      const {conversationId,userId}=data;;
      console.log('mark messagge read for this user',userId);
      await messageService.markMessagesAsRead(conversationId, userId);
      io.to(conversationId).emit('messages_read',{conversationId,userId});
    }catch(error){
      console.error('error marking messages as read:', error);
    }
  });;
  
  socket.on('typing',(data)=>{
    const {conversationId,userId,isTyping}=data;
    socket.to(conversationId).emit('user_typing',{
      conversationId,
      userId,
      isTyping
    });;
  });
  
  socket.on('disconnect',async()=>{
    console.log('Client disconnected', socket.id);
    if (socket.userId) {
      await conversationService.updateUserOnlineStatus(socket.userId, false);
      io.emit('user_status_change',{userId: socket.userId, isOnline: false });
      
    }
  });
});;;;;

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