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

</template>

<script>
export default {
    
}
</script>

<style lang='sass'>
.home
    cursor: pointer
    &:hover
        color: #000
</style>
