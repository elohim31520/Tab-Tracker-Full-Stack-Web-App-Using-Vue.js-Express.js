<template lang='pug'>
    .veiw-the-song
        v-layout
            //- song card
            v-flex(md6)
                Panel(title='About The Song')
                    v-card(color="#FBFBFB",dark).mb-4
                        v-layout
                            v-flex(xs5)
                                v-img(:src='song.albumImageUrl')
                        
                            v-flex(xs7).song-description
                                div.mt-4
                                    h1 {{song.title}}
                                    br
                                    p {{song.artist}}
                                    br
                                    p {{song.genre}}
                                v-btn(dark,@click='editTheSong',v-if='isLoggedIn').mb-4.cyan Edit
                                v-btn(dark,@click='setAsBookmark',v-if='!isBooked').mb-4.cyan
                                    v-icon(v-text="icon").icon_booked_style.
                                v-btn(dark,@click='unSetAsBookmark',v-if='isBooked').mb-4.deep-orange.darken-1
                                    v-icon(v-text="icon").icon_booked_style.

            //- youtube embed  src="https://www.youtube.com/embed/PcbOFqi1LF4" "https://www.youtube.com/watch?v=khXkLs0TqdY"
            v-flex(md6).ml-4
                Panel(title='Youtube')
                    youtube(:video-id="videoId")

        v-layout.mt-5
            //- lyrics
            v-flex(md6)
                Panel(title='Lyrics')
                    textarea(readonly,v-model='song.lyrics').textarea

            //- Tab
            v-flex(md6).ml-4
                Panel(title='Tab')
                    textarea(readonly,v-model='song.tab').textarea

</template>

<script>
import SongService from '../services/SongService.js'
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'
import {mapState} from 'vuex' 

export default {
    data () {
        return {
            song: {},
            videoId: '',
            isBooked: false
        }
    },
    computed :{
        ...mapState(['isLoggedIn'])
    },
    props: {
        icon: {
            type: String,
            default: '$vuetify.icons.bookmark'
        }
    },
    async mounted(){
        try{
            let songId = this.$store.state.route.params.id
            this.song = (await SongService.showSpecificSong(songId)).data

            // 回傳後對youtube url 作一些處理
            this.videoId = getIdFromURL(this.song.youtubeId)
            // console.log(this.videoId)
        }
        catch(err){
            console.log('get song 發生錯誤',err)
        }
        
    },
    methods:{
        // 編輯歌曲
        async editTheSong() {
            await this.$store.dispatch('setTheViewingData',this.song)
            this.$router.push({name: 'edit-the-song'})
        },
        // 設為書籤
        async setAsBookmark() {
            try{
                let id = this.$route.params.id
                await SongService.setThisSongAsbookMark(id)
                this.isBooked = true
            }catch(err){
                console.log('設為書籤有錯誤',err)
            }
        },
        // 刪除書籤
        async unSetAsBookmark() {
            try{
                let id = this.$route.params.id
                await SongService.unSetThisSongAsbookMark(id)
                this.isBooked = false
            }catch(err){
                console.log('取消書籤時發生錯誤',err)
            }
        }
        
    }
}
</script>

<style lang='sass'>
.veiw-the-song
    div
        h1, p
            color: #646464

    .textarea
        width: 70%
        height: 100%
        height: 600px
        border-style: none
        border-color: transparent
        overflow: auto
        font-size: 20px


    .icon_booked_style

</style>
