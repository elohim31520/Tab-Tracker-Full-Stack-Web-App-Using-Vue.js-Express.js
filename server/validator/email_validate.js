const Joi = require('joi')

module.exports = (req,res,next) => {
    
    // let {email,password} = req.body
    let schema = {
        email: Joi.string().email(),
        password: Joi.string().regex(
            new RegExp('^[a-zA-Z0-9]{6,16}$')
        )
    }
    const{error,value} = Joi.validate(req.body,schema)
    if(error){
        switch(error.details[0].context.key){
            case 'email':
                res.status(400).send({
                    error: 'you must provide a valid email address'
                })
                break
            case 'password':
                res.status(400).send({
                    error: 'you must provide a valid password , at least 6 charactors'
                })
                break
            default:
                res.status(400).send({
                    error: 'Invalid register'
                })
        }
    }
    else{
        next()
    }  
}