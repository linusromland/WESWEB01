import express from 'express'
import { Application } from 'express-serve-static-core'
const app: Application = express()
import ejs from 'ejs'
const port = 3200

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        x: 1
    });
})

app.listen(port, () => console.log(`Server running okay ON PORT ${port}`))
