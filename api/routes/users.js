const express = require('express')
const router = express.Router()
const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtGen = require('../util/jwtGen')
const auth = require('../middleware/auth')

// model
const User = require('../models/User')

// middleware
const timeLogger = require('../middleware/timeLogger')




router.get('/test', async (req, res) => {
  try {

    const salt = await bcrypt.genSalt(10)
    let ky = process.env.JWT_KEY
    console.log(process.env.JWT_KEY)
    res.status(200).json({ key: ky })
  } catch (err) {
    console.log(err)
  }


})


/*
POST ROUTE
SIGNUP
*/

router.post('/signup', async (req, res) => {


  let { email, username, name, password, bio, location, age } = req.body
  //console.log(email)

  try {

    let user = await User.findOne({ where: {
      email: email
    } })

    if(user) {
      res.status(400).json({ error:"email is taken" })
    }

    const salt = await bcrypt.genSalt(10)

    //console.log(salt)

    password = await bcrypt.hash(password, salt)

    user = await User.create({
      email: email,
      username: username,
      name: name,
      password: password,
      bio: bio,
      location: location,
      age: age
    })

    const payload = {
      user: {
        id: user.user_id
      }
    }

    jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 1800 }, (err, token) => {
      if(err) {
        throw err
      } else {
        res.status(200).json({ token })
      }
    })

  } catch(err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
})


/*
POST ROUTE
LOGIN
*/

router.post('/login', async (req, res) => {


  let { username,email, password } = req.body

  //let criteria = (username.indexOf('@') === -1) ? {username: username} : {email: username}

  let user = {}

  if(username && username.indexOf('@') === -1) {
      user = await User.findOne({ where: {
      username: username
    }})
  } else if(email && email.indexOf('@') !== -1){
      user = await User.findOne({ where: {
      email: email
    }})
  } else {
    res.status(401)
  }

  try {

    if(!user) {
      res.sendStatus(400).json({
        msg: 'Auth failed'
      })
    }

    const validPass = await bcrypt.compare(password, user.password)

    if(!validPass) {
      res.sendStatus(403).json({
        msg: 'Invalid password'
      })
    }

    const token = await jwtGen(user.user_id)

    console.log(`TOKEN IS ${token}`)

    res.status(200).json({
      token
    })

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})


/*
We'll see bout this one

*/

router.get('/info', auth, async(req, res) => {

  let { id } = req.user


  try {
    const user = await User.findOne({
      where: {
        user_id: id
      },
      attributes: ['user_id', 'age', 'bio', 'email', 'username', 'name', 'created_at']
    })

    if(user) {
      res.status(200).json(user)
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})


/*
DELETE USER

*/

router.delete('/delete/:user_id', auth, async(req, res) => {

  //let { user_id } = req.body

  try {

    let user = await User.destroy({
      where: {
        user_id: req.params.user_id
      }
    })



  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

})


module.exports = router
