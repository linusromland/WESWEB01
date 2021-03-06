const mongoose = require('mongoose');
const mongoadress = "mongodb://localhost/WebbServerTesting"
mongoose.connect(mongoadress, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB Database on adress " + mongoadress)
})

const personSchema = new mongoose.Schema({
    name: String,
    mail: String,
    age: Number
})

personSchema.methods.speak = function (){
    const name = this.name
    ? "My name is " + this.name
    : "I don't have a name";
    const age = this.age
    ? "I am " + this.age
    : "I don't have a age";
    console.log(name + "\n" + age);
}

const Person = mongoose.model('Person', personSchema);

exports.data = function (namein, mailin, agein){
    const tmp = new Person({name: namein, mail : mailin, age : agein});
    tmp.save();
};


