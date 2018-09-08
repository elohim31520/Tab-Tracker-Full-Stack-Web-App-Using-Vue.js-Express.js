<template lang='pug'>
    v-flex
        Panel(title='Serch')
            v-text-field(label='Serch by song mane, artist, album, or genre',v-model='serch',clearable)
</template>

<script>
export default {
    data(){
        return {
            serch: ''
        }
    }
}
</script>

<style lang='sass'>

</style>
