<template>
  <div class="flex-row">
    <div class="container">
      <b-row>
        <div class="col-sm-6">
          <a @click="backTo" class="nav-link df nplr">
            <i class="nav-icon fas fa-arrow-left fs20 arrow-left"></i>
            <h1>Add User</h1>
          </a>
        </div>
      </b-row>
      <b-row>
        <div class="col-12 ">
          <b-input-group>
            <label style="width: 100%; font-weight:600">Username</label>
            <input type="text" v-model="namaOrganisasi" class="form-control mb-4" placeholder="Username">
          </b-input-group>
          <b-input-group>
            <label style="width: 100%; font-weight:600">Email</label>
            <input type="email" v-model="email" class="form-control mb-4" placeholder="email">
          </b-input-group>
          <b-input-group>
            <label style="width: 100%; font-weight:600">Password</label>
            <input type="password" v-model="Password" class="form-control mb-4" placeholder="password">
          </b-input-group>
          <b-input-group>
            <label style="width: 100%; font-weight:600">Konfirmasi Password</label>
            <input type="password" v-model="cPassword" class="form-control mb-4" placeholder="confirm password">
          </b-input-group>
          <b-input-group>
            <label style="width: 100%; font-weight:600">Role</label>
              <select class="register-custom-select mb-4 " v-model="provinceId" @change="regenciesFunc()">
                <option v-for="(provinsi, i) in provinceList" :value="provinsi.value" :key="'d' + i">{{ provinsi.nama }}</option>
              </select>
          </b-input-group>
          <b-button button-rounded-border-radius label="Verify" variant="primary" rounded class="col-md-12" size="14" @click="registration" style="color:white; padding: 20px 0; border-radius:5px;">
            Simpan
          </b-button>
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
      backTo () {
        let self = this
        window.history.back();
      },
      provincesFunc () {
        let self = this
        self.provinceList = [
          {nama:'reporter', value: 'reporter'},
          {nama:'manager', value: 'manager'},
          {nama:'admin', value: 'admin'},
          {nama:'observer', value: 'observer'},
          {nama:'executor', value: 'executor'},
        ]
      },
    },
    created: function () {
      this.provincesFunc()
    }
  }
</script>
