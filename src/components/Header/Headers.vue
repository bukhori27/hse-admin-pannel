<template>
  <b-container class="bv-example-row" fluid>
    <!-- hidden gradient
      <b-row class="text-center fixed-top">
        <b-col class="bg-list-gradient"></b-col>
      </b-row> 
    -->
    <b-row class="fs15" style="padding: 0">
      <div class="col-md-12 npr npl">
        <!-- this side menu -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-ib d-none d-sm-flex">
          <a class="navbar-brand" @click="$router.push('/')">HSE Platform</a>
          <div class="navbar-collapse navbar-ib-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" @click="$router.push('/article')"">News</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="$router.push('/document')"">Document HSE</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="$router.push('/signin')"">Login</a>
              </li>
            </ul>
          </div>
        </nav>
        <nav class="navbar navbar-expand-lg navbar-light bg-light d-sm-none">
          <a class="navbar-brand" @click="$router.push('/')">HSE Platform</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" @click="$router.push('/article')"">News</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="$router.push('/document')"">Document HSE</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="$router.push('/signin')"">Login</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </b-row>
  </b-container>
</template>
<script>
  import axios from 'axios'
  import { url } from '../../url'

  import sha256 from 'sha256'
  export default {
    name: 'headers_',  
    axios,
    data (){
      return {
        nama_lengkap: sessionStorage.getItem('fullname'),
        profil: JSON.parse(localStorage.getItem('profile')),
        menus: [
          {
            path: '/lembaga-masyarakat',
            label: 'Lembaga Masyarakat',
          },
          {
            path: '/forum',
            label: 'Forum PUSPA'
          },
          {
            path: '/berita',
            label: 'Berita'
          }
        ],
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
