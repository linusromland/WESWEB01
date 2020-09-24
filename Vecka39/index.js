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
    res.sendFile(filesDir + 'index.html')
})
app.listen(port, () => console.log(`Server running okay!`))

app.post('/', function (req, res) {
    console.log("\nNew POST request! \n\nName: " + req.body.name + "\nEmail: " + req.body.email + "\nAge: " + req.body.age + "\n\n")
    dbfile.data(req.body.name, req.body.email, req.body.age)
    res.send("Created person " + req.body.name)
    res.end()
})