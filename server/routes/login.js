var express = require('express');
var router = express.Router();
var firebase = require('../database/firebase_connection')



router.post('/', async (req, res) => {
    const { email, password } = req.body
    try {
        // 檢查是否登入
        let user = await firebase.auth().currentUser
        if (user) {
            // User is signed in.
            console.log('已登入')
            res.send("已登入")
        } 
        else {
            // No user is signed in.
            // console.log(email)
            await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log("登入成功")
            res.end()
        }
    }
    catch (error) {
        console.log("登入失敗", error)
        var errorMessage = error.message;
        res.status(401).send(errorMessage)
    }

});

module.exports = router;