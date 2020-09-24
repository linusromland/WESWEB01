const express = require('express')
const app = express()
const port = 3000
const filesDir = __dirname + "/client/"
const cors = require('cors');
const bodyParser = require('body-parser');
const dbfile = require('./mongo.js');


//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.sendFile(filesDir + 'login.html')
})
app.get('/register', (req, res) => {
    res.sendFile(filesDir + 'register.html')
})
app.listen(port, () => console.log(`Server running okay!`))

app.post('/register', function (req, res) {
    console.log("NEW POST!!\n" + req.body.name, req.body.mail, req.body.pass)
    dbfile.data(req.body.name, req.body.mail, req.body.pass)
    res.send("Created person " + req.body.name)
    res.end()
})