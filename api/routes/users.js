const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const User = require('../models/User')
const Text = require('../models/Text')
const { route } = require('./texts')

/*
GET ROUTE
GET POSTS FROM SPECIFIC USER
*/

router.get('/:username', async(req, res) => {
    try {
  
      let { username } = req.params
  
      let user = await User.findOne({
            where: { username: username },
            attributes: [
                'user_id',
                'username',
                'name'
            ],
            include: [{
                model: Text
            }]
        })
  
      if(user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ msg: 'User not found' })
      }
    } catch (err) {
      res.status(500).send('Server error')
    }
  })



route.get('/info', auth, async(req, res) => {
    try {
        let { id } = req.user

        let user = User.findOne({ where: {
            user_id: id
        },
        attributes: [
            'user_id', 
            'age', 
            'bio', 
            'email', 
            'username', 
            'name', 
            'created_at'
        ]
    })

    if(user) {
        res.status(200).json(user)
    }

    } catch (err) {
        res.status(500).send('Server error')
    }
})


module.exports = router