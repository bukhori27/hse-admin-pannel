<template>  
  <div class="container-simple">
    <nav class="navbar navbar-expand-md navbar-absolute fixed-top navbar-transparent m-t-25">
      <div class="container">
        <div class="navbar-wrapper">
          <div class="navbar-toggle">
            <button type="button" class="navbar-toggler">
              <span class="navbar-toggler-bar bar1"></span>
              <span class="navbar-toggler-bar bar2"></span>
              <span class="navbar-toggler-bar bar3"></span>
            </button>
          </div>
          <a class="navbar-brand" href="javascript:;"></a>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navigation">
          <ul class="navbar-nav">
            <li class="nav-item" v-bind:class="classActive === 1 ? 'actived': ''">
              <a @click="goTo('/', 1)" class="nav-link">
                <i class="nc-icon nc-layout-11"></i>
                Dashboard
              </a>
            </li>
            <li class="nav-item " v-bind:class="classActive === 2 ? 'actived': ''">
              <a @click="goTo('/article', 2)" class="nav-link">
                <i class="nc-icon nc-book-bookmark"></i>
                Feeds
              </a>
            </li>
            <li class="nav-item " v-bind:class="classActive === 3 ? 'actived': ''">
              <a @click="goTo('/document', 3)" class="nav-link">
                <i class="nc-icon nc-tap-01"></i>
                Article HSE
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
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
        img: 'static/img/icons/profile.jpeg',
        profil: JSON.parse(localStorage.getItem('profile')),
        name:'',
        classActive: null
      }
    },
    components: {
    },
    methods: {
      chooseFiles: function () {
        let self = this
        self.LoginShow = false
        self.$router.push('/profile')
        window.location.reload()
      },
      goTo (path, id) {
        let self = this
        self.LoginShow = false
        self.classActive = id
        self.$router.push(path)
        console.log(self.classActive)
      },
    },
    created () {
    }
  }
</script>
