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
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
          <ul class="navbar-nav" v-if="profil.pengguna_level == 1 || profil.pengguna_level == 2 || profil.pengguna_level == 4">
            <li class="nav-item">
              <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
          </ul>
          <ul v-else><span class="brand-text font-weight-light" @click="goTo('/dashboard')">HSE - Admin Panel</span></ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown user-menu">
              <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
                <i class="fas fa-user-circle fa-2x"></i>
                <!-- <i class="fas fa-angle-down fa-2x right"></i> -->
              </a>
              <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <li role="presentation" class="m-t-10"><a @click="goTo('/profile')"><i class="icon-user"></i>Profile</a></li>
                <li role="presentation"><a @click="logout"><i class="icon-logout m-r-xs"></i>Logout</a></li>
              </ul>
            </li>
          </ul>
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
    name: 'header_',  
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
