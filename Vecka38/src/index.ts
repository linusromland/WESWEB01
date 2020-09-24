import express from 'express'
import { Application } from 'express-serve-static-core'
import {MongoClient} from 'mongodb';
const app: Application = express()
import ejs from 'ejs'
const port = 3200
const uri = "mongodb://test";

const client = new MongoClient(uri);

async function main(){
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    let databasesList: string = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${client.db.name}`));
};

main().catch(console.error);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        x: 1
    });
})

app.listen(port, () => console.log(`Server running okay ON PORT ${port}`))
