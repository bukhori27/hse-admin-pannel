<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xs-12 row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 m-b-5">
        <h1 class="tc">Edit Profile</h1> 
      </div>
    </div>
    <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xs-12 row containerEditprofile m-b-5">
      <div class="col-md-5 row">
        <span class="col-md-12 m-b-40" style="text-align:right;" @click="ubahphoto">ubah</span>
        <input type="file" id="fileUpload" @change="handleFileUploads($event)" ref="myFiles" hidden >
        <img class="photo-img col-md-12" :src="user.imgContent"/>
      </div>
      <div class="col-md-5">
        <b-input-group  v-if="profile.pengguna_level === '4'" >
          <input type="text" v-model="user.nama" class="form-control mb-4"placeholder="username">
          <b-button v-b-tooltip.hover title="Diisi Nama Organisasi/Lembaga/Komunitas sesuai dengan nama legal" class="tooltips-custom">?</b-button>
        </b-input-group>
        <b-input-group >
          <input type="email" v-model="user.email" class="form-control mb-4" placeholder="email">
          <b-button v-b-tooltip.hover title="email" class="tooltips-custom">?</b-button>
        </b-input-group>
        <b-input-group v-if="profile.pengguna_level !== '1'">
          <input type="text" v-model="user.alamat" class="form-control mb-4" placeholder="alamat ">
          <b-button v-b-tooltip.hover title="Alamat" class="tooltips-custom">?</b-button>
        </b-input-group>
        <b-input-group v-if="profile.pengguna_level !== '1'">
          <input type="text" v-model="user.penanggung_jawab" class="form-control mb-4" placeholder="nama penanggung jawab ">
          <b-button v-b-tooltip.hover title="Nama Penanggung Jawab" class="tooltips-custom">?</b-button>
        </b-input-group>
        <b-input-group v-if="profile.pengguna_level !== '1'">
          <input type="text" v-model="user.no_HP" class="form-control mb-4" placeholder="no kontak yang bisa dihubungi">
          <b-button v-b-tooltip.hover title="Nomer hp" class="tooltips-custom">?</b-button>
        </b-input-group>
      </div>
      <div class="col-md-5 row"> </div>
      <div class="col-md-5 row">
       <div class="col-md-1 m-b-10" ></div>
       <div class="col-md-5 m-b-10" style="padding-right:10px">
          <b-button button-rounded-border-radius variant="primary" rounded class="col-md-12" size="14" @click="backTo" style=" color:white; padding: 15px 0; border-radius:5px; margin-left:15px; margin-right:15px;">
            back
          </b-button>
        </div>
        <div class="col-md-5 m-b-10" style="padding-left:10px">
          <b-button button-rounded-border-radius variant="primary" rounded class="col-md-12" size="14" @click="login" style=" color:white; padding: 15px 0; border-radius:5px; margin-left:15px; margin-right:-15px;">
            submit
          </b-button>
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
    name: 'ResetPassword',
    axios,
    data () {
      return {
        password: '',
        cPassword: '',
        profile: JSON.parse(localStorage.getItem('profile')),
        token: localStorage.getItem('token_ppa'),
        user: ''
      }
    },
    methods: {
      login () {
        let email = this.user.email;
        let alamat = this.user.alamat;
        let penanggung_jawab = this.user.penanggung_jawab;
        let no_hp = this.user.no_HP;
        let urls = ''
        var self = this
        var parameter = {
          token: self.token,
          email: email,
          alamat: alamat,
          penanggung_jawab: penanggung_jawab,
          no_hp: no_hp,
          province_id: this.user.province_id
        }
        if (this.profile.pengguna_level === '3') {
          urls = url.url_app + 'admin_update'
        } else {
          urls = url.url_app + 'lembagaMasyarakat_update'
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(urls, parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.$router.push('/user')
          } else {
            alert('SALAH...!')
          }
        }) 
      },
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
            self.user = {
              nama:listing.username,
              email: listing.email,
              penanggung_jawab: listing.penanggung_jawab,
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
      backTo () {
        let self = this
        self.$router.push ('/user')
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
