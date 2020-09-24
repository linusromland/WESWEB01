const express = require('express')
const http = require('http')
const app = express()
const port = 3000
const filesDir = __dirname + "/files/"

app.get('/', (req, res) => res.sendFile(filesDir + 'index.html'))
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
app.listen(port, () => console.log(`Server running on port ${port}!`))