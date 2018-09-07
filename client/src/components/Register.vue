<template lang='pug'>
    v-layout(justify-center,mt-4)
        v-flex(xs12,md6)
            Panel(title='Register')
                v-text-field(label="Email",v-model="email",:rules="[rules.required, rules.email]")
                br
                v-text-field(type='password', label="password",v-model="password",:rules="[rules.required]")
                br
                v-btn(dark, @click='register').cyan Register
                v-alert(v-if='error',:value='true',type="error") {{error}}

</template>


<script>
import AuthenticationService from '../services/AuthenticationService.js'

export default {
    data() {
        return {
            email: '',
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
        async register() {
            // 如果email password為空白，就不請求
            if(this.email !=='' && this.password !== ''){
                try{
                    let response = await AuthenticationService.register({
                        email: this.email,
                        password: this.password
                    })
                    // console.log(response)
                    this.$store.dispatch('setToken',response.data.token)
                    this.$router.push({name: 'songs'})
                }catch(error){
                    console.log(error)
                    if(error){
                        this.error = 'you must provide a valid email or password , password at least must be 6 charactors'
                    }
                }
            }else{
                this.error='請勿空白'
            }

            
            
        }
    }
}
</script>

<style>
</style>
