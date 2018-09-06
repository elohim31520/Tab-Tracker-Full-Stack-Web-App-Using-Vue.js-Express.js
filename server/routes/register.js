var express = require('express');
var router = express.Router();
var firebaseAdminDb = require('../database/firebase_admin')
var firebase = require('../database/firebase_connection')



router.post('/', async (req, res) => {
    const {email,password} = req.body
    try{
        // 檢查是否登入
        let user = await firebase.auth().currentUser
        if (user){
            // 登入狀態
        }
        else{
            // 並無登入狀態，嘗試註冊
            await firebase.auth().createUserWithEmailAndPassword(email,password)
            console.log("註冊成功")
            // 再次檢查狀態
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in.
                    console.log('已登入')
                    let userEmail= firebase.auth().currentUser.email
                    let userId = firebase.auth().currentUser.uid
                    var userDatakey = firebaseAdminDb.ref('users').push().key
                    userDatakey = userId
                    console.log(userDatakey)
                    firebaseAdminDb.ref('users').child(userDatakey).set({userid: userId, email: userEmail})
                } else {
                    // No user is signed in.
                    console.log("不明原因註冊失敗")
                }
            })
        }
    }  
    catch(err){
        console.log("註冊失敗",err)
        res.status(404).send(err.message)
    }   

    
});

module.exports = router;