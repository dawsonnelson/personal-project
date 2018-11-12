require('dotenv').config();
const express = require('express')
const massive = require('massive')


const {
    SERVER_PORT,
    MASSIVE,
} = process.env;



const app = express();

massive(MASSIVE).then(db => {
    app.set('db', db);
    console.log('db is connected');
})

 
app.use(express.json());
 

app.listen(SERVER_PORT, () => console.log(`Listing on port ${SERVER_PORT}`))