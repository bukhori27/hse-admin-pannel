<template>
  <div class="flex-row">
    <div class="container">
      <b-row>
        <div class="col-sm-6">
          <a @click="backTo" class="nav-link df nplr">
            <i class="nav-icon fas fa-arrow-left fs20 arrow-left"></i>
            <h1>Edit User</h1>
          </a>
        </div>
      </b-row>
      <div class="row">
        <div class="col-md-12 m-b-5 m-t-30">
            <b-input-group  >
              <input type="text" v-model="user.nama" class="form-control mb-4"placeholder="username">
              <b-button v-b-tooltip.hover title="Diisi Nama Organisasi/Lembaga/Komunitas sesuai dengan nama legal" class="tooltips-custom">?</b-button>
            </b-input-group>
            <b-input-group >
              <input type="email" v-model="user.email" class="form-control mb-4" placeholder="email">
              <b-button v-b-tooltip.hover title="email" class="tooltips-custom">?</b-button>
            </b-input-group>
        </div>
          <div class="col-md-12">
              <b-button button-rounded-border-radius variant="primary" rounded class="col-md-12" size="14" @click="goToChangePassword" style=" color:white; padding: 15px 0; border-radius:5px;">
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
        password: '',
        cPassword: '',
        profile: '',
        token: localStorage.getItem('token_hse'),
        user: ''
      }
    },
    methods: {
      index () {
        var self = this
        var parameter = {
          token: self.token
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'user_view', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let listing = response.data.user_view
            if (listing.photo_profile) {
              self.imgContent = url.url_image + listing.photo_profile
            }else {
               self.imgContent = url.url_image + '/uploads/images/defaultphoto.png'
            }
            self.profile = {
              penanggung_jawab: listing.penanggung_jawab,
              pengguna_level: 1,
              no_HP: listing.no_hp,
              alamat: listing.alamat,
              imgContent: self.imgContent,
              province_id: listing.province_id
            }
            
            console.log(self.user)
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
      // this.user = this.$route.params;
      console.log(this.user)
      this.index();
    }
  }
</script>
