<template lang='pug'>
    v-flex
        Panel(title='Serch')
            v-text-field(label='Serch by song mane, artist, album, or genre',v-model='keyword',clearable,@keydown.enter='searchSong')
</template>

<script>
import SongService from '../../services/SongService.js'

export default {
    data(){
        return {
            keyword: '',
            songs: []
        }
    },
    methods:{
        async searchSong() {
            if(this.keyword != ''){
                try{
                let data = await SongService.searchSong(this.keyword)
                // console.log(data.data)
                this.songs = data.data
                this.senDataToFatherComp()
                }catch(err){
                    console.log('搜尋發生錯誤',err)
                }
            }
            else{
                this.songs= null
                this.senDataToFatherComp()
            }
            
        },
        senDataToFatherComp() {
            this.$emit('sendingSerchData',this.songs)
        }
    }
}
</script>

<style lang='sass'>

</style>
