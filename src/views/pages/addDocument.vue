<template>
  <div class="flex-row card">
    <div class="container-fluid">
      <b-row class="card-header">
        <div class="col-sm-6">
          <a @click="backTo" class="nav-link df nplr">
            <i class="nav-icon fas fa-arrow-left fs20 arrow-left"></i>
            <h1>Add Document</h1>
          </a>
        </div>
      </b-row>
      <b-row class="card-body">
        <div class="col-12">
          <div class="col-12">
            <img :src="!imageData ? 'static/img/icons/pdf.jpg' : imageData" class="rounded d-block" style="height:140px;" @click="chooseFiles()">
          </div>
          <input type="file" class="form-control mb-4" @change="openFile" style="display:none;" id="fileUpload">
          <b-input-group>
            <label style="width: 100%; font-weight:600">Name location</label>
            <input type="text" v-model="nama" class="form-control mb-4 border-radius-8 border-left" placeholder="nama lokasi">
          </b-input-group>
            <b-button button-rounded-border-radius label="Verify" variant="primary" rounded class="float-right"  size="14" @click="submit" style="color:white; padding: 10px 25px; border-radius:5px;">
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
    name: 'AddDocument',
    axios,
    data () {
      return {
        nama: '',
        token: localStorage.getItem('token_hse'),
        fileId: '',
        imageData: '',
        imageFile: '',
      }
    },
    methods: {
      submit () {
        let self = this
        var parameter = {
          nama: self.nama,
          file_id: self.fileId,
          token: self.token
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'document_add', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.$router.push('/list-document')
          } else {
            alert('SALAH...!')
          }
        })
      },
      chooseFiles: function() {
        document.getElementById("fileUpload").click()
      },
      backTo () {
        let self = this
        window.history.back();
      },
      openFile (event){
        let self = this
        var input = event.target
        self.imageFile = input.files[0];
        self.uploadImage()
      },
      uploadImage () {
        let self = this
        let fd = new FormData()
        fd.append('token', self.token)
        fd.append('photo_cover', self.imageFile)
        fd.append('type', 2)
        let urls = url.url_app + 'upload_file'
        axios({
          method: 'post',
          url: urls,
          data: fd,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {
            let responseData = response.data
            if (responseData.resultCode === 'OK') {
              self.fileId = responseData.data.id
              self.imageData = url.url_image + responseData.data.file.path
              console.log(self.imageData)
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
      },
    },
    created: function () {
      console.log(this.token)
    }
  }
</script>
