<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center nmr nml">
        <div class="col-lg-4 col-md-6 ml-auto mr-auto" style="padding-right: 0px;">
          <div id="pt-pgSignin" class="col-md-12 row register-form">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 tc">
              <!-- <b-img src="static/img/icons/logo.png" alt="Responsive image" style="height:60px; width:70px;"/> -->
              <h1 class="m-b-50">Login</h1> 
            </div>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="nc-icon nc-single-02"></i>
                </span>
              </div>
              <input type="text" v-model="Username" class="form-control" placeholder="username" v-on:keyup.enter="submit">
            </div>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="nc-icon nc-key-25"></i>
                </span>
              </div>
              <input type="password" v-model="Password" class="form-control" placeholder="password" v-on:keyup.enter="submit">
            </div>
            <div class="col-md-12 row m-b-10 m-t-20" style="padding:0">
              <b-button button-rounded-border-radius label="Verify" rounded class="col-md-12" size="14" @click="login" style="background:#f58931; color:white; padding: 10px 0; border-radius:5px; margin-left:15px; margin-right:-15px;">
                Login
              </b-button>
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
    name: 'Index',
    axios,
    components: {  },
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
          // self.$router.push('/dashboard')
          self.token = url.token
          // localStorage.setItem('token_hse', self.token)
        var parameter = {
          username: self.Username,
          password: sha256(self.Password)
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'signin', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.listing = response.data
            localStorage.setItem('token_hse', self.listing.token)
            localStorage.setItem('profile', JSON.stringify(self.listing.profile))
            self.$router.push('/dashboard')
            window.location.reload();
          } else {
            alert('SALAH...!')
          }
        })
      },
      submit () {
        let self = this
        if (!self.Username) return alert('SALAH...!')
        if (!self.Password) return alert('SALAH...!')
        else self.login()
      },
      onLogin() {
        this.isConnected = true
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
