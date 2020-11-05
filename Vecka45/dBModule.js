const mongoose = require('mongoose');
let db;

exports.cnctDB = (collectionname) =>{
  let dbLink = `mongodb://localhost/${collectionname}`
  mongoose.connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true });

  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log("logged in to " + collectionname)
});

}

exports.dropDatabase = (Model) => {
  Model.remove({}, function(err) { 
    console.log('Removed database') 
 });
}

exports.findInDB = async (Model) => {
  let cool = await Model.find({})
  console.log(cool)
  return cool
}

exports.findInDBOne = async (Model, toFind) => {
  let cool = await Model.findOne({name: toFind})
  console.log(cool)
  return cool
}

exports.saveToDB = (input) => {
     input.save(()=>{
       console.log(`Successfully saved ${input} to the database!`)
     })
}