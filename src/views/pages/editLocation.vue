<template>
  <div class="flex-row">
    <div class="container-fluid">
      <b-row>
        <div class="col-sm-6">
          <a @click="backTo" class="nav-link df nplr">
            <i class="nav-icon fas fa-arrow-left fs20 arrow-left"></i>
            <h1>Edit Location</h1>
          </a>
        </div>
      </b-row>
      <b-row>
        <div class="col-12">
          <b-input-group>
            <label style="width: 100%; font-weight:600">Name type</label>
            <input type="text" v-model="nama" class="form-control mb-4 border-radius-8" placeholder="nama location">
          </b-input-group>
          <b-input-group>
            <label style="width: 100%; font-weight:600">Description</label>
            <textarea type="email" v-model="description" class="form-control mb-4 border-radius-8" placeholder="description" rows="15"/>
          </b-input-group>
          <b-button button-rounded-border-radius label="Verify" variant="primary" rounded class="float-right" size="14" @click="submit" style="color:white; padding: 10px 25px; border-radius:5px;">
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
    name: 'EditLocation',
    axios,
    data () {
      return {
        nama: '',
        description: '',
        token: localStorage.getItem('token_hse'),
        id: ''
      }
    },
    methods: {
      submit () {

      },
      backTo () {
        let self = this
        window.history.back();
      },getDetail (id) {
        var self = this
        var token = self.token
        var parameter = {
          token: token,
          "id": id
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'location_view', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let dump = response.data.location_view
            self.nama = dump.nama
            self.description = dump.description
          } else {
            alert('SALAH...!')
          }
        })
      },
      submit () {
        var self = this
        var token = self.token
        var parameter = {
          token: token,
          id: self.id,
          nama: self.nama,
          description: self.description,
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'location_edit', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.$router.push('/location')
          } else {
            alert('SALAH...!')
          }
        })
      }
    },
    created: function () {
      let self = this
      console.log(self.$route.query)
      self.id = self.$route.query.id
      self.getDetail(self.id)
    }
  }
</script>
