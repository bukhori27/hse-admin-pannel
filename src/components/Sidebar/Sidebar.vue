<template>
    <nav class="navbar navbar-absolute fixed-top navbar-transparent">
      <div class="container-fluid">
        <div class="navbar-wrapper">
          <div class="navbar-minimize">
            <button id="minimizeSidebar" class="btn btn-icon btn-round">
              <i class="nc-icon nc-minimal-right text-center visible-on-sidebar-mini"></i>
              <i class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"></i>
            </button>
          </div>
          <div class="navbar-toggle">
            <button type="button" class="navbar-toggler">
              <span class="navbar-toggler-bar bar1"></span>
              <span class="navbar-toggler-bar bar2"></span>
              <span class="navbar-toggler-bar bar3"></span>
            </button>
          </div>
          <a class="navbar-brand" href="javascript:;">Dashboard Safety Patrol</a>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navigation">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link btn-rotate" href="javascript:;">
                <i class="nc-icon nc-settings-gear-65"></i>
                <p>
                  <span class="d-lg-none d-md-block">Account</span>
                </p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>
<script>
  import axios from 'axios'
  import { url } from '../../url'

  import sha256 from 'sha256'
  export default {
    name: 'header_',  
    axios,
    data (){
      return {
        nama_lengkap: sessionStorage.getItem('fullname'),
        profil: JSON.parse(localStorage.getItem('profile')),
        token: localStorage.getItem('token_ppa'),
        profile: JSON.parse(localStorage.getItem('profile')),
        login: false,
        LoginShow: false,
        Username: '',
        Password: ''
      }
    },
    components: {
    },
    methods: {
      goTo (path) {
        let self = this
        self.LoginShow = false
        var body = document.body;
        body.classList.add("sidebar-collapse");
        var element = document.getElementById("navbarsExample01");
        element.classList.remove("show");
        self.$router.push(path)
      },
      logout (e) {
        var self = this
          self.$router.push('/')
        /* 
        var parameter = {
          token: self.token,
          //passwor : sha256(self.Password)
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'signout', parameter, config).then(function (response) {
          if (response.data.resultCode === 'OK') {
            localStorage.removeItem('profile')
            localStorage.removeItem('token_ppa')
            self.login = false
            self.$router.push('/')
          } else {
            alert('SALAH...!')
          }
        }) */
      },
    },
    created () {
    }
  }
</script>