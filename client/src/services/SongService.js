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
    },
    updateSong(songId,data){
        return Api().post(`songs/${songId}`,data)
    },
    setThisSongAsbookMark(songId){
        return Api().post(`songs/${songId}/bookmark`)
    },
    unSetThisSongAsbookMark(songId){
        return Api().delete(`songs/${songId}/deleteBookmark`)
    },
    getBookmarkSongs(){
        return Api().get('bookmark')
    },
    checkIsbooked(songId){
        return Api().get(`bookmark/${songId}`)
    }
}