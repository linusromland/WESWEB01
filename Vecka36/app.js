const express = require('express')
const http = require('http')
const app = express()
const port = 3000
const filesDir = __dirname + "/files/"

app.get('/', (req, res) => res.sendFile(filesDir + 'index.html'))
<<<<<<< HEAD
app.get('/why', (req, res) => {
    var options = {
        host: 'www.google.com',
        port: 80,
        path: '/index.html'
      };
      
      http.get(options, function(res) {
        console.log("Got response: " + res.read());
      }).on('error', function(e) {
        console.log("Got error: " + e.message);
      });
})
=======
app.get('/style', (req, res) => res.sendFile(filesDir + 'style.css'))
app.get('/img', (req, res) => res.sendFile(filesDir + 'pic.jpg'))

>>>>>>> 191f5558f4418a4149551fc3386dd32c59af5425
app.listen(port, () => console.log(`Server running on port ${port}!`))