<template lang='pug'>
    v-toolbar(dark,fixed).cyan
        v-toolbar-title.mr-4
            router-link(tag="span",:to="{name: 'root'}").home  Song Share
        v-toolbar-items
            v-btn(dark,flat,:to="{ name: 'bookmark'}",v-if='isLoggedIn').cyan Bookmark
            v-btn(dark,flat,:to="{ name: 'create-song'}",v-if='isLoggedIn').cyan Create
        v-spacer
        v-toolbar-items
            v-btn(dark,flat,:to="{ name: 'register'}",v-if='!isLoggedIn').cyan Sign up
            v-btn(dark,flat,:to="{ name: 'login'}",v-if='!isLoggedIn').cyan Login
            v-btn(dark,flat, @click='logout',v-if='isLoggedIn').cyan Log Out

</template>

<script>
import AuthenticationService from '../services/AuthenticationService.js'
import {mapState} from 'vuex' 

export default {
    computed :{
        ...mapState(['isLoggedIn'])
    },
    methods: {
        async logout() {
            try{
                let response = await AuthenticationService.log_out()
                if(response){
                    this.$store.dispatch('setTokentoNull')
                    console.log(response.data)
                    this.$router.push({name: 'songs'})
                    
                }
            }
            catch(err){
                console.log(err)
            }
            
        }
    }
}
</script>

<style lang='sass'>
.home
    cursor: pointer
    &:hover
        color: #000
</style>
