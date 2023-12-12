import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

const app = express();
const port = 8080;

const server = createServer(app);
import { Server } from 'socket.io';


const io = new Server(server, {
  cors: {
    origin: '*'
  } 
})

io.on('connection', (socket) => {
  console.log('A user connected;');
  socket.on('disconnect', () => {
    console.log('A user disconnected;');
  })
  socket.on("make event", async (event) => {
    console.log(event)
    io.emit("event", {
      type: event.type,
      timestamp: Date.now(), 
      user: {
        short_name: event.user.short_name, 
        profile_pic: event.user.profile_pic,
        id: event.user.id
      }, 
      message: {
        messageID: "$mid." + Array.from({ length: 15 }, () => Math.floor(Math.random() * 100)).join(""), 
        body: event.message.body,
        attachments: []
      }
    })
  })
})

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
