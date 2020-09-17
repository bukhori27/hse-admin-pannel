<template>
  <div class="flex-row">
    <div class="container">
      <b-row>
        <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xs-12">
          <div id="pt-pgSignin" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row npr">
            <div class="col-md-12"><h1 class="tc m-b-50">Register</h1> </div>
            <!-- step1 -->

            <div id="step1" class="col-md-12 npr">
              <b-input-group>
                <label style="width: 100%; font-weight:600">Username</label>
                <input type="text" v-model="namaOrganisasi" class="form-control mb-4 border-radius-8" placeholder="Username">
                <b-button v-b-tooltip.hover title="Username" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Email</label>
                <input type="email" v-model="email" class="form-control mb-4 border-radius-8" placeholder="email">
                <b-button v-b-tooltip.hover title="Digunakan untuk masuk ke dalam akun anda" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Password</label>
                <input type="password" v-model="Password" class="form-control mb-4 border-radius-8" placeholder="password">
                <b-button v-b-tooltip.hover title="Digunakan untuk masuk ke dalam akun anda" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Konfirmasi Password</label>
                <input type="password" v-model="cPassword" class="form-control mb-4 border-radius-8" placeholder="confirm password">
                <b-button v-b-tooltip.hover title="Digunakan untuk masuk ke dalam akun anda" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Role</label>
                  <select class="register-custom-select" v-model="provinceId" @change="regenciesFunc()">
                    <option v-for="(provinsi, i) in provinceList" :value="provinsi.value" :key="'d' + i">{{ provinsi.nama }}</option>
                  </select>
                <b-button v-b-tooltip.hover title="Digunakan untuk masuk ke dalam akun anda" class="tooltips-custom">?</b-button>
              </b-input-group>
              <div class="col-md-12 row m-b-10 m-t-20" style="padding:0 0 0 15px">
                <b-button button-rounded-border-radius label="Verify" variant="primary" rounded class="col-md-12" size="14" @click="registration" style="color:white; padding: 20px 0; border-radius:5px;">
                  Simpan
                </b-button>
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
    name: 'AddUser',
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
        provinceList: [],
        provinceId: 'reporter',
      }
    },
    methods: {
      registration () {

      },
      provincesFunc () {
        let self = this
        self.provinceList = [
          {nama:'reporter', value: 'reporter'},
          {nama:'manager', value: 'manager'},
          {nama:'executor', value: 'executor'},
        ]
      },
    },
    created: function () {
      this.provincesFunc()
    }
  }
</script>
