<template lang='pug'>
    v-layout(wrap)
        v-flex(xs12,md5)
            Panel(title='Create Song Data')
                v-text-field(label='Song name',v-model='song.title',:rules="[rules.required]")
                v-text-field(label='artist',v-model='song.artist',:rules="[rules.required]")
                v-text-field(label='genre',v-model='song.genre',:rules="[rules.required]")
                v-text-field(label='album',v-model='song.album',:rules="[rules.required]")
                v-text-field(label='album Image Url',v-model='song.albumImageUrl',:rules="[rules.required]")
                v-text-field(label='youtube Url',v-model='song.youtubeId',:rules="[rules.required]")
        v-flex(xs12,md7)
            Panel(title='Song Structure').ml-4
                v-textarea(label='lyrics',v-model='song.lyrics',:rules="[rules.required]",multi-line)
                br
                br
                v-textarea(label='tab',v-model='song.tab',multi-line)
                br
                v-btn(dark, @click='create').cyan Create
                
</template>

<script>
import SongService from '../services/SongService.js'

export default {
    data () {
        return {
            song:{
                title: '',
                artist: '',
                genre: '',
                album: '',
                albumImageUrl: '',
                youtubeId: '',
                lyrics: '',
                tab: '',
            },   
            rules:{
                required: value => !!value || 'Required.'
            }
        }
    },
    methods: {
        async create(){
            await SongService.createSong(this.song)
            this.$router.push({name: 'songs'})
        }
    }
}
</script>

<style lang='sass'>

</style>
