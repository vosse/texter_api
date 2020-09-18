const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const authHeader = req.headers['x-auth-token']
  const token = authHeader //&& authHeader.split(' ')[1]

  if(token==null) {
    return res.sendStatus(401).json({
      msg: 'Missing token'
    })
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_KEY)

    req.user = decoded.user

    next()

  } catch (err) {
    res.status(401).json({
      msg: 'Invalid token'
    })
  }



  // jwt.verify(token, process.env.JWT_KEY, (err, user) => {
  //   if(err) {
  //     res.sendStatus(403).json({
  //       msg: 'Invalid token'
  //     })
  //   }
  //   req.user = user
  //   next()
  //   })
}


module.exports = auth
