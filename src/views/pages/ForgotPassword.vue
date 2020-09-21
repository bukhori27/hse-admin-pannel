<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <div class="col-md-8 col-sm-12 col-lg-6 col-xl-6 col-xs-11">
          <div id="pt-pgSignin" class="col-md-12 row register-form">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"><h1 class="tc m-b-50">Forgot Password</h1> </div>
            <b-input-group>
              <input type="password" v-model="Password" class="form-control mb-4" placeholder="password">
            </b-input-group>
            <b-input-group>
              <input type="password" v-model="cPassword" class="form-control mb-4" placeholder="confirm password">
            </b-input-group>
            <div class="col-md-12 row m-b-10" style="padding:0">
              <b-button button-rounded-border-radius label="Verify" rounded class="col-md-12" size="14" @click="submit" style="background:#6cbf16; color:white; padding: 15px 0 15px 20px; border-radius:5px; margin-left:15px; margin-right:-15px;">
                submit
              </b-button>
            </div>
            <div class="col-md-12 m-t-10 fs12" style="display: inline ">
              <div class=" tc"> Already have an Account?
                <span @click="$router.push('/')" style="font-weight:900;"> Login</span>
              </div>
            </div>
          </div>
        </div>
      </b-row>
    </div>
  </div>
</template>
<style>
.mt20 {
  margin-top:20px;
}

</style>
<script>
  import axios from 'axios'
  import { url } from '../../url'
  import sha256 from 'sha256'

  export default {
    name: 'ForgotPassword',
    axios,
    data () {
      return {
        cPassword: '',
        Password: '',
        checked: false,
        listing: {},
        temp_token: ''
      }
    },
    methods: {
      submit () {
        var self = this
        console.log(self.cPassword)
        console.log(self.Password)
        if (this.Password === null || this.Password === '' || this.Password === undefined ) {
          return alert('insert your password')
        }
        if (this.cPassword === null || this.cPassword === '' || this.cPassword === undefined ) {
          return alert('insert your password')
        }
        if (this.cPassword != this.Password ) {
          return alert('confirmasi password not same with password')
        }
        var parameter = {
          temp_token: self.temp_token,
          password: sha256(self.Password)
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'change_password1', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.$router.push('/login')
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      getIP () {
        console.log(location.hostname)
      }
    },
    created: function () {
      this.temp_token = this.$route.params.id
    }
  }
</script>
