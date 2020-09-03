const express = require('express')
const http = require('http')
const app = express()
const port = 3000
const filesDir = __dirname + "/files/"

app.get('/', (req, res) => res.sendFile(filesDir + 'index.html'))
app.get('/style', (req, res) => res.sendFile(filesDir + 'style.css'))
app.get('/img', (req, res) => res.sendFile(filesDir + 'pic.jpg'))

app.listen(port, () => console.log(`Server running on port ${port}!`))