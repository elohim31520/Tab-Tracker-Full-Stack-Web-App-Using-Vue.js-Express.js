const express = require('express');
const router = express.Router();
const firebaseAdminDb = require('../database/firebase_admin')
const firebase = require('../database/firebase_connection')
const bcrypt = require('bcrypt')

// 驗證email password 格式
const email_validate = require('../validator/email_validate')


router.post('/', email_validate , async (req, res) => {
    const {email,password} = req.body
    const saltRound = 8
    
    try{
        // 檢查是否登入
        let user = await firebase.auth().currentUser
        if (user){
            // 登入狀態
            res.send('already logged')
        }
        else{
            // 並無登入狀態，嘗試註冊
            await firebase.auth().createUserWithEmailAndPassword(email,password)
            console.log("註冊成功")
            // hash password
            let encryptPassword = await bcrypt.hash(password,saltRound)
            
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
                    firebaseAdminDb.ref('users').child(userDatakey).set({
                        userid: userId,
                        email: userEmail,
                        password: encryptPassword
                    })
                    res.end()
                } else {
                    // No user is signed in.
                    res.send('invalid Register')
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