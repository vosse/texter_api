const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const User = require('../models/User')
const Text = require('../models/Text')


/*
POST ROUTE
CREATE NEW TEXT
*/

router.post('/new', auth, async(req, res) => {
  try {

    let { text, user_id } = req.body

    const user = await User.findOne({
      where: {
        user_id: user_id
      },
      attributes: ['user_id']
    })

    if(!user) {
      return res.status(404).send('User not found')
    }


    console.log(user_id)

    const newText = await Text.create({
      text: text,
      user_id: user_id
    })

    console.log(newText)

    res.status(200).json({msg: 'oks' })

  } catch(err) {
    console.log(err)
    res.status(500).json({
      msg: err
    })
  }
})


/*
GET ROUTE
GET ALL TEXTS FROM CERTAIN USER
*/

router.get('/user/:user_id', auth, async(req, res) => {
  try {

    let texts = await Text.findAll({ where: {
      user_id: req.params.user_id
    }})

    console.log(texts)

    res.status(200).json(texts)

  } catch (err) {
    res.status(500).send(err.message)
  }
})


/*
GET ROUTE
GET TEXT WITH CERTAIN ID
*/

router.get('/:text_id', auth, async(req, res) => {
  try {

    let text = await Text.findOne({
      where: {
        text_id: req.params.text_id
      }
    })

    res.status(200).json(texts)

  } catch (err) {
    res.status(500).send(err.message)
  }
})


/*
DELETE ROUTE
DELETE TEXT WITH CERTAIN ID
*/

router.delete('/delete/:text_id', auth, async(req, res) => {
  try {

    let text = await Text.findOne({
      where: {
        text_id: req.params.text_id
      }
    })

    if(!text) {
      return res.status(401).json({ msg: 'Text not found' })
    }

    if(text.user_id !== req.body.user_id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    await Text.destroy({
      where: {
        text_id: req.params.text_id
      }
    })

    res.status(204).json({ msg: 'Text deleted' })

  } catch (err) {
    res.status(500).send(err.message)
  }
})



module.exports = router
