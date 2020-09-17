<template>
  <b-container class="bv-example-row" fluid>
    <!-- hidden gradient
      <b-row class="text-center fixed-top">
        <b-col class="bg-list-gradient"></b-col>
      </b-row> 
    -->
    <b-row class="fs15" style="padding: 10px 0">
      <div class="col-md-12">
        <!-- this side menu -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
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
      goTo (path, id) {
        let self = this
        self.LoginShow = false
        self.$router.push(path)
      },
    },
    created () {
    }
  }
</script>
