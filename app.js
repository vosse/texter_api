const express = require('express')
const User = require('./api/models/User')
const Text = require('./api/models/Text')

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


User.hasMany(Text, { foreignKey: 'user_id'})
Text.belongsTo(User, { foreignKey: 'user_id'})


const port = process.env.PORT || 5000


// routes
app.use('/user', require('./api/routes/users'))
app.use('/auth', require('./api/routes/auth'))
app.use('/text', require('./api/routes/texts'))


app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port, () => console.log(`Running on ${port}`))
