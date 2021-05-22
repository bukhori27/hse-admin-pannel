<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4 d-none d-md-block">
    
    <a @click="goTo('/dashboard')" class="brand-link">
        <!-- Brand Logo
            <img src="dist/img/AdminLTELogo.png" alt="HSE" class="brand-image img-circle elevation-3" style="opacity: .8">
        -->
      <span class="brand-text font-weight-light">HSE - Admin Panel</span>
    </a>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <a @click="goTo('/dashboard')" class="nav-link">
              <i class="nav-icon fas fa-house-user"></i>
              <p>
                Dashboard
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a @click="goTo('/issue')" class="nav-link">
              <i class="nav-icon fas fa-exclamation"></i>
              <p>
                Issue
              </p>
            </a>
          </li>                
          <li class="nav-item" v-bind:class="checkMenuA" v-if="profil.pengguna_level == 1 || profil.pengguna_level == 2">
            <a class="nav-link" @click="openMenu('a')" >
              <i class="nav-icon fas fa-cog"></i>
              <p>
                Master Data
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a @click="goTo('/list-article')"class="nav-link">
                  <i class="nav-icon fas fa-clipboard-list"></i>
                  <p>Article</p>
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/list-document')"class="nav-link">
                  <i class="nav-icon fas fa-clipboard-list"></i>
                  <p>Document</p>
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/list-form')"class="nav-link">
                  <i class="nav-icon fas fa-clipboard-list"></i>
                  <p>Form</p>
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/category')"class="nav-link">
                  <i class="nav-icon fas fa-clipboard-list"></i>
                  <p>Category</p>
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/location')" class="nav-link">
                  <i class="nav-icon fas fa-map-marked-alt"></i>
                  <p>Location</p>
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/type')"class="nav-link">
                  <i class="nav-icon fas fa-layer-group"></i>
                  <p>Type</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item" v-bind:class="checkMenuB" v-if="profil.pengguna_level == 1 || profil.pengguna_level == 2">
            <a class="nav-link" @click="openMenu('b')">
              <i class="nav-icon fas fa-user"></i>
              <p>
                User
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a @click="goTo('/user/all')"class="nav-link">
                  <i class="nav-icon fas fa-users"></i>
                  <p>All User</p>
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/user/reporter')" class="nav-link">
                  <i class="nav-icon fas fa-camera"></i>
                  <p>Reporter</p>
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/user/executor')"class="nav-link">
                  <i class="nav-icon fas fa-tools"></i>
                  <p>Executor</p>
                </a>
              </li>
              <!--
              <li class="nav-item">
                <a @click="goTo('/user/observer')"class="nav-link">
                  <i class="nav-icon fas fa-search-location"></i>
                  <p>Observer</p>
                </a>
              </li>
              -->
              <li class="nav-item">
                <a @click="goTo('/user/admin')" class="nav-link">
                  <i class="nav-icon fas fa-user-friends"></i>
                  <p>Admin</p>
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/user/manager')" class="nav-link">
                  <i class="nav-icon fas fa-briefcase"></i>
                  <p>Manager</p>
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/user/picarea')" class="nav-link">
                  <i class="nav-icon fas fa-briefcase"></i>
                  <p>PIC Area</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item" v-if="profil.pengguna_level == 4">
            <a @click="goTo('/user/executor')"class="nav-link">
              <i class="nav-icon fas fa-user"></i>
              <p>Staff</p>
            </a>
          </li>
          <li class="nav-item">
            <a @click="goTo('/form')"class="nav-link">
              <i class="nav-icon fas fa-user"></i>
              <p>Form</p>
            </a>
          </li>
          <!-- Hidden Menu Profile
          <li class="nav-item">
            <a @click="goTo('/profile')" class="nav-link">
              <i class="nav-icon fas fa-user-circle"></i>
              <p>
                Profile
              </p>
            </a>
          </li>  

          <li class="nav-item fixed-bottom-menu-logout">
            <a @click="logout" class="nav-link">
              <i class="nav-icon fas fa-sign-out-alt"></i>
              <p>
                Logout
              </p>
            </a>
          </li>  
          -->
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
  import axios from 'axios'
  import { url } from '../../url'

  import sha256 from 'sha256'
  export default {
    name: 'Menu_',  
    axios,
    data (){
      return {
        nama_lengkap: sessionStorage.getItem('fullname'),
        profil: JSON.parse(localStorage.getItem('profile')),
        menus: [
        ],
        token: localStorage.getItem('token_ppa'),
        login: false,
        LoginShow: false,
        Username: '',
        Password: '',
        checkMenuA: '',
        checkMenuB: ''
      }
    },
    components: {
    },
    methods: {
      openMenu (type) {
        let self = this
        if(type === 'a'){
          if (self.checkMenuA) return self.checkMenuA = ''
          return self.checkMenuA = 'menu-open'
        }else {
          if (self.checkMenuB) return self.checkMenuB = ''
          return self.checkMenuB = 'menu-open'
        }
      },
      goTo (path, id) {
        let self = this
        self.LoginShow = false
        var body = document.body;
        body.classList.add("sidebar-collapse");
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
      let self = this
      if (self.profil.pengguna_level != 1 && self.profil.pengguna_level != 2 && self.profil.pengguna_level != 4){
        var body = document.body;
        body.classList.add("sidebar-collapse");
      }else{
        var body = document.body;
        body.classList.remove("sidebar-collapse");
      }
    }
  }
</script>
