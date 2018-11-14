require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');


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




app.listen(SERVER_PORT, () => console.log(`Listing on port ${SERVER_PORT}`))