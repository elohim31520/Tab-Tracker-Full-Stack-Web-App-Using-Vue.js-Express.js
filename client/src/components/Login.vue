<template lang='pug'>
    v-layout(justify-center,mt-4)
        v-flex(xs12,md6)
            .white.elevation-2
                v-toolbar.cyan(dark,flat,dense)
                    v-toolbar-title Login

                .px-4.py-2
                    v-text-field(label="Email",v-model="email",:rules="[rules.required, rules.email]")
                    br
                    v-text-field(type='password', label="Password",v-model="password",:rules="[rules.required]")
                    br
                    v-btn.cyan(dark,@click='login') Login

</template>


<script>
import AuthenticationService from '../services/AuthenticationService.js'

export default {
    data() {
        return {
            email:'',
            password: '',
            error: null,
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
        async login() {
            try{
                let response = await AuthenticationService.login({
                    email: this.email,
                    password: this.password
                })

                // console.log("登入成功",response)
                if(response.data.email){

                }
                this.$router.push({name: 'songs'})
            }
            catch(e){
                console.log(e)
                this.error = e
            }
            
        }
    }
}
</script>

<style>

</style>
