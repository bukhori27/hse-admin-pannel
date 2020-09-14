<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <div class="col-md-8 col-sm-12 col-lg-6 col-xl-6 col-xs-11" style="padding-right: 0px;">
          <div id="pt-pgSignin" class="col-md-12 row register-form">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 tc">
              <b-img src="static/img/icons/logo.png" alt="Responsive image" style="height:60px; width:70px;"/>
              <h1 class="m-b-50">Login</h1> 
            </div>
            <b-input-group>
              <input type="text" v-model="Username" class="form-control mb-4" placeholder="username">
            </b-input-group>
            <b-input-group>
              <input type="password" v-model="Password" class="form-control mb-4" placeholder="password">
            </b-input-group>
            <div class="col-md-12 fs12 m-b-20" style="padding:0; display: inline; margin-top:-20px; ">
              <div class="tar" @click="$router.push('/reset-password')"> forgot password ?  </div>
            </div>
            <div class="col-md-12 row m-b-10" style="padding:0">
              <b-button button-rounded-border-radius label="Verify" rounded class="col-md-12" size="14" @click="login" style="background:#6cbf16; color:white; padding: 20px 0 20px 20px; border-radius:5px; margin-left:15px; margin-right:-15px;">
                Login
              </b-button>
            </div>
            <facebook-login class="button tc"
              appId="1725974574179231"
              @login="getUserData"
              @logout="onLogout"
              @get-initial-status="getUserData" style="background:#3b66b8; color:white; padding: 10px 0; border-radius:5px;">
            </facebook-login>
            <!-- <div class="col-md-12 row" style="padding:0">
              <b-button button-rounded-border-radius label="Verify" rounded class="col-md-12" size="14"  @click="loginf" style="background:#3b66b8; color:white; padding: 20px 0 20px 20px; border-radius:5px; margin-left:15px; margin-right:-15px;">
               <i class="fa fa-facebook fs24" style="padding-right:10px;"></i>  Login With Facebook
              </b-button>
            </div> -->
            <div class="col-md-12 m-t-10 fs12" style="display: inline ">
              <div class=" tc"> Don't have Account? 
                <span @click="$router.push('/register')" style="font-weight:900;"> Register</span>
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
  import facebookLogin from 'facebook-login-vuejs';

  export default {
    name: 'Login',
    axios,
    components: { facebookLogin },
    data () {
      return {
        Username: '',
        Password: '',
        checked: false,
        listing: {}
      }
    },
    methods: {
      login () {
        var self = this
        console.log(self.Username)
        console.log(self.Password)
        var parameter = {
          username: self.Username,
          password: sha256(self.Password)
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        // axios.post(url + 'signin.php', {
        axios.post(url.url_app + 'signin', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.listing = response.data
            localStorage.setItem('token_rise', self.listing.token)
            localStorage.setItem('profile', JSON.stringify(self.listing.profile))
            self.$router.push('/user')
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      getUserData(response) {
        FB.api('/me?fields=id,name, email', userInformation => {
          console.log(userInformation)
          var parameter = {
            username: userInformation.name,
            email: userInformation.email
          }
          console.log(userInformation)
          var config = { 
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
          axios.post(url.url_app + 'signin_facebook', parameter, config).then(function (response) {
            if (response.data.resultCode == 'OK') {
              self.listing = response.data;
              localStorage.setItem('token_rise', self.listing.token)
              localStorage.setItem('profile', JSON.stringify(self.listing.profile))
              self.$router.push('/user')
            } else {
              alert('SALAH...!')
            }
          }) 
        })
      },
      sdkLoaded(payload) {
        this.isConnected = payload.isConnected
        this.FB = payload.FB
        if (this.isConnected) this.getUserData()
      },
      onLogin() {
        this.isConnected = true
        this.getUserData()
      },
      onLogout() {
        this.isConnected = false;
      },
      getIP () {
        console.log(location.hostname)
      }
    },
    created: function () {
      // this.getIP()
    }
  }
</script>
