const mongoose = require('mongoose');
const mongoadress = "mongodb://localhost/LoginTesting"
mongoose.connect(mongoadress, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB Database on adress " + mongoadress)
})

const personSchema = new mongoose.Schema({
    name: String,
    mail: String,
    pass: String,
})

const Person = mongoose.model('Person', personSchema);

exports.data = function (namein, mailin, passin){
    const tmp = new Person({name: namein, mail : mailin, pass : passin});
    tmp.save();
};


