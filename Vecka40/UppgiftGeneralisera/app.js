const express = require('express')
const mongoose = require('mongoose');
const dBModule = require('./dBModule')
const app = express()
const port = 3000

const clientDir = __dirname + "/client/"

app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
  res.sendFile(clientDir + "index.html")
})
app.get('/stilen', (req, res) => {
  res.sendFile(clientDir + "stule.css")
})
app.get('/jesus', (req, res) => {
  res.sendFile(clientDir + "download.jpg")
})

const personSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const Person = mongoose.model('Person', personSchema);
dBModule.cnctDB("SomethingCoolTestingHahaYe");
    
function createPerson(nameIN, emailIN, ageIN){
  let tmp = new Person({
    name: nameIN, 
    email: emailIN, 
    age: ageIN 
   })
   return tmp
  }

app.post('/', (req, res) => {
   dBModule.saveToDB(createPerson(req.body.name, req.body.email, req.body.age))
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`)
}) 
