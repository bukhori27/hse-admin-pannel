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
        <nav class="main-header navbar navbar-expand navbar-white navbar-light i-md-flex">
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
        <nav class="navbar navbar-white navbar-light nplr d-block d-md-none">
          <ul class="navbar-nav pl-15">
            <li class="nav-item">
              <a class="nav-link" data-toggle="collapse" data-target="#navbarsExample01" role="button"><i class="fas fa-bars"></i></a>
            </li>
          </ul>
          <div class="navbar-collapse navbar-dark-primary collapse col-md-12" id="navbarsExample01" style="">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a @click="goTo('/dashboard')" class="nav-link">
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/issue')" class="nav-link">Issue</a>
              </li>
              <li class="nav-item dropdown" v-if="profil.pengguna_level == 1 || profil.pengguna_level == 2">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" id="dropdown01" aria-haspopup="true" aria-expanded="false">Master Data</a>
                <div class="dropdown-menu" aria-labelledby="dropdown01">
                  <a class="dropdown-item" @click="goTo('/list-article')">List Article</a>
                  <a class="dropdown-item" @click="goTo('/list-form')">List Form</a>
                  <a class="dropdown-item" @click="goTo('/list-document')">List Document</a>
                  <a class="dropdown-item" @click="goTo('/category')">Category</a>
                  <a class="dropdown-item" @click="goTo('/location')">Location</a>
                  <a class="dropdown-item" @click="goTo('/type')">Type</a>
                </div>
              </li>
              <li class="nav-item dropdown" v-if="profil.pengguna_level == 1 || profil.pengguna_level == 2">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" id="dropdown02" aria-haspopup="true" aria-expanded="false">User</a>
                <div class="dropdown-menu" aria-labelledby="dropdown02">
                  <a class="dropdown-item" @click="goTo('/user/all')">All User</a>
                  <a class="dropdown-item" @click="goTo('/user/reporter')">Reporter</a>
                  <a class="dropdown-item" @click="goTo('/user/executor')">Executor</a>
                  <a class="dropdown-item" @click="goTo('/user/admin')">Admin</a>
                  <a class="dropdown-item" @click="goTo('/user/manager')">Manager</a>
                  <a class="dropdown-item" @click="goTo('/user/picarea')">PIC Area</a>
                </div>
              </li>
              <li class="nav-item" v-if="profil.pengguna_level == 4">
                <a @click="goTo('/user/executor')" class="nav-link">Staff</a>
              </li>
              <li class="nav-item m-t-10"><a @click="goTo('/form')" class="nav-link">Form</a></li>
              <li class="nav-item m-t-10"><a @click="goTo('/profile')" class="nav-link">Profile</a></li>
              <li class="nav-item"><a @click="logout"  class="nav-link">Logout</a></li>
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
