const express = require('express')

const app = express()
app.use(express.json())

require('dotenv').config()


const port = process.env.PORT || 5000


// routes
app.use('/auth', require('./api/routes/users'))
app.use('/text', require('./api/routes/texts'))


app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port, () => console.log(`Running on ${port}`))
