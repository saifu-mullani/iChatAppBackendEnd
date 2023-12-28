const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require("socket.io")
const http = require('http')
const app = express();
const notifier = require('node-notifier');
const userService = require("./modules/users/users")
const server = http.createServer(app)
const io = socketIO(server
//     ,{
//     // cors: {
//     //   origin: 'http://localhost:8000', // Replace with the actual origin of your React app
//     //   methods: ['GET', 'POST'],
//     // },
//   }
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


app.get('/chatApp', (req, res) => {
    res.sendFile(__dirname+"/index.html")
});




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

    // socket.on("userJoined",(data)=>{
    //     console.log("userJoined Server",JSON.stringify(data))

    //     let unique_id = data.type === "Private" ?  [data.sender , data.receiver].sort().join("_") : data.receiver
    //     userNames[socket.id] = {sender :data.sender, receiver:data.receiver , unique_id }
    //     socket.join(unique_id) 
    //     socket.broadcast.to(unique_id).emit("userJoined",{from:"system",message:`${data.sender} joined`}) 

    // })    

    // socket.on("privateMessage",(data)=>{
    //     let {sender = "" , receiver = "" ,unique_id = ""} = userNames[socket.id] || {}
    //     socket.broadcast.to(unique_id).emit("privateMessage",{from:sender, message:data.message})
    //     notifier.notify({
    //         title: 'New Message',
    //         message: `${sender} : ${data.message} `,
    //         icon: 'path/to/your/icon.png', // Replace with the path to your notification icon
    //     });
    // })

    // socket.on('disconnect',()=>{
    //     console.log("A User is Disconnected",socket.id)
    //     let {sender = "" , receiver = "" ,unique_id = ""} = userNames[socket.id] || {}
    //     console.log("disconnect",sender, receiver ,unique_id )
    //     socket.broadcast.to(unique_id).emit("userLeft",{from:"system",message:`${sender} Left`}) 
    // })

    socket.on("userJoined",(data)=>{
     
        userNames[data.sender] = socket.id
        console.log("userJoined",userNames)
        // socket.join(unique_id) 
        // socket.broadcast.to(unique_id).emit("userJoined",{from:"system",message:`${data.sender} joined`}) 

    })    

    socket.on('disconnect',async()=>{
        console.log("A User is Disconnected",socket.id)
        let uId = Object.entries(userNames).find((curr)=>{
            if(curr[1] === socket.id){
                return true
            }
            return false 
        })
        uId && uId.length && delete userNames[uId[0]] && await userService.logoutUser({"user_id" : uId[0]})
    })

    socket.on("privateMessage",(data)=>{
        let {sender ,receiver} = data
        let receiverSocketId = userNames[receiver]
        socket.broadcast.to(receiverSocketId).emit("privateMessage",{sender:sender, message:data.message})
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
