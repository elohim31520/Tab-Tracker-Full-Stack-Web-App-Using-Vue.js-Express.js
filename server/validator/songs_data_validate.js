const Joi = require('joi')

module.exports = (req,res,next) => {
    
    let schema = {
        title: Joi.string(),
        artist: Joi.string(),
        genre: Joi.string(),
        album: Joi.string(),
        albumImageUrl: Joi.string(),
        youtubeId: Joi.string(),
        lyrics: Joi.string(),
        tab: Joi.string()
    }
    // console.log(req.body)
    // tab 如果無填寫 轉成 字串 'no data'
    let songs = req.body
    if(songs.tab == null){
        songs.tab = 'no data'
    }
    
    // Joi 檢查資料格式
    const{error,value} = Joi.validate(songs,schema)
    if(error){
        res.status(400).send('something wrong in data type validatation')
    }
    else{
        next()
    }  
}