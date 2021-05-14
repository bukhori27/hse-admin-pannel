<template>
  <div class="flex-row">
    <div class="container-fluid">
      <b-row>
        <div class="col-sm-6">
          <a @click="backTo" class="nav-link df nplr">
            <i class="nav-icon fas fa-arrow-left fs20 arrow-left"></i>
            <h1>Add Category</h1>
          </a>
        </div>
      </b-row>
      <b-row>
        <div id="pt-pgSignin" class="col-12">
          <b-input-group>
            <label style="width: 100%; font-weight:600">Name Category</label>
            <input type="text" v-model="nama" class="form-control mb-4 border-radius-8" placeholder="nama category">
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
    name: 'AddCategory',
    axios,
    data () {
      return {
        nama: '',
        description: '',
        token: localStorage.getItem('token_hse'),
      }
    },
    methods: {
      submit () {
        let self = this
        var parameter = {
          nama: self.nama,
          description: self.description,
          token: self.token
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'category_add', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.$router.push('/category')
          } else {
            alert('SALAH...!')
          }
        })

      },
      backTo () {
        let self = this
        window.history.back();
      },
    },
    created: function () {
    }
  }
</script>
