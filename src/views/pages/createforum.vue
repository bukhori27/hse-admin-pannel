<template>
  <div class="flex-row align-items-center">
    <div class="container m-t-20">
      <b-row class="justify-content-center">
        <div class="col-md-8 col-sm-12 col-lg-6 col-xl-6 col-xs-11">
          <div id="pt-pgSignin" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row register-form">
            <div class="col-md-12"><h1 class="tc m-b-50">Create Forum</h1> </div>
            <!-- step1 -->
            <b-input-group>
              <input type="text" v-model="title" class="form-control mb-4" placeholder="nama topik">
              <b-button v-b-tooltip.hover title="Nama topik dalam forum " class="tooltips-custom">?</b-button>
            </b-input-group>
            <b-input-group>
              <input type="text" v-model="description" class="form-control mb-4" placeholder="deskripsi">
              <b-button v-b-tooltip.hover title="penjabaran dalam topik" class="tooltips-custom">?</b-button>
            </b-input-group>
            <div class="col-md-12 row m-b-10" style="padding:0">
              <b-button button-rounded-border-radius label="Verify" rounded class="col-md-12" size="14" @click="submit" style="background:#6cbf16; color:white; padding: 20px 0 20px 20px; border-radius:5px;">
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
        title: '',
        description: '',
        token: localStorage.getItem('token_ppa')
      }
    },
    methods: {
      submit () {
        var self = this
        var parameter = {
          judul :this.title,
          token: this.token,
          description: this.description
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'forum_create', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.$router.push('/forum')
          } else {
            alert('SALAH...!')
          }
        }) 
      }
    },
    created: function () {
    }
  }
</script>
