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

router.get('/get/:username', async(req, res) => {
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
                model: Text,
            }],
            order: [[Text, 'created_at', 'DESC']]
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



router.get('/info', auth, async(req, res) => {

    let { id } = req.user

    try {
        

        let user = await User.findOne({ where: {
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
    } else {
        console.log('user not found')
        res.status(404).json({ msg: 'User not found '})
    }

    } catch (err) {
        res.status(500).send('Server error')
    }
})


module.exports = router