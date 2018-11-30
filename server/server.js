require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const socket = require('socket.io');
const alert = require('alert-node');


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

 
// app.get('/auth/callback', async (req, res) =>{
//     console.log('is this hitting')
//     try{
    
//         const payload = {
//             client_id: REACT_APP_CLIENT_ID,
//             client_secret: REACT_APP_CLIENT_SECRET,
//             code: req.query.code,
//             grant_type: 'authorization_code',
//             redirect_uri: `http://${req.headers.host}/auth/callback`
//         }
        
//         let rewWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)
        
//         let resWithUserData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${rewWithToken.data.access_token}`)
        
    
//         let auth0_id = resWithUserData.data.sub
//         let user_image = 'https://robohash.org/me'
//         console.log(req)
//         let username = 'cool guy'
//         // console.log(resWithUserData.sub)
        
//         let db = req.app.get('db');
//         // console.log('before find user')
//         let foundUser = await db.find_user([auth0_id])
//                                                                                         // console.log(resWithUserData.data.sub)
//                                                                                         // console.log(foundUser)
//                                                                                         // console.log('after find user')
//         if(foundUser[0]){
//             console.log('founduser')
//             req.session.user = foundUser[0]
//             res.redirect('/#/dashboard');
//         } else {
//             console.log('before create user')
//             let user = await db.create_user([auth0_id, username])
//             console.log('after create user')
//             req.session.userId = user[0].id;
//             res.redirect('/#/dashboard');
//         }
//     } catch(error){
//         console.log(error)
//     }
// })

app.post('/api/auth/register', (req, res) => {
    // console.log(req)
    const {username, password} = req.body
        // console.log(req.body)
        req.app.get('db').check_user([username])
        .then((user) => {
            // console.log(user)
            if (user.length !== 0 ){
                alert("Username unavalible")
                // console.log(`Username unavalible`)
            } else if (username === ""){
                alert("Must have username")
                console.log('must have usernaem')
            } else {
                req.app.get('db').create_user([username, password])
                .then((user) => {
                    // console.log( "test", user, user[0].id)
                    req.session.userId = user[0].id
                    res.sendStatus(200)
                })
                .catch((err) => {
                    console.log(err, 'its here')
                    res.status(500).send(err)
                })
            }
        })

})

app.post('/api/auth/login', (req, res) => {
    const {username, password} = req.body
    console.log(req.body)

    req.app.get('db').login([username, password])
    .then((user) => {
        console.log(user)
        // req.session.userId = user[0].id
        // console.log(req.session);
        res.sendStatus(200);
    })
})


app.post('/auth/logout', (req, res) =>{
    req.session.destroy();
    res.redirect('http://localhost:3000/#/')
})

app.post('/api/createMessage', (req,res) =>{
    let { inputBar, room, username } = req.body
    console.log(req.body)
    const db = req.app.get('db')
    db.create_message([inputBar, room, username])
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

app.get('/api/getMessages/:room', (req, res)=>{
    const db = req.app.get('db')

    // console.log('does this work')
    // console.log(req.params)

    db.recive_all_messages([req.params.room])
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
    });

    socket.on("send-room-message", data => {
        // console.log('data start')
        // console.log(data)
        // console.log("data end")
        io.in(data.room).emit("send-room-message-received", {
            message: `${data.message}`,
            user: `${data.name}`,
            live: null
        });
    });

    io.on("disconnect", () => {
        console.log("he out");
    })
})  