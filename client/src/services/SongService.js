import Api from './Api'

export default {
    getSongs() {
        return Api().get('songs')
    },
    createSong(songs) {
        return Api().post('songs',songs)
    },
    showSpecificSong(songId){
        return Api().get(`songs/${songId}`)
    }
}