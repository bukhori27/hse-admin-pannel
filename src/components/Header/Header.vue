<template>
  <b-container class="bv-example-row" fluid>
    <b-row class="text-center fixed-top">
      <b-col class="bg-list-gradient"></b-col>
    </b-row>
    <b-row class="fs15" style="padding: 10px 0">
      <div class="col-md-12">
        <b-navbar toggleable="md" fixed="top">
          <b-navbar-brand @click="$router.push('/')">
            <b-img src="static/img/logo/logo.png" fluid alt="Responsive image" style="height:60px;" class="logoHome"/>
          </b-navbar-brand>
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class="ml-auto">
              <b-nav-item v-if="login === true && profile.pengguna_level != '5' " @click="goTo('/lembaga-masyarakat')" class="menu-text" style="color: #4a4a4a; font-weight: 600;">Lembaga Masyarakat</b-nav-item>
              <b-nav-item v-if="login === false" @click="goTo('/lembaga-masyarakat')" class="menu-text" style="color: #4a4a4a; font-weight: 600;">Lembaga Masyarakat</b-nav-item>
              <b-nav-item @click="goTo('/forum')" v-if="login === false" class="menu-text" style="color: #4a4a4a; font-weight: 600;">Forum</b-nav-item>
              <b-nav-item @click="goTo('/forum')" v-if="login === true && profile.pengguna_level === '4'" class="menu-text" style="color: #4a4a4a; font-weight: 600;">Forum</b-nav-item>
              <b-nav-item-dropdown right text="forum" class="dropdown-menu-kami" v-if="login === true && (profile.pengguna_level === '1' || profile.pengguna_level === '3')" style="text-transform:capitalize; font-weight: 600;"> 
                <b-dropdown-item @click="$router.push('/create-forum')">Create Forum</b-dropdown-item>
                <b-dropdown-item @click="$router.push('/forum')">forum</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item @click="goTo('/berita')" v-if="login === false" class="menu-text" style="color: #4a4a4a; font-weight: 600;">Berita</b-nav-item>
              <b-nav-item-dropdown right text="berita" class="dropdown-menu-kami" v-if="login === true && profile.pengguna_level != '5'"style="text-transform:capitalize; font-weight: 600;"> 
                <b-dropdown-item @click="$router.push('/create-berita')">Create Berita</b-dropdown-item>
                <b-dropdown-item @click="$router.push('/berita')">Berita</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item @click="goTo('/e-doc')" v-if="login === false" class="menu-text" style="color: #4a4a4a; font-weight: 600;">E-doc</b-nav-item>
              <b-nav-item-dropdown right text="e-doc" class="dropdown-menu-kami" v-if="login === true && profile.pengguna_level != '5'" style="text-transform:capitalize; font-weight: 600;"> 
                <b-dropdown-item @click="$router.push('/create-e-doc')">Create E-doc</b-dropdown-item>
                <b-dropdown-item @click="$router.push('/e-doc')">E-doc</b-dropdown-item>
              </b-nav-item-dropdown>

              <b-nav-item-dropdown right text="Setting" v-if="login === true && (profile.pengguna_level === '1' || profile.pengguna_level === '3')" class="menu-text" style="color: #4a4a4a;font-weight: 600;">
                <b-dropdown-item @click="$router.push('/create-admin')" v-if="profile.pengguna_level === '1'">Create Admin</b-dropdown-item>
                <b-dropdown-item @click="$router.push('/list-berita')" v-if="profile.pengguna_level === '1' ">List Berita</b-dropdown-item>
                <b-dropdown-item @click="$router.push('/list-LM')" v-if="profile.pengguna_level === '1'">List LM</b-dropdown-item>
                <b-dropdown-item @click="$router.push('/list-admin')" v-if="profile.pengguna_level === '1'">List Admin</b-dropdown-item>
                <b-dropdown-item @click="$router.push('/list-thread')" v-if="profile.pengguna_level === '1'">List Thread</b-dropdown-item>
                <b-dropdown-item @click="$router.push('/list-quote')" v-if="profile.pengguna_level === '1'">List Quote</b-dropdown-item>
                <b-dropdown-item @click="$router.push('/list-e-doc')" v-if="profile.pengguna_level === '1'">List E-Doc</b-dropdown-item>
                <b-dropdown-item @click="$router.push('/approval-user')">Approval User</b-dropdown-item>
                <b-dropdown-item @click="$router.push('/approval-berita')">Approval Berita</b-dropdown-item>
              </b-nav-item-dropdown>
              <!-- <b-nav-item @click="goTo('/inovasi')" v-if="login === false" class="menu-text" style="color: #4a4a4a; font-weight: 600;">Register Inovasi</b-nav-item> -->
              <b-nav-item @click="goTo('/user-inovasi')" v-if="login === true && (profile.pengguna_level === '1' || profile.pengguna_level === '5')" class="menu-text" style="color: #4a4a4a; font-weight: 600;">user Inovasi</b-nav-item>
              <div v-if="login === false"> 
                <b-button button-rounded-border-radius label="Verify" rounded class="full-width btn-login-menu" size="14"  @click="loginShow()" style="font-weight: 600;">
                  Login 
                </b-button>
                <b-button button-rounded-border-radius label="Verify" rounded class="full-width btn-register-menu" size="14" @click="goTo('/register')" style="font-weight: 600;">
                  Register
                </b-button> 
              </div>
              <b-nav-item-dropdown right :text="profile.pengguna_nama" class="dropdown-menu-kami" v-else style="text-transform:capitalize; font-weight: 600;"> 
                <b-dropdown-item @click="$router.push('/user')">profile</b-dropdown-item>
                <b-dropdown-item @click="logout">logout</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>

        <b-navbar toggleable="md" fixed="top"  v-if="LoginShow === true" style="margin-top:80px;">
          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class="ml-auto"> 
              <b-input-group style=" margin-top:5px;">
                <input type="text" v-model="Username" class="form-control mb-4" placeholder="username">
              </b-input-group>
              <b-input-group style="padding: 0 20px; margin-top:5px;">
                <input type="password" v-model="Password" class="form-control mb-4" placeholder="password">
              </b-input-group>
              <b-button button-rounded-border-radius label="Verify" rounded class="full-width btn-login-menu" size="14" @click="logins" style="padding:10px 20px; height:45px;">
                Submit
              </b-button>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        <b-navbar toggleable="md" fixed="top"  v-if="LoginShow === true" style="margin-top:140px;">
          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class="ml-auto"> 
              <b-nav-item @click="goTo('/reset-password')" class="menu-text" style="color: #4a4a4a; margin-right:20px;"> forgot password ?  </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
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
      SubmitLogin () {
        var self = this
        axios.post(url + 'user_login', {
          token: token
        }).then(function (response) {
          if (response.data.resultCode === 'OK') {

          } else {
            alert('SALAH...!')
          }
        })
      },
      loginShow () {
        var self = this
        if(self.LoginShow === true) {
          self.LoginShow = false;
        }else {
          self.LoginShow = true;
        }
      },
      SubmitRegister () {
        var self = this
        axios.post(url + 'user_register', {
          token: token
        }).then(function (response) {
          if (response.data.resultCode === 'OK') {

          } else {
            alert('SALAH...!')
          }
        })
      },
      logout (e) {
        var self = this
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
        })
      },
      logins () {
        var self = this
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
            localStorage.setItem('token_ppa', self.listing.token)
            localStorage.setItem('profile', JSON.stringify(self.listing.profile))
            self.$router.push('/user')
            self.profile = self.listing.profile
            self.login = true
            self.LoginShow = false;
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      index () {
        if (this.token !== null) {
          this.login = true
        } else {
          this.login = false
        }
      }
    },
    created () {
      this.index()
    }
  }
</script>
