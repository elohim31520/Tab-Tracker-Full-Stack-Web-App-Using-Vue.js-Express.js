var express = require('express');
var router = express.Router();
const firebaseAdminDb = require('../database/firebase_admin')
const firebase = require('../database/firebase_connection')
// const songs_data_validate = require('../validator/songs_data_validate')

/* GET Songs page. */
router.get('/', (req, res) => {
    firebaseAdminDb.ref('Songs').once('value').then((snapshot)=>{
        // console.log(snapshot.val())
        res.send(snapshot.val())
    })
});


// song data 寫入資料庫
router.post('/',  async (req, res) => {
    let songs = req.body
    try{
        let songkey = await firebaseAdminDb.ref('Songs').push().key
        await firebaseAdminDb.ref('Songs').child(songkey).set(songs)
        res.send('your data is saved')
    }
    catch(err){
        res.status(400).send('存入資料庫時出現問題')
    }
    
});

module.exports = router;