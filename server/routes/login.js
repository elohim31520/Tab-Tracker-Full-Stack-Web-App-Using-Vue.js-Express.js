var express = require('express');
var router = express.Router();
var firebase = require('../database/firebase_connection')
const jwt = require('jsonwebtoken')
// const firebaseAdminDb = require('../database/firebase_admin')
// const bcrypt = require('bcrypt')
require('dotenv').config()

router.post('/', async (req, res) => {
    const { email, password } = req.body
    try {
        // 檢查登入狀態
        let user = await firebase.auth().currentUser
        if (user) {
            // User is signed in.
            console.log('已登入')
            res.send("已登入")
        } 
        else {
            // No user is signed in.
            // console.log(email)
            // 註冊
            await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log("登入成功")
            
            // 回傳jwt token
            let token = jwt.sign({email},process.env.SECRET,{expiresIn: 7*24*60*60*1000})
            res.send({ token })
    
            // res.status(403).send('密碼錯誤')
            
        }
    }
    catch (error) {
        console.log("登入失敗", error)
        var errorMessage = error.message;
        res.status(401).send(errorMessage)
    }

});

module.exports = router;