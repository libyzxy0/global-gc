import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import 'dotenv/config';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);

(async function() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();

async function writeData(collection, data) {
  try {
    const database = client.db(process.env.DB_NAME);
    const col = database.collection(collection);
    const result = await col.insertOne(data);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function readData(collection) {
  try {
    const database = client.db(process.env.DB_NAME);
    const col = database.collection(collection);
    const result = await col.find({}).toArray();
    return result;
  } catch (error) {
    console.log(error);
  }
}

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
  socket.on("make event", async (event) => {
    console.log(event)
    await writeData('messages', event)
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

app.post('/retrieve-messages', async (req, res) => {
  try {
    let messages = await readData('messages');
    messages = messages || [];
    res.send(messages);
  } catch (err) {
    res.send([])
    console.log(err)
  }
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
