const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const dBModule = require('./dBModule')

app.use(express.json())

const userSchema = new mongoose.Schema({
  name: String,
  password: String
});

const User = mongoose.model('User', userSchema);
dBModule.cnctDB("loginTest");
  
function createUser(nameIN, passIN){
let tmp = new User({
  name: nameIN, 
  password: passIN, 
 })
 return tmp
}

app.get('/'), (req, res) => {
  res.send()
}

app.post('/users', async (req, res) => {
  try {
    const userExist = await dBModule.findInDBOne(User, req.body.name)
    if (userExist == null) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      dBModule.saveToDB(createUser(req.body.name, hashedPassword))
      res.status(201).send()
    }else{
      return res.status(400).send('sry usrname taken')
    }

    
  } catch {
    res.status(500).send()
  }
})

app.post('/users/login', async (req, res) => {
  const user = await dBModule.findInDBOne(User, req.body.name)
  if (user == null) {
    return res.status(400).send('sry no usr')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('wow you logged in')
    } else {
      res.send('you can nicht join')
    }
  } catch {
    res.status(500).send()
  }
})

app.listen(3000)
console.log("Server Running!")