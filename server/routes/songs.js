var express = require('express');
var router = express.Router();
const firebaseAdminDb = require('../database/firebase_admin')
const firebase = require('../database/firebase_connection')
// const songs_data_validate = require('../validator/songs_data_validate')
const verifyToken = require('../middleware/verifyToken')

/* GET Songs page. */
router.get('/', (req, res) => {
    try{
        firebaseAdminDb.ref('Songs').once('value').then((snapshot)=>{
            // console.log(snapshot.val())
            res.send(snapshot.val())
        })
    }catch(err){
        console.log('GET song時出現錯誤',err)
    }
});

// 搜尋
router.get('/search/:id', async (req,res)=>{
    // console.log(req.params.id)
    const keyword =req.params.id
    // 關鍵字不為空才搜尋
    if(keyword !='' && keyword !=' '){
        try{
            let songs = await firebaseAdminDb.ref('Songs').once('value')
            // songs 所有歌曲的value裝成一個陣列，裡面都是obj
            let songValues = Object.values(songs.val())
            // keys 是values裡面要過濾的項目
            let keys = ['album','artist','title','genre']
            // 過濾含有keyword的項目
            let data = songValues.filter((obj)=>{
                for(i=0;i<keys.length;i++){
                    // console.log(obj[keys[i]].toLowerCase().indexOf(keyword.toLowerCase()))
                    // 如果有找到，返回該物件
                    if(obj[keys[i]].toLowerCase().indexOf(keyword.toLowerCase()) !=-1){
                        return obj
                    }    
                }
            })
            // console.log(data)
            res.send(data)
    
        }catch(err){
            console.log('搜尋時發生錯誤',err)
        }
    }
    res.send('關鍵字不可為空')
})



// POST song data 寫入資料庫
router.post('/',verifyToken,  async (req, res) => {
    console.log(req.user)
    req.body.createdBy = req.user
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


// GET 特定:id 的 歌曲
router.get('/:id',async (req,res)=>{
    // console.log(req.params.id)
    try{
        let song = await firebaseAdminDb.ref(`Songs`).child(req.params.id).once('value')
        // console.log('資料在這裡',song.val())
        res.send(song.val())
    }
    catch(err){
        console.log('抓取特定ID歌曲時出錯',err)
    }
})

// POST 更新 特定:id 的 歌曲資料
router.post('/:id',verifyToken, async (req,res)=>{
    // console.log('Req資料',req.body)
    req.body.updatedBy = req.user
    
    try{
        let song = await firebaseAdminDb.ref(`Songs`).child(req.params.id).update(req.body)
        // res.send(song.val())
        console.log('更新成功')
        res.send('更新成功')
    }
    catch(err){
        console.log('抓取特定ID歌曲時出錯',err)
    }
})

// POST 設定書籤
router.post('/:id/bookmark',verifyToken, async (req,res)=>{

    // 把mail帳號設為firebase的key
    let user = req.user.email.split('@')
    // console.log(user)

    try{
        // 把mail帳號設為firebase的key
        let account_key = await firebaseAdminDb.ref('Bookmark').push().key
        // user[0]就是帳號，設為key
        account_key = user[0]
        // 再帳號抵下再嵌套一層
        let songkey = await firebaseAdminDb.ref('Bookmark').child(account_key).push().key
        // 把歌曲的key val 設為一樣
        songkey = req.params.id
        // 設定bookmark 裡面song的id
        await firebaseAdminDb.ref(`Bookmark/${account_key}`).child(songkey).set(req.params.id)

        console.log('更新成功')
        res.send('更新成功')
    }
    catch(err){
        console.log('設定書籤時發生錯誤',err)
    }
})


// 刪除書籤
router.delete('/:id/deleteBookmark',verifyToken, async (req,res)=>{

    // 帳號為firebase bookmark的key
    let user = req.user.email.split('@')
    try{
        // 抓到帳號 firebase的key
        await firebaseAdminDb.ref(`Bookmark/${user[0]}`).child(req.params.id).remove()
        console.log('書籤刪除成功')
        res.send('書籤刪除成功')
    }
    catch(err){
        console.log('設定書籤時發生錯誤',err)
    }
})




module.exports = router;