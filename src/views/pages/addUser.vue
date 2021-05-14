<template>
  <div class="flex-row">
    <div class="container-fluid">
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
            <input type="password" v-model="password" class="form-control mb-4" placeholder="password">
          </b-input-group>
          <b-input-group>
            <label style="width: 100%; font-weight:600">Konfirmasi Password</label>
            <input type="password" v-model="cPassword" class="form-control mb-4" placeholder="confirm password">
          </b-input-group>
          <b-input-group>
            <label style="width: 100%; font-weight:600">Role</label>
              <select class="register-custom-select mb-4 " v-model="provinceId">
                <option v-for="(provinsi, i) in roleList" :value="provinsi.role_id" :key="'d' + i">{{ provinsi.nama }}</option>
              </select>
          </b-input-group>
          <b-button button-rounded-border-radius label="Verify" variant="primary" rounded class="float-right" size="14" @click="registration" style="color:white; padding: 10px 25px; border-radius:5px;">
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
        password: '',
        email: '',
        cPassword: '',
        checked: false,
        listing: {},
        roleList: [],
        provinceId: '2',
        token: localStorage.getItem('token_hse'),
      }
    },
    methods: {
      registration () {
        let self = this
        console.log(self.password)
        console.log(self.cPassword)
        if (self.password === '') alert('insert your password')
        if (self.cPassword !== self.password) alert('password not same')
        let parameter = {
          nama: self.namaOrganisasi,
          email: self.email,
          password: sha256(self.password),
          role_id: self.provinceId,
          token: self.token
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'user_add', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.$router.push('/user/all')
          } else {
            alert('SALAH...!')
          }
        })
      },
      backTo () {
        let self = this
        window.history.back();
      },
      listRole () {
        var self = this
        let status = []
        let dump2 =''
        var token = self.token
        var parameter = {
          token: token
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'role_list', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.roleList = response.data.role_list
            console.log(response.data.role_list)
          } else {
            alert('SALAH...!')
          }
        })
      },
    },
    created: function () {
      this.listRole()
    }
  }
</script>
