const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require("socket.io")
const http = require('http')
const app = express();
const notifier = require('node-notifier');
const userService = require("./modules/users/users")
const server = http.createServer(app)
const io = socketIO(server
    ,{
    cors: {
      origin: 'https://ichatapp-d54s.onrender.com', // Replace with the actual origin of your React app
    //   origin: 'http://localhost:8000', // Replace with the actual origin of your React app
      methods: ['GET', 'POST'],
    },
  }
  )
const db = require('./mongodb/MDBConnection')

const cors = require("cors")
app.use(cors())

db.get()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/build/")); 

const usersRoutes = require('./routes/usersRoute')
const groupsRoutes = require('./routes/groupsRoute')
const messagesRoutes = require("./routes/messageRoute")

app.use("/users",usersRoutes)
app.use("/groups",groupsRoutes)
app.use("/messages",messagesRoutes)

let userNames = {}

app.get('/activeUsers', (req, res) => {
    res.status(200).send({
        status      :   "success",
        statusCode  :   200,
        result      :  userNames,
        error       :   ""
    })
});


io.on('connection',(socket)=>{
    console.log("A User is connected")

    socket.on("userJoined",(data)=>{
     
        userNames[data.sender] = socket.id
        console.log("userJoined",userNames)
        // socket.join(unique_id) 
        // socket.broadcast.to(unique_id).emit("userJoined",{from:"system",message:`${data.sender} joined`}) 

    })   
    
    socket.on('joinGroup', (groupNames) => {
        console.log("joinGroup",groupNames)
            socket.join(groupNames);

    });

    // Handle group messages
    socket.on('groupMessage', (data) => {
        console.log("groupMessage data",data)
        const {sender ,receiver, message } = data;
        io.to(receiver).emit('groupMessage',{sender,receiver, message} ); // Broadcast to members of the specified group
    });

    socket.on('disconnect',async()=>{
      
        let uId = Object.entries(userNames).find((curr)=>{
            if(curr[1] === socket.id){
                return true
            }
            return false 
        })
        console.log("A User is Disconnected , socketid , uid",socket.id,uId)
        uId && uId.length && delete userNames[uId[0]] && await userService.logoutUser({"user_id" : uId[0]})
    })

    socket.on("privateMessage",(data)=>{
        console.log("privateMessage",data)
        let {sender ,receiver} = data
        let receiverSocketId = userNames[receiver]
        console.log("receiverSocketId",receiverSocketId)
        socket.broadcast.to(receiverSocketId).emit("privateMessage",{sender:sender,receiver, message:data.message})
    })

})

app.get("*", (req, res) => {
    // logger.info(url - ${req.originalUrl});
    res.sendFile(path.resolve(__dirname, "public/build/index.html"));
    });

const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
