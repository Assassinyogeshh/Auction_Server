import express from "express"
import connectMongo from './DB/ConnectDB.js';
import userAuthRoute from './Routes/userAuthRoute.js';
import auctionItemRoute from './Routes/auctionItemRoutes.js';
import bidRoute from './Routes/bidItemsRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import {Server} from "socket.io";
import {createServer} from "http";
dotenv.config({ path: './.env' });

const uri = process.env.DATABASE_URL

connectMongo(uri);

const app = express();

const server = createServer(app);

export const io = new Server(server, {
    cors:{
        origin:"*",
        credentials:true,
    }
})

app.use(cors());

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));


app.use('/auth',userAuthRoute);

app.use('/auctionItem', auctionItemRoute);

app.use('/bid', bidRoute);

app.use('/', (req, res) => {
    res.status(200).send('I Am Live')
});

io.on('connection', (socket)=>{
    console.log('new Client Connected with Id Of', socket.id);

    

    socket.on('disconnect', ()=>{
        console.log("Client Disconnected");
    });
});

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    try {
        console.log("Successfully Connected To The Server");
    } catch (error) {
        console.log(error);
    }
})