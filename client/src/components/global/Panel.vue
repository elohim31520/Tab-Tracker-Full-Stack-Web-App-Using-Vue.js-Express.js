<template lang='pug'>   
    .white.elevation-2
        v-toolbar.cyan(dark,flat,dense)
            v-toolbar-title {{title}}

        .px-4.py-2
            slot
</template>

<script>
export default {
    props: ['title']
}
</script>

<style lang='sass'>

</style>
