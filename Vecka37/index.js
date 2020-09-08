const express = require('express')
const app = express()
const port = 3000
const filesDir = __dirname + "/client/"

app.use(express.urlencoded({
    extended: true
  }))

app.get('/', (req, res) => res.sendFile(filesDir + 'index.html'))
app.listen(port, () => console.log(`Server running okay!`))

app.post('/', function (req, res) {
    console.log("\nNew POST request! \n\nName: " + req.body.name + "\nEmail: " + req.body.email + "\n\n")
    res.sendFile(filesDir + 'index.html')
    res.end()
})