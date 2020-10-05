<template>
  <div class="flex-row align-items-center">
    <div class="container m-t-20">
      <b-row class="justify-content-center">
        <div class="col-md-8 col-sm-12 col-lg-6 col-xl-6 col-xs-11">
          <div id="pt-pgSignin" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row register-form">
            <div class="col-md-12"><h1 class="tc m-b-50">Create Admin</h1> </div>
            <!-- step1 -->
            <b-input-group>
              <input type="text" v-model="Username" class="form-control mb-4" placeholder="username">
            </b-input-group>
            <b-input-group>
              <input type="email" v-model="email" class="form-control mb-4" placeholder="email">
            </b-input-group>
            <b-input-group>
              <input type="password" v-model="Password" class="form-control mb-4" placeholder="password">
            </b-input-group>
            <b-input-group>
              <input type="password" v-model="cPassword" class="form-control mb-4" placeholder="confirm password">
            </b-input-group>
            <b-input-group>
              <input type="text" v-model="alamat" class="form-control mb-4" placeholder="alamat ">
            </b-input-group>
            <b-input-group>
              <input type="text" v-model="penanggungJawab" class="form-control mb-4" placeholder="nama penanggung jawab ">
            </b-input-group>
            <b-input-group>
              <input type="text" v-model="noHP" class="form-control mb-4" placeholder="no kontak yang bisa dihubungi">
            </b-input-group>
            <b-input-group class="m-b-20">
                <label style="width: 100%; font-weight:600">Admin</label>
                <input type="radio" id="ya" value="internal" v-model="typeAdmin" v-on:change="selectedProvinceInternalfunc" checked>
                <label for="internal" style="margin-left:5px; margin-right:20px;">internal</label>
                <br>
                <input type="radio" id="province" value="province" v-model="typeAdmin" v-on:change="selectedProvincefunc" >
                <label for="province" style="margin-left:5px; margin-right:20px;">province</label>
                <b-input-group  id="cabangList" style="display:none !important;">
                  provinsi
                    <select v-model="provinceId">
                      <option v-for="(cabang, i) in provinceList" :value="cabang.id" :key="'cabang' + i">{{ cabang.nama }}</option>
                    </select>
                </b-input-group>
                <input type="radio" id="ya" value="penilai" v-model="typeAdmin" v-on:change="selectedProvinceInternalfunc">
                <label for="Penilai" style="margin-left:5px; margin-right:20px;">Penilai</label>
            </b-input-group>
            <div class="col-md-12 row m-b-10" style="padding:0">
              <b-button button-rounded-border-radius label="Verify" rounded class="float-right"  size="14" @click="Register" style="background:#6cbf16; color:white; padding: 10px 25px; border-radius:5px;">
                submit
              </b-button>
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
  import { url } from '../../url'
  import sha256 from 'sha256'

  export default {
    name: 'Register',
    axios,
    data () {
      return {
        Username: '',
        Password: '',
        email: '',
        cPassword: '',
        noHP: '',
        alamat: '',
        penanggungJawab: '',
        checked: false,
        listing: {},
        typeAdmin: 'internal',
        provinceId: '',
        provinceList: [],
        token: localStorage.getItem('token_hse')
      }
    },
    methods: {
      Register () {
        var self = this
        if (this.Username === '' || this.Username === null) {
          return alert ('please insert your username')
        }

        if (this.email === '' || this.email === null) {
          return alert ('please insert your email')
        }
        if (this.Password === '' || this.Password === null) {
          return alert ('please insert your password')
        }

        if (this.cPassword === '' || this.cPassword === null) {
          return alert ('please insert your confirmasi password')
        }

        if (this.Password !== this.Password) {
          return alert ('confirmasi passsword not same with password')
        }
        if (this.noHP === '' || this.noHP === null) {
          return alert ('please insert your contact')
        }
        if (this.alamat === '' || this.alamat === null) {
          return alert ('please insert your address')
        }
        if (this.penanggungJawab === '' || this.penanggungJawab === null) {
          return alert ('please insert your contact')
        }
        var parameter = {
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        let urls = ''
        if(self.typeAdmin === 'internal'){
          urls = 'admin_internal_create'
          parameter = {
            token: self.token,
            username :self.Username,
            password: sha256(self.Password),
            email: self.email,
            alamat: self.alamat,
            type_user: 'internal',
            penanggung_jawab: self.penanggungJawab,
            no_hp: self.noHP,
          }
        }else if(self.typeAdmin === 'penilai'){
          urls = 'admin_internal_create'
          parameter = {
            token: self.token,
            username :self.Username,
            password: sha256(self.Password),
            email: self.email,
            type_user: 'penilai',
            alamat: self.alamat,
            penanggung_jawab: self.penanggungJawab,
            no_hp: self.noHP,
          }
        }else {
          urls = 'admin_province_create'
          parameter = {
            token: self.token,
            username :self.Username,
            password: sha256(self.Password),
            alamat: self.alamat,
            email: self.email,
            province_id: self.provinceId
          }
        }
        axios.post(url.url_app + urls, parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            alert ('admin berhasil dibuat')
            self.$router.push('/')
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      getIP () {
        console.log(location.hostname)
      },

      selectedProvincefunc() {
        document.getElementById("cabangList").style.display = "block";
        let self = this
        var parameter = {
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'provinces_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            console.log(response.data.provinsi_list)
            self.provinceList = response.data.provinsi_list
          } else {

          }
        })  
      },
      selectedProvinceInternalfunc(){
        document.getElementById("cabangList").style.display = "none";
      }
    },
    created: function () {
      // this.getIP()
    }
  }
</script>
