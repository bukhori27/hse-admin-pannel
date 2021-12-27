<template>
  <div class="flex-row card">
    <div class="container-fluid">
      <b-row class="card-header">
        <div class="col-sm-6">
          <a @click="backTo" class="nav-link df nplr">
            <i class="nav-icon fas fa-arrow-left fs20 arrow-left"></i>
            <h1>Buat Data Temuan</h1>
          </a>
        </div>
      </b-row>
      <b-row class="card-body">
        <div class="col-xs-12 col-md-12">
          <div class="row col-xs-12 col-md-12 nplr mb-2">
            <label style="font-weight:600" class="col-md-2 col-form-label">Tanggal</label>
            <input type="date" v-model="date" class="form-control mb-2 border-left col-md-10 npr" placeholder="date">
          </div>
          <div class="row col-xs-12 col-md-12 nplr mb-2">
            <label style="font-weight:600" class="col-md-2 col-form-label">Bagian</label>
              <select v-model="bagianId" class="register-custom-select mb-2 col-md-10 npr">
                <option v-for="(cabang, i) in bagianList" :value="cabang.id" :key="'cabang' + i">{{ cabang.nama }}</option>
              </select> 
          </div>
          <div class="row col-xs-12 col-md-12 nplr mb-2">
            <label style="font-weight:600" class="col-md-2 col-form-label">Lokasi</label>
              <select v-model="locationId" class="register-custom-select mb-2 col-md-10 npr">
                <option v-for="(cabang, i) in locationList" :value="cabang.id" :key="'cabang' + i">{{ cabang.nama }}</option>
              </select> 
          </div>
          <div class="row col-xs-12 col-md-12 nplr mb-2">
            <label style="font-weight:600" class="col-md-2 col-form-label">Sumber Bahaya</label>
            <textarea v-model="sumber_bahaya" class="form-control mb-4 border-radius-8 border-left col-md-10 npr" placeholder="" rows="15"/>
         
            <!-- <input type="text" v-model="sumber_bahaya" class="form-control mb-2 border-left col-md-10 npr" placeholder="description"> -->
          </div>
          <div class="row col-xs-12 col-md-12 nplr mb-2">
            <label style="font-weight:600" class="col-md-2 col-form-label">Resiko</label>
            <input type="text" v-model="resiko" class="form-control mb-2 border-left col-md-10 npr" placeholder="">
          </div>
          <div class="row col-xs-12 col-md-12 nplr mb-2">
            <label style="font-weight:600" class="col-md-2 col-form-label">Rekomendasi</label>
            <textarea v-model="rekomendasi" class="form-control mb-4 border-radius-8 border-left col-md-10 npr" placeholder="" rows="15"/>
          </div>
          <div class="row col-xs-12 col-md-12 nplr mb-2">
            <label style="font-weight:600" class="col-md-2 col-form-label">SO</label>
            <input type="text" v-model="so" class="form-control mb-2 border-left col-md-10 npr" placeholder="">
          </div>
        </div>
        <div class="col-xs-12 col-md-12 m-b-10 nplr">
          <label style="font-weight:600" class="col-md-12 col-form-label">Kondisi Temuan</label>
           <div class="fileinput fileinput-new col-xs-12 col-md-4 text-center" data-provides="fileinput">
              <div class="fileinput-new thumbnail">
                <img :src="!imageData ? 'static/img/icons/defaultImage.jpg' : imageData" alt="...">
              </div>
              <div class="fileinput-preview fileinput-exists thumbnail"></div>
              <div>
                <span class="btn btn-rose btn-round btn-file btn-primary">
                  <span class="fileinput-new">Select image</span>
                  <span class="fileinput-exists">Change</span>
                  <input type="file" @change="openFile" name="..." />
                </span>
                <a href="javascript:;" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i> Remove</a>
              </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-12 nplr" v-if="Image.length >= 0">
          <div class="col-xs-12 col-md-12 nplr row" >
            <div class="col-3 mt-10" v-for="(img, i) in Image">
              <img :src="!img.path ? 'static/img/icons/defaultImage.jpg' : img.path" class="rounded">
            </div>
            <input type="file" class="form-control mb-2" style="display:none;" id="fileUploads">
          </div>
        </div>
        <div class="col-12 m-b-10">
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
    name: 'CreateIssue',
    axios,
    data () {
      return {
        date: '',
        description: '',
        locationList: [],
        locationId: '1',
        bagianList: [],
        bagianId: '',
        categoryList: [],
        categoryId: '1',
        typeList: [],
        typeId: '1',
        fileId: '',
        imageData: '',
        Image: [],
        imageFile: '',
        sumber_bahaya: '',
        resiko: '',
        rekomendasi: '',
        so:'',
        token: localStorage.getItem('token_hse')
      }
    },
    methods: {
      backTo () {
        let self = this
        window.history.back();
      },
      categoryFunct () {
        let self = this
        var token = self.token
        var parameter = {
          token: token,
          page: 1
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'category_list', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.categoryList = response.data.category_list
          } else {
            alert('SALAH...!')
          }
        })
      },
      chooseFiles: function() {
        document.getElementById("fileUpload").click()
      },
      locationFunct () {
        let self = this
        var token = self.token
        var parameter = {
          token: token,
          page: 1
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'location_list', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.locationList = response.data.location_list
          } else {
            alert('SALAH...!')
          }
        })
      },
      typeFunct () {
        let self = this
        var token = self.token
        var parameter = {
          token: token,
          page: 1
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'type_list', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.typeList = response.data.type_list
          } else {
            alert('SALAH...!')
          }
        })
      },
      openFile (event){
        let self = this
        var input = event.target
        self.imageFile = input.files[0];
        console.log(input)
        self.uploadImage()
      },
      uploadImage () {
        let self = this
        let fd = new FormData()
        fd.append('token', self.token)
        fd.append('photo_cover', self.imageFile)
        let urls = url.url_app + 'upload_document'
        self.Image.push(self.imageFile)
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
      submit (){
        let self = this
        let parameter = {
          token: self.token,
          nama: self.nama,
          description: self.description,
          category_id: self.categoryId,
          type_id: self.typeId,
          location_id: self.locationId,
          image_id: self.fileId
        }
        console.log(parameter)
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'issue_add', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.$router.push('/issue')
          } else {
            alert('SALAH...!')
          }
        })
      }
    },
    created: function () {
      this.categoryFunct()
      this.locationFunct()
      this.typeFunct()
    }
  }
</script>
