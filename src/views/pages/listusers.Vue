<template>
  <div>
    <div class="row">
      <div class="col-lg-3 col-6 m-b-20" @click="goTo('/user/all')">
        <!-- small box -->
        <div class="tc pb8 bg-white">
          <div class="pt8 pb8 fs40">
            <i class="fas fa-users"></i>
          </div>
          <div class="inner">
            <p class="fs20">All Users</p>
          </div>
        </div>
      </div>
      <!-- ./col -->
      <div class="col-lg-3 col-6 m-b-20" @click="goTo('/user/reporter')">
        <!-- small box -->
        <div class="tc pb8 bg-white">
          <div class="pt8 pb8 fs40">
            <i class="fas fa-video"></i>
          </div>
          <div class="inner">
            <p class="fs20">Reporter</p>
          </div>
        </div>
      </div>
      <!-- ./col -->
      <div class="col-lg-3 col-6 m-b-20" @click="goTo('/user/executor')">
        <!-- small box -->
        <div class="tc pb8 bg-white">
          <div class="pt8 pb8 fs40">
            <i class="fas fa-briefcase-medical"></i>
          </div>
          <div class="inner">

            <p class="fs20">Executor</p>
          </div>
        </div>
      </div>
      <!-- ./col -->
      <div class="col-lg-3 col-6 m-b-20" @click="goTo('/user/admin')">
        <!-- small box -->
        <div class="tc pb8 bg-white">
          <div class="pt8 pb8 fs40">
            <i class="fas fa-user-cog"></i>
          </div>
          <div class="inner">
            <p class="fs20">Admin</p>
          </div>
        </div>
      </div>
      
      <div class="col-lg-3 col-6 m-b-20" @click="goTo('/user/manager')">
        <!-- small box -->
        <div class="tc pb8 bg-white">
          <div class="pt8 pb8 fs40">
            <i class="fas fa-briefcase"></i>
          </div>
          <div class="inner">
            <p class="fs20">Manager</p>
          </div>
        </div>
      </div>
      
      <div class="col-lg-3 col-6 m-b-20" @click="goTo('/user/picarea')">
        <!-- small box -->
        <div class="tc pb8 bg-white">
          <div class="pt8 pb8 fs40">
            <i class="fas fa-broadcast-tower"></i>
          </div>
          <div class="inner">
            <p class="fs20">PIC Area</p>
          </div>
        </div>
      </div>
      <!-- ./col -->
    </div>
  </div>
</template>
<style>
.mt20 {
  margin-top:20px;
}
</style>
<script>
  import axios from 'axios'
  import { url } from '../../url'

  export default {
    name: 'listUsers',
    axios,
    data () {
      return {
      }
    },
    methods: {
      goTo (path, id) {
        let self = this
        self.LoginShow = false
        self.$router.push(path)
      },
    },
    created: function () {
    }
  }
</script>