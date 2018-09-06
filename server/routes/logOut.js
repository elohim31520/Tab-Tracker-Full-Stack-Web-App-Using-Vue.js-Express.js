var express = require('express');
var router = express.Router();
var firebase = require('../database/firebase_connection')



router.post('/',(req, res) => {
    let user = firebase.auth().currentUser
    if(user){
        firebase.auth().signOut().then(()=>{
            console.log('登出成功')
        })
        .catch(err=>{
            console.log(err)
            res.status(400)
        })
    }
    else{
        console.log('請先登入')
    }

    
});

module.exports = router;