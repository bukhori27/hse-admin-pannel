<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
    
    <a href="index3.html" class="brand-link">
        <!-- Brand Logo
            <img src="dist/img/AdminLTELogo.png" alt="HSE" class="brand-image img-circle elevation-3" style="opacity: .8">
        -->
      <span class="brand-text font-weight-light">HSE</span>
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
            <a @click="goTo('/finding')" class="nav-link">
              <i class="nav-icon fas fa-exclamation"></i>
              <p>
                Finding / Issue
              </p>
            </a>
          </li>                
          <li class="nav-item">
            <a class="nav-link" @click="openMenu" v-bind:class="checkMenu == true ? 'menu-open': '' ">
              <i class="nav-icon fas fa-cog"></i>
              <p>
                CMS
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
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
                  <i class="nav-icon fas fa-briefcase"></i>
                  <p>Type</p>
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/user')" class="nav-link">
                  <i class="nav-icon fas fa-user"></i>
                  <p>User</p>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a @click="goTo('/profile')" class="nav-link">
              <i class="nav-icon fas fa-user-circle"></i>
              <p>
                Profile
              </p>
            </a>
          </li>  

          <li class="nav-item">
            <a @click="logout" class="nav-link">
              <i class="nav-icon fas fa-sign-out-alt"></i>
              <p>
                Logout
              </p>
            </a>
          </li>  
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
        menus: [
        ],
        token: localStorage.getItem('token_ppa'),
        profile: JSON.parse(localStorage.getItem('profile')),
        login: false,
        LoginShow: false,
        Username: '',
        Password: '',
        checkMenu:false
      }
    },
    components: {
    },
    methods: {
      openMenu () {
        let self = this
        if (self.checkMenu) return self.checkMenu = false
        return self.checkMenu = true
      },
      goTo (path, id) {
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
