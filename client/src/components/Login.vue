<template lang='pug'>
    v-layout(justify-center,mt-4)
        v-flex(xs12,md6)
            Panel(title='Login')
                v-text-field(label="Email",v-model="email",:rules="[rules.required, rules.email]")
                br
                v-text-field(type='password', label="Password",v-model="password",:rules="[rules.required]")
                br
                v-btn.cyan(dark,@click='login') Login

                v-alert(v-if='error',:value='true',type="error") {{error}}

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
            if(this.email !=='' && this.password !== ''){
                try{
                    let response = await AuthenticationService.login({
                        email: this.email,
                        password: this.password
                    })
                    console.log(response.data.token)
                    this.$store.dispatch('setToken',response.data.token)
                    this.$router.push({name: 'songs'})
                    
                    
                }
                catch(err){
                    console.log(err)
                    if(err){
                        this.error = 'you must provide a valid email,password format' 
                    }
                
                }
            }else{
                this.error = '請勿空白'
            }
        }
    }
}
</script>

<style>

</style>
