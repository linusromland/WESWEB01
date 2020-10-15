const express = require('express')
const mongoose = require('mongoose')
const dBModule = require('./dBModule')
const app = express()
const port = 3000

const clientDir = __dirname + "/client/"

app.use(express.json())
app.use(express.urlencoded())
app.set('view engine', 'ejs');

const messageSchema = new mongoose.Schema({
    name: String,
    msg: String
  });

const message = mongoose.model('Message', messageSchema);
dBModule.cnctDB("msgBoard");
    
function createMessage(nameIN, msgIN){
  let tmp = new message({
    name: nameIN, 
    msg: msgIN, 
   })
   return tmp
}

app.get('/', async (req, res) => {
    res.render('msg', {
        data: await dBModule.findInDB(message)
    });
    console.log(await dBModule.findInDB(message))
})

app.post('/', (req, res) => {
    dBModule.saveToDB(createMessage(req.body.name, req.body.msg))
   res.redirect('/')
 })

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`)
  }) 