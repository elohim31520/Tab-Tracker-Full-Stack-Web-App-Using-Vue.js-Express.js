var express = require('express');
var router = express.Router();
var firebase = require('../database/firebase_connection')



router.post('/',(req, res) => {
    firebase.auth().signOut().then(()=>{
        console.log('登出成功')
    })
    .catch(err=>{
        console.log(err)
        res.status(400)
    })
});

module.exports = router;