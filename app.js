const express = require('express')

const app = express()
app.use(express.json())

require('dotenv').config()

// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({
    })
  }
  next()
})


const port = process.env.PORT || 5000


// routes
app.use('/auth', require('./api/routes/users'))
app.use('/text', require('./api/routes/texts'))


app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port, () => console.log(`Running on ${port}`))
