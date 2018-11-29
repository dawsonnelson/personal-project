require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const socket = require('socket.io')


const {
    SERVER_PORT,
    CONNECTION_STRING,
    SECRET,
    REACT_APP_CLIENT_ID,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_SECRET,
} = process.env;



const app = express();

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db is connected');
})

app.use( express.static( `${__dirname}/../build`) );
app.use(bodyParser.json())
app.use(express.json());

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))
 
app.get('/auth/callback', async (req, res) =>{

    try{
    
        const payload = {
            client_id: REACT_APP_CLIENT_ID,
            client_secret: REACT_APP_CLIENT_SECRET,
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri: `http://${req.headers.host}/auth/callback`
        }
        
        let rewWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)
        
        let resWithUserData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${rewWithToken.data.access_token}`)
        
    
        let auth0_id = resWithUserData.data.sub
        let user_image = 'https://robohash.org/me'
        // console.log(resWithUserData.sub)
        
        let db = req.app.get('db');
        // console.log('before find user')
        let foundUser = await db.find_user([auth0_id])
                                                                                        // console.log(resWithUserData.data.sub)
                                                                                        // console.log(foundUser)
                                                                                        // console.log('after find user')
        if(foundUser[0]){
            req.session.user = foundUser[0]
            res.redirect('/#/dashboard');
        } else {
            // console.log('before create user')
            let user = await db.create_user([auth0_id, user_image])
            // console.log('after create user')
            req.session.userId = user[0].id;
            res.redirect('/#/dashboard');
        }
    } catch(error){
        console.log(error)
    }
})

app.post('/auth/logout', (req, res) =>{
    req.session.destroy();
    res.redirect('http://localhost:3000/#/')
})

app.post('/api/createMessage', (req,res) =>{
    let { inputBar } = req.body
    console.log(req)
    const db = req.app.get('db')
    db.create_message([inputBar])
    .then(resp=>{

        res.status(200).send(resp)
    })
    .catch(console.log)
})

app.post('/api/createChannel', (req, res) =>{
    const db = req.app.get('db');

    db.create_channel([req.body.channel])
    .then(message => {
        res.status(200).send(message)
    })
    .catch(err => console.log(err))
})

app.get('/api/getMessages', (req, res)=>{
    const db = req.app.get('db')
    console.log('listen')
    db.recive_all_messages([])
    .then(resp=>{
        res.status(200).send(resp)
    })
    .catch(console.log)
})

app.get('/api/getChannels', (req, res) =>{
    const db = req.app.get('db')

    db.get_channels([])
    .then(resp=>{
        res.status(200).send(resp)
    })
    .catch(console.log)
})





const io = socket(app.listen(SERVER_PORT, () => console.log(`Listing on port ${SERVER_PORT}`)));

io.on("connection", socket => {
    console.log("A user has conncted with my Socket");

    // socket.on("join-chat", data =>{
    //     socket.broadcast.emit("all-users", data.name);
    // });

    socket.on("send-message", data => {
        io.emit("message-recived", data);
    });

    socket.on("join-room", data => {

        socket.join(data.room);

        io.to(data.room).emit("room-message-recived", {
            message: `new user to room ${data.room}`
            
        });
        console.log('testing 1')
    });

    socket.on("send-room-message", data => {

        io.in(data.room).emit("send-room-message-received", {
            message: `${data.name} says: ${data.message}`
        });
    });

    io.on("disconnect", () => {
        console.log("he out");
    })
})  