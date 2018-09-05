var express = require('express');
var router = express.Router();
var firebaseAdminDb = require('../database/firebase_admin')
var firebase = require('../database/firebase_connection')
var firebaseAuth = firebase.auth()


router.post('/', async (req, res) => {
    const {email,password} = req.body
    try{
        await firebaseAuth.createUserWithEmailAndPassword(email,password)
        console.log("註冊成功")
    }  
    catch(err){
        console.log("註冊失敗",err)
    }   

    
});

module.exports = router;