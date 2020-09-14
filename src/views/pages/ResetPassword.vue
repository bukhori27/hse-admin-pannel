<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <div class="col-md-8 col-sm-12 col-lg-6 col-xl-6 col-xs-11">
          <div id="pt-pgSignin" class="col-md-12 row register-form">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h1 class="tc">Reset Your Password</h1> 
            </div>
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 m-b-50 tc">
              <span> It is often forgotten that passwor thing. Enter your email address bellow and click on the "Request Password Reset" button. we will contact you. shortly ! </span>
            </div>
            <b-input-group>
              <input type="text" v-model="email" class="form-control mb-4" placeholder="Input Email">
            </b-input-group>
            <div class="col-md-12 row m-b-10" style="padding:0">
              <b-button button-rounded-border-radius label="Verify" rounded class="col-md-12" size="14" @click="login" style="background:#6cbf16; color:white; padding: 15px 0 15px 20px; border-radius:5px; margin-left:15px; margin-right:-15px;">
                Request Password Reset
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
    name: 'ResetPassword',
    axios,
    data () {
      return {
        email: '',
        checked: false,
        listing: {}
      }
    },
    methods: {
      login () {
        var self = this
        var parameter = {
          email: self.email
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'requestforgot_password', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            // self.$router.push('/login')
          } else {
            alert('SALAH...!')
          }
        }) 
      }
    },
    created: function () {
      // this.getIP()
    }
  }
</script>
