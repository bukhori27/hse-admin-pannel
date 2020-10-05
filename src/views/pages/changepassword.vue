<template>
  <div class="flex-row">
    <div class="container">
      <b-row>
        <div class="col-sm-6">
          <a @click="backTo" class="nav-link df">
            <i class="nav-icon fas fa-arrow-left fs20 arrow-left"></i>
            <h1>Change Password</h1>
          </a>
        </div>
      </b-row>
      <b-row>
        <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xs-12">
          <div id="pt-pgSignin" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row npr">
            <div id="step1" class="col-md-12 npr">
              <b-input-group>
                <input type="password" v-model="password" class="form-control mb-4" placeholder="Input your password">
              </b-input-group>
              <b-input-group>
                <input type="password" v-model="cPassword" class="form-control mb-4" placeholder="confirm password">
              </b-input-group>
              <div class="m-b-10 m-t-20">
                <b-button button-rounded-border-radius label="Verify" variant="primary" rounded class="float-right" size="14" @click="login" style="color:white; padding: 10px 25px; border-radius:5px;">
                  Simpan
                </b-button>
              </div>
              <div class="col-md-12 row m-b-10 m-t-20 nplr nml" >
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
        password: '',
        cPassword: '',
        token: localStorage.getItem('token_hse')
      }
    },
    methods: {
      backTo () {
        let self = this
        window.history.back();
      },
      login () {
        if(this.password === '' || this.password === null) {
          return alert ('silakan isi password anda')
        }
        if (this.cPassword === '' || this.cPassword === null) {
          return alert ('silakan isi konfirmasi password anda')
        }
        if (this.cPassword !== this.password) {
          return alert ('konfirmasi password anda tidak sama dengan password')
        }
        var self = this
        var parameter = {
          token: self.token,
          password: sha256(this.password)
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'change_password', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            alert('anda berhasil mengganti password')
            self.$router.push('/user')
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      cancel () {
        let self = this
        self.$router.push('/')
      }
    },
    created: function () {
      let params = this.$route.params
      console.log(params)
      console.log(params.index, params.url)
      // this.getIP()
    }
  }
</script>
