<template lang='pug'>   
    v-layout(justify-center,mt-4)
        v-flex(xs12,md8)
            Panel(title='Songs').relative
                v-btn(small,fab,dark,color="teal lighten-3",absolute,:to='{name: "create-song"}').size +


                v-flex(xs12)
                    v-card(color="#FBFBFB",dark, v-for='(song,index) in songs',:key='index+1').mb-4
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
            
</template> 

<script>
import SongService from '../services/SongService.js'

export default {
    data(){
        return {
            songs:[]    
        }
    },
    props: ['title'],
    async mounted (){
        let response = await SongService.getSongs()
        // console.log(response)
        this.songs = Object.values(response.data)
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
        flex-wrap: wrap
        align-items: center
        color: #6a6a6a
        justify-content: center
</style>