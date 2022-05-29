const express = require('express');
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const http = require('http');
const { Server, Socket } = require("socket.io");
const mongodb = require('mongodb');
const mongoose = require("mongoose");
const router = express.Router();
const res = require("express/lib/response");
const user = require('./Model/user');
mongoose.connect("mongodb://localhost/chattingapp")
  .then(() => console.log("Now connected to MongoDB!"))
  .catch(err => console.error("Something went wrong", err));


app.use(cors());
const server = http.createServer(app);

app.get('/user', async (req, res) => {

  const response = await user.find();
  res.json(response)
});

app.post('/signup',async (req, res) => {

  const { name, username, email, password, confrimpassword } = req.body;
  const usr = await user.find({ email: email });

  if (usr) {
    res.send("This email already exists").status(500);
  }
  else {
    try {
      const newUser = new user({ name, username, email, password, confrimpassword });
      await newUser.save();
      res.send("Inserted Successfully");
    }
    catch {
      res.send("Error");
    }
  }
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['post', 'get']
  }
})

io.on("connection", (socket) => {
  console.log("socket is on from server")

  socket.on('msg',(data)=>{
    console.log({data});
    const {message,userlist}=data;
    console.log({message})

    socket.emit('reply',data);
  
  })


});
server.listen(3002, () => {
  console.log('listening on *:3002');
});
