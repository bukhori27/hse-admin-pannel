<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row>
        <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xs-12">
          <div id="pt-pgSignin" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row npr">
            <div class="col-md-12"><h1 class="tc m-b-20">Register</h1> </div>
            <!-- step1 -->

            <div id="step1" class="col-md-12 npr">
              <b-input-group>
                <label style="width: 100%; font-weight:600">Username</label>
                <input type="text" v-model="namaOrganisasi" class="form-control mb-4 border-radius-8" placeholder="Username">
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Email</label>
                <input type="email" v-model="email" class="form-control mb-4 border-radius-8" placeholder="email">
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Password</label>
                <input type="password" v-model="Password" class="form-control mb-4 border-radius-8" placeholder="password">
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Konfirmasi Password</label>
                <input type="password" v-model="cPassword" class="form-control mb-4 border-radius-8" placeholder="confirm password">
              </b-input-group>
              <div class="row m-b-10 m-t-20" style="padding:0">
                <div class="col-md-6 " style="padding:0 0 0 15px">
                  <b-button button-rounded-border-radius label="Verify" variant="danger" rounded class="col-md-12" size="14" @click="cancel" style="color:white; padding: 20px 0; border-radius:5px;">
                    Cancel
                  </b-button>
                </div>
                <div class="col-md-6 " style="padding:0 15px">
                  <b-button button-rounded-border-radius label="Verify" rounded class="col-md-12" size="14" @click="registration" style="background:#6cbf16; color:white; padding: 20px 0; border-radius:5px;">
                    Simpan
                  </b-button>
                </div>
              </div>
            </div>
              
          </div>
        </div>
      </b-row>
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
  import Multiselect from 'vue-multiselect'
  import { url } from '../../url'
  import sha256 from 'sha256'

  export default {
    name: 'Register',
    axios,
    data () {
      return {
        Username: '',
        namaOrganisasi: '',
        Password: '',
        email: '',
        cPassword: '',
        checked: false,
        listing: {},
      }
    },
    methods: {
      registration () {

      },
      cancel () {
        let self = this
        self.$router.push('/')
      }
    },
    created: function () {
    }
  }
</script>
