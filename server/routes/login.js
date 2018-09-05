var express = require('express');
var router = express.Router();
var firebase = require('../database/firebase_connection')
var firebaseAuth = firebase.auth()


router.post('/', async (req, res) => {
    const { email, password } = req.body
    try {
        await firebaseAuth.signInWithEmailAndPassword(email, password)
        let user = firebase.auth().currentUser
        let userEmail = user.email
        let userId = user.uid
        console.log("登入成功",userEmail,userId)
        if (user) {
            // User is signed in.
            res.send({email: userEmail})
        } else {
            // No user is signed in.
        }

    }
    catch (error) {
        console.log("登入失敗", error)
        var errorMessage = error.message;
        res.status(400).send(errorMessage)
    }

});

module.exports = router;