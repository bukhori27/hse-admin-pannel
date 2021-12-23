<template>
  <div class="flex-row card">
    <div class="container-fluid">
      <b-row class="card-header">
        <div class="col-sm-6">
          <a @click="backTo" class="nav-link df nplr">
            <i class="nav-icon fas fa-arrow-left fs20 arrow-left"></i>
            <h1>Edit User</h1>
          </a>
        </div>
      </b-row>
      <div class="row card-body">
        <div class="col-md-12 m-b-5 m-t-10">
            <b-input-group  >
              <input type="text" v-model="nama" class="form-control mb-4 border-left"placeholder="username">
            </b-input-group>
            <b-input-group >
              <input type="email" v-model="email" class="form-control mb-4 border-left" placeholder="email">
            </b-input-group>
        </div>
          <div class="col-md-12">
              <b-button button-rounded-border-radius variant="primary" rounded size="14" class="float-right" @click="goToChangePassword" style=" color:white; padding: 10px 25px; border-radius:5px;">
                submit
              </b-button>
          </div>
        </div>
      </div>
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
    name: 'EditUser',
    axios,
    data () {
      return {
        nama: '',
        email: '',
        token: localStorage.getItem('token_hse'),
      }
    },
    methods: {
      index (id) {
        var self = this
        var parameter = {
          token: self.token,
          id: id
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'user_view', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let listing = response.data.user_view
            self.email= listing.email
            self.nama= listing.nama
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      submit () {},
      goToChangePassword () {
        let index = 'index=1&url=coba'
        console.log(index)
        // this.$router.push({name: 'changePassword', params: index})
      },
      backTo () {
        let self = this
        window.history.back();
      },
      ubahphoto () {
        document.getElementById('fileUpload').click()
      },
      handleFileUploads (event) {
        var file = event.path[0].files[0]
        let self = this
        let fd = new FormData()
        let token = this.token
        fd.append('token', self.token)
        fd.append('photo_cover', file)
        let urls = url.url_app + 'edit_photo'
        axios({
          method: 'post',
          url: urls,
          data: fd,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            let responseData = response.data
            if (responseData.resultCode === 'OK') {
              alert('berhasil di submit');
              self.$router.push('/user')
            } else {
              let error = response.data.resultCode
              alert(error);
            }
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
      }
    },
    created: function () {
      let self = this
      self.id = self.$route.query.id
      console.log(self.id)
      this.index(self.id);
    }
  }
</script>
