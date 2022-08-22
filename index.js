const express = require('express');
const config = require('./config')
const client = require('twilio')(config.accountSID,config.authToken);

const app = express();
const port = 3000;

app.get('/login',(req,res)=>{
    client
    .verify
    .services(config.serverID)
    .verifications
    .create({
        to : `+${req.query.phonenumber}`,
        channel: req.query.channel
    })
    .then((data)=>{
        res.status(200).send(data)
    })
})

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})
