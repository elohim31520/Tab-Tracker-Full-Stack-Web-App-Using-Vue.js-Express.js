const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function(req, res, next) {
    let bearerHeader = req.headers['authorization']
    if(bearerHeader){
        let userDecoded = jwt.verify(bearerHeader,process.env.SECRET)
        req.user = userDecoded
        next()
    }else{
        res.status(403).send('token not found')
    }
}