const express = require('express');
const router = express.Router();
const firebaseAdminDb = require('../database/firebase_admin')
const firebase = require('../database/firebase_connection')
// const songs_data_validate = require('../validator/songs_data_validate')
const verifyToken = require('../middleware/verifyToken')

/* GET home page. */
router.get('/',verifyToken, async function(req, res) {
    // 取得song ID
    let user = req.user.email.split('@')
    try{
        let data = await firebaseAdminDb.ref('Bookmark').child(user[0]).once('value')
        let key = Object.keys(data.val())
        // 利用key搜尋音樂，並回傳
        let songs = {keys:[],values:[]}
        songs.keys = key
        for(i=0;i<key.length;i++){
            let temp =  await firebaseAdminDb.ref('Songs').child(key[i]).once('value')
            songs.values.push(temp.val())
        }
        // console.log(songs)
        res.send(songs)
    }catch(err){
        console.log('取得書籤發生錯誤',err)
    }
    
})

// 檢查是否有此書籤
router.get('/:id',verifyToken, async function(req, res) {
    // 取得song ID
    let user = req.user.email.split('@')
    try{
        let isbooked = await firebaseAdminDb.ref(`Bookmark/${user[0]}`).child(req.params.id).once('value')
        if(isbooked.val()){
            res.send({isbooked: true})
        }else{
            res.end()
        }
    }catch(err){
        console.log('檢查書籤發生錯誤',err)
    }
})

module.exports = router;
