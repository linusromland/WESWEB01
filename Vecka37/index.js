const express = require('express')
const app = express()
const port = 3000
const filesDir = __dirname + "/client/"
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const fs = require('fs');

app.use(express.urlencoded({
    extended: true,
    limit: "50000mb"
  }))

// enable files upload
app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 200 * 1024 * 1024 * 1024 //2MB max file(s) size
    },
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.sendFile(filesDir + 'index.html')
    var forwardedIpsStr = req.header('x-forwarded-for');
    var IP = '';

    if (forwardedIpsStr) {
        IP = forwardedIps = forwardedIpsStr.split(',')[0];  
    }
    console.log(IP)
})
app.listen(port, () => console.log(`Server running okay!`))

app.post('/', function (req, res) {
    console.log("\nNew POST request! \n\nName: " + req.body.name + "\nEmail: " + req.body.email + "\n\n")
    fs.writeFileSync(filesDir + "/uploads/cool.txt", req.body.name)
    res.sendFile(filesDir + 'index.html')

    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let file = req.files.file;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            file.mv(filesDir + '/uploads/' + file.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }

    res.end()
})