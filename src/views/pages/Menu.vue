<template>
  <div>
    <div class="row">
      <div class="col-lg-3 col-6 m-b-20" @click="goTo('/issue/create')">
        <!-- small box -->
        <div class="tc pb8 bg-white">
          <div class="pt8 pb8 fs40">
            <i class="fas fa-plus-circle"></i>
          </div>
          <div class="inner">
            <p class="fs20">Create Issue</p>
          </div>
        </div>
      </div>
      <!-- ./col -->
      <div class="col-lg-3 col-6 m-b-20" @click="goTo('/issue')">
        <!-- small box -->
        <div class="tc pb8 bg-white">
          <div class="pt8 pb8 fs40">
            <i class="fa fa-ticket"></i>
          </div>
          <div class="inner">
            <p class="fs20">List Issue</p>
          </div>
        </div>
      </div>
      <!-- ./col -->
      <div class="col-lg-3 col-6 m-b-20" @click="goTo('/user/list')">
        <!-- small box -->
        <div class="tc pb8 bg-white">
          <div class="pt8 pb8 fs40">
            <i class="fa fa-users"></i>
          </div>
          <div class="inner">

            <p class="fs20">User</p>
          </div>
        </div>
      </div>
      <!-- ./col -->
      <div class="col-lg-3 col-6 m-b-20" @click="goTo('/category')">
        <!-- small box -->
        <div class="tc pb8 bg-white">
          <div class="pt8 pb8 fs40">
            <i class="fas fa-clipboard-list"></i>
          </div>
          <div class="inner">
            <p class="fs20">Category</p>
          </div>
        </div>
      </div>
      
      <div class="col-lg-3 col-6 m-b-20" @click="goTo('/location')">
        <!-- small box -->
        <div class="tc pb8 bg-white">
          <div class="pt8 pb8 fs40">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="inner">
            <p class="fs20">Location</p>
          </div>
        </div>
      </div>
      
      <div class="col-lg-3 col-6 m-b-20" @click="goTo('/type')">
        <!-- small box -->
        <div class="tc pb8 bg-white">
          <div class="pt8 pb8 fs40">
            <i class="fas fa-clipboard-list"></i>
          </div>
          <div class="inner">
            <p class="fs20">Type</p>
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
    name: 'Index',
    axios,
    data () {
      return {
        active: false
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