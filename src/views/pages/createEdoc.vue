<template>
  <div class="flex-row align-items-center">
    <div class="container m-t-20">
      <b-row class="justify-content-center">
        <div class="col-md-8 col-sm-12 col-lg-6 col-xl-6 col-xs-11">
          <div id="pt-pgSignin" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row register-form">
            <div class="col-md-12"><h1 class="tc m-b-50">Create E-Document</h1> </div>
            <!-- step1 -->
            <b-input-group>
              <input type="text" v-model="title" class="form-control mb-4" placeholder="title">
              <b-button v-b-tooltip.hover title="Diisi Nama Document" class="tooltips-custom">?</b-button>
            </b-input-group>
            <b-input-group>
              <label style="width: 100%; font-weight:600">Document</label>
              <input type="file" class="form-control mb-4" placeholder="pilih file" @change="openFile($event)">
              <b-button v-b-tooltip.hover title="Document" class="tooltips-custom">?</b-button>
            </b-input-group>
            <b-input-group>
              <textarea type="text" v-model="description" class="form-control mb-4" placeholder="description" style="height:300px;"/>
              <b-button v-b-tooltip.hover title="description" class="tooltips-custom">?</b-button>
            </b-input-group>
            <div class="col-md-12 row m-b-10" style="padding:0">
              <b-button button-rounded-border-radius label="Verify" variant="primary" rounded class="col-md-12" size="14" @click="submit" style="color:white; padding: 20px 0 20px 20px; border-radius:5px;">
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
        file: ''
      }
    },
    methods: {
      openFile(event) {
        var self = this
        var input = event.target;
        self.file = input.files[0];
      },
      submit () {
        var self = this
        let fd = new FormData()
        let token = localStorage.getItem('token_ppa')
        fd.append('token', token)
        fd.append('photo_cover', self.file)
        fd.append('title', self.title)
        fd.append('content_type', '1')
        fd.append('description', self.description)
        let urls = url.url_app + 'content_add'
        axios({
          method: 'post',
          url: urls,
          data: fd,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            let responseData = response.data
            if (responseData.resultCode === 'OK') {
              alert('e-doc berhasil di tambahkan');
              self.$router.push('/e-doc')
            }
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
      },
      getIP () {
        console.log(location.hostname)
      }
    },
    created: function () {
      // this.getIP()
    }
  }
</script>
