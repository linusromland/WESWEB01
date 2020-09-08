const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async function(req, res) {

    let qsin = req.query.in;
    res.write("WESWEB01.romland.space\nExpress.JS Webserver \n\n")

    try {
        res.write(qsin)
      } catch (error) {
        console.error("No QS!");
        res.write("You can change what you see here by adding \"in= <YOUR COMMENT HERE>\" to the ")
      }

    res.end()
});

let server = app.listen(5000, function() {
    console.log('Server is listening on port 5000')
});