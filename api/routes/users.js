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


/*
GET INFO ROUTE
*/

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



/*
UPDATE ROUTE
UPDATE USER
*/
router.put('/update', auth, async (req, res) => {
  
  let { id } = req.user

  let { username, name, bio, age } = req.body 

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

      

      const updateUser = await User.update({
        username: username,
        name: name,
        bio: bio,
        age: age
      }, {
        where: {
          user_id: id
        }
      })

      console.log('pass')

      res.status(200).json(updateUser)

      

    } else {
      res.status(404).json({ msg: 'User not found '})
    }

  } catch (err) {
    res.status(500).send('Server error')
  }

})


/*
DELETE ROUTE
DELETE USER
*/

router.delete('/delete/:username', auth, async (req, res) => {

  const { id } = req.user

  const { username } = req.params.username

  try {

    const user = await User.findOne({
      where: {
        user_id: id
      }
    })

    if(user) {

      console.log(username)

      const delUser = await User.destroy({
        where: {
          user_id: id,
          username: req.params.username
        }
      })

      res.status(200).json({ msg: 'User deleted' })

    } else {
      res.status(404).json({ msg: 'User does not exist' })
    }

  } catch (err) {
    res.status(500).send('Server error')
  }
})


module.exports = router