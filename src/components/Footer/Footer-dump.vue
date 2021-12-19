<template>
    <nav class="navbar navbar-default navbar-fixed-bottom main-footer">
      <div class="container" style="text-align:center" v-if="privilage == 1 || privilage == 2">
        <div class="col-xs-2 col-sm-2 col-md-2 nplr fs20" @click="goTo('/dashboard')" v-bind:class="classActive ==='/dashboard' ? 'active': ''">
          <div class="col-xs-12" >
            <i class="fa fa-home"></i>
          </div>
          <div class="col-xs-12">
            Home
          </div> 
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2 nplr fs20" @click="goTo('/menu')" v-bind:class="classActive ==='/menu' ? 'active': ''">
          <div class="col-xs-12" >
            <i class="fa fa-cog"></i>
          </div>
          <div class="col-xs-12">
            Tools
          </div> 
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2 nplr fs20" @click="goTo('/issue')" v-bind:class="classActive ==='/issue' ? 'active': ''">
          <div class="col-xs-12" >
            <i class="fas fa-bell"></i>
          </div>
          <div class="col-xs-12">
            Ticket
          </div> 
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2 nplr fs20"  @click="goTo('/document')" v-bind:class="classActive ==='/document' ? 'active': ''">
          <div class="col-xs-12" >
            <i class="fa fa-newspaper-o"></i>
          </div>
          <div class="col-xs-12">
            Feeds
          </div> 
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2 nplr fs20" @click="goTo('/profile')" v-bind:class="classActive ==='/profile' ? 'active': ''">
          <div class="col-xs-12" >
            <i class="fa fa-user"></i>
          </div>
          <div class="col-xs-12">
            Profile
          </div> 
        </div>
      </div>
      <div class="container" style="text-align:center" v-else>
        <div class="col-xs-2 col-sm-2 col-md-2 nplr fs20" @click="goTo('/dashboard')" v-bind:class="classActive ==='/dashboard' ? 'active': ''">
          <div class="col-xs-12" >
            <i class="fa fa-home"></i>
          </div>
          <div class="col-xs-12">
            Home
          </div> 
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2 nplr fs20"  @click="goTo('/document')" v-bind:class="classActive ==='/document' ? 'active': ''">
          <div class="col-xs-12" >
            <i class="fa fa-newspaper-o"></i>
          </div>
          <div class="col-xs-12">
            Feeds
          </div> 
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2 nplr fs20" @click="goTo('/profile')" v-bind:class="classActive ==='/profile' ? 'active': ''">
          <div class="col-xs-12" >
            <i class="fa fa-user"></i>
          </div>
          <div class="col-xs-12">
            Profile
          </div> 
        </div>
      </div>
    </nav>
</template>
<script>
import axios from 'axios'
import { url } from '../../url'
export default {
  	name: 'Footer',
    axios,
    data ()	{
      return {
        classActive: null,
        profil: JSON.parse(localStorage.getItem('profile')),
        privilage: ''
      }
    },
    methods: {
      goTo (path, id) {
        let self = this
        self.LoginShow = false
        self.$router.push(path)
        self.classActive = path
      },
    },
    created () {
      let self = this
      let path = window.location.hash
      self.classActive = path.substring(1, path.length)
      if(self.profil) {
        self.privilage = parseInt(self.profil.pengguna_level)
      }else {
        self.privilage = 0
      }
    }
}
</script>
