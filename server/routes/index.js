var express = require('express');
var router = express.Router();
var firebase = require('../database/firebase_admin')

firebase.database().ref().once('value',(snapshot)=>{
  console.log(snapshot.val())
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hi")
});


router.post('/register',(req,res) => {
  console.log(req.body)
  res.send('hello there')
})

module.exports = router;
