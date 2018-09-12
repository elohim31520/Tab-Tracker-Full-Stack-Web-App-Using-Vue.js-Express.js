<template lang='pug'>   
    v-layout(mt-4,wrap,justify-center)

        //- card container
        v-flex(mt-4,x12,md7)
            Panel(title='Your Bookmark List').relative 

                //- card
                v-flex
                    v-card(color="#FBFBFB",dark, v-for='(song,index) in songs',:key='keys[index]').mb-4
                        v-layout
                            v-flex(xs5)
                                v-img(:src="song.albumImageUrl",width="100%",contain)
                        
                            v-flex(xs7).song-description
                                div.mt-4
                                    h1 {{song.title}}
                                    br
                                    p {{song.artist}}
                                    br
                                    p {{song.genre}}
                                v-btn(dark,@click='viewTheSong(index)').cyan.margin-bottom View Detail
                                
            
</template> 

<script>
import SongService from '../services/SongService.js'
import {mapState} from 'vuex' 

export default {
    data(){
        return {
            songs:[],
            keys: []
        }
    },
    computed :{
        ...mapState(['isLoggedIn'])
    },
    props: ['title'],
    async mounted() {
        try{
            let bookMarkData = await SongService.getBookmarkSongs()
            console.log(bookMarkData.data)
            this.songs = bookMarkData.data.values
            this.keys = bookMarkData.data.keys
        
        }catch(err){
            console.log('取得書籤資料發生錯誤',err)
        }
    },
    methods:{
        viewTheSong(songId){
            this.$router.push({ path: `/songs/${this.keys[songId]}` })
        }
    }
}
</script>

<style lang='sass'>
.relative
    position: relative

    .size
        font-size: 3rem
        line-height: 3rem
        cursor: pointer
        right: 1rem
        top: 5px

    .song-description
        display: flex
        flex-direction: column
        justify-content: center
        color: #6a6a6a
        align-items: center

        .margin-bottom
            margin-bottom: 2rem
</style>