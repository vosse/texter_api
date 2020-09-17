const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(token==null) {
    return res.sendStatus(401).json({
      msg: 'Missing token'
    })
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if(err) {
      res.sendStatus(403).json({
        msg: 'Invalid token'
      })
    }
    req.user = user
    next()
    })
}


module.exports = auth
