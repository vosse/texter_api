const jwt = require('jsonwebtoken')


const jwtGen = (id) => {

  const payload = {
    user: {
      id: id
    }
  }

  //console.log(payload)

  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 1800 })
}

module.exports = jwtGen
