<template>
  <div class="flex-row">
    <div class="container-fluid">
      <b-row>
        <div class="col-sm-6">
          <a @click="backTo" class="nav-link df nplr">
            <i class="nav-icon fas fa-arrow-left fs20 arrow-left"></i>
            <h1>Create Issue</h1>
          </a>
        </div>
      </b-row>
      <b-row>
        <div class="col-8">
          <b-input-group>
            <label style="width: 100%; font-weight:600">Name</label>
            <input type="text" v-model="nama" class="form-control mb-4 border-radius-8" placeholder="nama">
          </b-input-group>
          <b-input-group>
            <label style="width: 100%; font-weight:600">description</label>
            <input type="text" v-model="nama" class="form-control mb-4 border-radius-8" placeholder="description">
          </b-input-group>
            <label style="width: 100%; font-weight:600">Location</label>
              <select v-model="locationId" class="register-custom-select mb-4">
                <option v-for="(cabang, i) in locationList" :value="cabang.id" :key="'cabang' + i">{{ cabang.nama }}</option>
              </select>
          </b-input-group>
          <b-input-group>
            <label style="width: 100%; font-weight:600">Category</label>
            <select v-model="categoryId" class="register-custom-select mb-4">
              <option v-for="(category, i) in categoryList" :value="category.id" :key="'category' + i">{{ category.nama }}</option>
            </select>
          </b-input-group>
          <b-input-group>
            <label style="width: 100%; font-weight:600">type</label>
            <select v-model="typeId" class="register-custom-select mb-4">
              <option v-for="(type, i) in typeList" :value="type.id" :key="'type' + i">{{ type.nama }}</option>
            </select>
          </b-input-group>
        </div>
        <div class="col-4">
          photo
        </div>
        <div class="col-12">
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
        nama: '',
        description: '',
        locationList: [],
        locationId: '1',
        categoryList: [],
        categoryId: '1',
        typeList: [],
        typeId: '1',
        fileId: '',
        imageData: '',
        imageFile: '',
        token: localStorage.getItem('token_hse')
      }
    },
    methods: {
      submit () {

      },
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
            console.log(response.data.category_list)
          } else {
            alert('SALAH...!')
          }
        })
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
            console.log(response.data.location_list)
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
            console.log(response.data.type_list)
          } else {
            alert('SALAH...!')
          }
        })
      },
      uploadImage () {
        let self = this
        let parameter = {
          token: self.token,
          file: self.imageFile
        }
        console.log(parameter)
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'upload_image', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.imageData = response.data.data.file
            self.fileId = response.data.data.id
            console.log(response.data.type_list)
          } else {
            alert('SALAH...!')
          }
        })
      },
      submit (){
        let self = this
        let parameter = {
          token: self.token,
          nama: self.nama,
          description: self.description,
          location_id: self.locationId,
          category_id: self.categoryId,
          type_id: self.typeId,
          location_id: self.locationId,
          image_id: 6
          // file_id: self.fileId
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
