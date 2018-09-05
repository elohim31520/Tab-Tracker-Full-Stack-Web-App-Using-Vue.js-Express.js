<template lang='pug'>
    v-toolbar(dark,fixed).cyan
        v-toolbar-title.mr-4
            router-link(tag="span",:to="{name: 'songs'}").home  Tab Tracker
        v-toolbar-items
            v-btn(dark,flat).cyan Browse
        v-spacer
        v-toolbar-items
            v-btn(dark,flat,:to="{ name: 'register'}").cyan Sign up
            v-btn(dark,flat,:to="{ name: 'login'}").cyan Login
            v-btn(dark,flat, @click='logOut').cyan Log Out

</template>

<script>
import AuthenticationService from '../services/AuthenticationService.js'

export default {
    methods: {
        async logOut() {
            console.log('登出中')
            try{
                await AuthenticationService.log_out()
                this.$router.push({name: 'songs'})
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
