<template lang='pug'>
    v-layout(wrap)
        v-flex(xs12,md5)
            Panel(title='Create Song Data')
                v-text-field(label='Song name',v-model='song.title',:rules="[rules.required]")
                v-text-field(label='artist',v-model='song.artist',:rules="[rules.required]")
                //- v-text-field(label='genre',v-model='song.genre',:rules="[rules.required]")
                v-select(:items=" genres",label="Genre",v-model='song.genre',append-icon)
                v-text-field(label='album',v-model='song.album',:rules="[rules.required]")
                v-text-field(label='album Image Url',v-model='song.albumImageUrl',:rules="[rules.required]")
                v-text-field(label='youtube Link',v-model='song.youtubeId',:rules="[rules.required]")
        v-flex(xs12,md7)
            Panel(title='Song Structure').ml-4
                v-textarea(label='lyrics',v-model='song.lyrics',:rules="[rules.required]",multi-line,clearable)
                br
                br
                v-textarea(label='tab',v-model='song.tab',multi-line,clearable)
                br
                v-btn(dark, @click='create').cyan Update
            v-alert.mt-4(v-if='error',:value='true',type="error") {{error}}
</template>

<script>
import SongService from '../services/SongService.js'

export default {
    data () {
        return {
            genres: ['Rock','Pop','Electronic','Hip hop','Blues','Folk','Latin','Jazz','R&B and soul'],
            error:'',
            song:{
                title: '',
                artist: '',
                genre: '',
                album: '',
                albumImageUrl: '',
                youtubeId: '',
                lyrics: '',
                tab: 'No data',
            },   
            rules:{
                required: value => !!value || 'Required.'
            }
        }
    },
    mounted(){
        // 載入時獲取store裡的歌曲資料
        this.song = this.$store.state.nowViewingSong 
    },
    methods: {
        // 檢查表單是否空白
        checkBlank(){
            let song_key = Object.values(this.song)
            // console.log(song_key)
            let status = true
            for(let i=0;i<song_key.length;i++){
                if(song_key[i] == '' || song_key[i]==null){
                    status = false
                }
            }

            return status
        },
        async create(){
            let willsendReq = this.checkBlank()
            
            if(willsendReq){
                try{
                    let songId = this.$store.state.route.params.id
                    // console.log(songId)
                    await SongService.updateSong(songId,this.song)
                    this.$router.push({name: 'songs'})
                }catch(err){
                    console.log(err)
                }
            }else{
                console.log('請檢查是否填寫完整');
                this.error = '請檢查是否填寫完整'
                
            }
            
            
            
        }
    }
}
</script>

<style lang='sass'>

</style>