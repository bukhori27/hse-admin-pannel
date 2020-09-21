<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
    
    <a href="index3.html" class="brand-link">
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
            <a @click="goTo('/finding')" class="nav-link">
              <i class="nav-icon fas fa-exclamation"></i>
              <p>
                Finding / Issue
              </p>
            </a>
          </li>                
          <li class="nav-item">
            <a class="nav-link" @click="openMenu('a')" v-bind:class="checkMenuA == true ? 'menu-open': '' ">
              <i class="nav-icon fas fa-cog"></i>
              <p>
                Master Data
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
                  <i class="nav-icon fas fa-layer-group"></i>
                  <p>Type</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="openMenu('b')" v-bind:class="checkMenuB == true ? 'menu-open': '' ">
              <i class="nav-icon fas fa-user"></i>
              <p>
                User
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a @click="goTo('/all-user')"class="nav-link">
                  <i class="nav-icon fas fa-users"></i>
                  <p>All User</p>
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/reporter')" class="nav-link">
                  <i class="nav-icon fas fa-camera"></i>
                  <p>Reporter</p>
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/executor')"class="nav-link">
                  <i class="nav-icon fas fa-tools"></i>
                  <p>Executor</p>
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/observer')"class="nav-link">
                  <i class="nav-icon fas fa-search-location"></i>
                  <p>Observer</p>
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/admin')" class="nav-link">
                  <i class="nav-icon fas fa-user-friends"></i>
                  <p>Admin</p>
                </a>
              </li>
              <li class="nav-item">
                <a @click="goTo('/manager')" class="nav-link">
                  <i class="nav-icon fas fa-briefcase"></i>
                  <p>Manager</p>
                </a>
              </li>
            </ul>
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
        menus: [
        ],
        token: localStorage.getItem('token_ppa'),
        profile: JSON.parse(localStorage.getItem('profile')),
        login: false,
        LoginShow: false,
        Username: '',
        Password: '',
        checkMenuA:false,
        checkMenuB:false
      }
    },
    components: {
    },
    methods: {
      openMenu (type) {
        let self = this
        if(type === 'a'){
          if (self.checkMenuA) return self.checkMenuA = false
          return self.checkMenuA = true
        }else {
          if (self.checkMenuB) return self.checkMenuB = false
          return self.checkMenuB = true
        }
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
