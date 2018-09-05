<template lang='pug'>
    v-layout
        v-flex(xs6,offset-xs3)
            .white.elevation-2
                v-toolbar.cyan(dark,flat,dense)
                    v-toolbar-title Register

                .px-4.py-2
                    v-text-field(label="Email",v-model="email",:rules="[rules.required, rules.email]")
                    br
                    v-text-field(type='password', label="password",v-model="password",:rules="[rules.required]")
                    br
                    v-btn(dark, @click='register').cyan Register

</template>


<script>
import AuthenticationService from '../services/AuthenticationService.js'

export default {
    data() {
        return {
            email: '',
            password: '',
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                    }
            }
        }
    
    },
    methods: {
        async register() {
            try{
                await AuthenticationService.register({
                    email: this.email,
                    password: this.password
                })
            }catch(e){
                console.log(e)
            }
            
        }
    }
}
</script>

<style>
</style>
