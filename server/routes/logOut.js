var express = require('express');
var router = express.Router();
var firebase = require('../database/firebase_connection')



router.post('/', async (req, res) => {
    // 檢查登入狀態
    let user = await firebase.auth().currentUser
    if(user){
        try{
            //登出
            await firebase.auth().signOut()
            console.log('登出成功')
            res.end()
        }
        catch(err){
            console.log(err)
            res.status(400)
        }
    }
    else{
        console.log('請先登入')
        res.send('妳還沒有登入')
    }

    
});

module.exports = router;