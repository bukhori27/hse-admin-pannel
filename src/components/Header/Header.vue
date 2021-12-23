<template>
  <div class="sidebar ps" data-color="default" data-active-color="danger">
      <div class="logo">
        <a href="https://www.creative-tim.com" class="simple-text logo-mini">
          <div class="logo-image-small">
            <img src="static/img/logo-small.png">
          </div>
          <!-- <p>CT</p> -->
        </a>
        <a href="https://www.creative-tim.com" class="simple-text logo-normal">
          Safety Patrol
        </a>
      </div>
      <div class="sidebar-wrapper ps ps--active-x">
        <ul class="nav">
          <li v-bind:class="classActive === 1 ? 'actived': ''">
            <a @click="goTo('/dashboard', 1)">
              <i class="nc-icon nc-bank"></i>
              <p>Dashboard</p>
            </a>
          </li>
          <li v-bind:class="classActive === 2 ? 'actived': ''">
            <a data-toggle="collapse" href="#pagesExamples">
              <i class="nc-icon nc-book-bookmark"></i>
              <p>
                User <b class="caret"></b>
              </p>
            </a>
            <div class="collapse " id="pagesExamples">
              <ul class="nav">
                <li>
                  <a @click="goTo('/user/all', 2)">
                    <span class="sidebar-mini-icon">U</span>
                    <span class="sidebar-normal"> All User </span>
                  </a>
                </li>
                <li>
                  <a @click="goTo('/user/reporter', 2)">
                    <span class="sidebar-mini-icon">R</span>
                    <span class="sidebar-normal"> Reporter </span>
                  </a>
                </li>
                <li>
                  <a @click="goTo('/user/executor', 2)">
                    <span class="sidebar-mini-icon">E</span>
                    <span class="sidebar-normal"> Executor </span>
                  </a>
                </li>
                <li>
                  <a @click="goTo('/user/admin', 2)">
                    <span class="sidebar-mini-icon">LS</span>
                    <span class="sidebar-normal"> Admin </span>
                  </a>
                </li>
                <li>
                  <a @click="goTo('/user/manager', 2)">
                    <span class="sidebar-mini-icon">M</span>
                    <span class="sidebar-normal">Manager </span>
                  </a>
                </li>
                <li>
                  <a @click="goTo('/user/picarea', 2)">
                    <span class="sidebar-mini-icon">PA</span>
                    <span class="sidebar-normal">PIC Area </span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li v-bind:class="classActive === 3 ? 'actived': ''">
            <a data-toggle="collapse" href="#MasterData">
              <i class="nc-icon nc-book-bookmark"></i>
              <p>
                Master Data <b class="caret"></b>
              </p>
            </a>
            <div class="collapse " id="MasterData">
              <ul class="nav">
                <li>
                  <a @click="goTo('/list-article', 3)">
                    <span class="sidebar-mini-icon">A</span>
                    <span class="sidebar-normal">Article</span>
                  </a>
                </li>
                <li>
                  <a @click="goTo('/category', 3)">
                    <span class="sidebar-mini-icon">C</span>
                    <span class="sidebar-normal">Category</span>
                  </a>
                </li>
                <li>
                  <a @click="goTo('/location', 3)">
                    <span class="sidebar-mini-icon">L</span>
                    <span class="sidebar-normal">Location</span>
                  </a>
                </li>
                <li>
                  <a @click="goTo('/type', 3)">
                    <span class="sidebar-mini-icon">T</span>
                    <span class="sidebar-normal">Type</span>
                  </a>
                </li>
                <li>
                  <a @click="goTo('/list-form', 3)">
                    <span class="sidebar-mini-icon">F</span>
                    <span class="sidebar-normal">Form</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li v-bind:class="classActive === 4 ? 'actived': ''">
            <a @click="goTo('/issue', 4)">
              <i class="nc-icon nc-chart-bar-32"></i>
              <p>Finding</p>
            </a>
          </li>
          <li v-bind:class="classActive === 5 ? 'actived': ''">
            <a @click="goTo('/list-activity-form', 5)">
              <i class="nc-icon nc-calendar-60"></i>
              <p>Activity</p>
            </a>
          </li>
        </ul>
      <div class="ps__rail-x" style="width: 260px; left: 0px; bottom: 0px;"><div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 244px;"></div></div><div class="ps__rail-y" style="top: 0px; right: 0px;"><div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div></div></div>
    <div class="ps__rail-x" style="left: 0px; bottom: 0px;"><div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div class="ps__rail-y" style="top: 0px; right: 0px;"><div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div></div></div>
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
        classActive: false
      }
    },
    components: {
    },
    methods: {
      goTo (path, id) {
        let self = this
        var body = document.body;
        self.$router.push(path)
        self.classActive = id
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
