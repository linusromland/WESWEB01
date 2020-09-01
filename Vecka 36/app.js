const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Visit https://romland.space/!'))
app.get('/why', (req, res) => res.send('Why??'))
app.listen(port, () => console.log(`Server running on port ${port}!`))