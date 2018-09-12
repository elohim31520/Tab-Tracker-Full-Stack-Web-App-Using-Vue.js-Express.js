<template lang='pug'>   
    v-layout(mt-4,wrap,justify-center)
        
        //- serch container
        v-flex(x12,md7,justify-center)
            SongSerch(@sendingSerchData='serchSong = arguments[0]')

        //- card container
        v-flex(mt-4,x12,md7)
            Panel(title='Songs').relative
                v-btn(small,fab,dark,color="teal lighten-3",absolute,:to='{name: "create-song"}',v-if='isLoggedIn').size +

                //- card
                v-flex
                    v-card(color="#FBFBFB",dark, v-for='(song,index) in songs',:key='keys[index]',v-if='!serchSong').mb-4
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
                //- 搜尋後的資料，v-if 控制
                v-flex
                    v-card(color="#FBFBFB",dark, v-for='(song,index) in serchSong',:key='keys[index]',v-if='serchSong').mb-4
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
import SongSerch from './songs/SongSerch'
import {mapState} from 'vuex' 

export default {
    components:{
        SongSerch
    },
    data(){
        return {
            songs:[],
            serchSong: null,
            keys: []    
        }
    },
    computed :{
        ...mapState(['isLoggedIn'])
    },
    props: ['title'],
    async mounted (){
        let response = await SongService.getSongs()
        // console.log(response)

        // 把firebase回傳值 key value 分離
        this.songs = Object.values(response.data)
        this.keys = Object.keys(response.data)
        
        // 最新資料在最前面，reverse
        this.songs = this.songs.reverse()
        this.keys = this.keys.reverse()
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