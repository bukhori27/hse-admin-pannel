<template>
  <div class="flex-row align-items-center">
    <div class="container m-t-20">
      <b-row class="justify-content-center">
        <div class="col-md-8 col-sm-12 col-lg-6 col-xl-6 col-xs-11">
          <div id="pt-pgSignin" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row register-form">
            <div class="col-md-12"><h1 class="tc m-b-50">Create SDM</h1> </div>
            <!-- step1 -->
            <b-input-group>
              <label style="width: 100%; font-weight:600">Image profile</label>
              <input type="file" class="form-control mb-4" placeholder="pilih file" @change="openFile($event)">
              <b-button v-b-tooltip.hover title="image berita" class="tooltips-custom">?</b-button>
            </b-input-group>
            <b-input-group>
              <input type="text" v-model="nama" class="form-control mb-4" placeholder="nama">
              <b-button v-b-tooltip.hover title="Diisi Nama SDM" class="tooltips-custom">?</b-button>
            </b-input-group>
            <b-input-group>
              <input type="text" v-model="alamat" class="form-control mb-4" placeholder="alamat">
              <b-button v-b-tooltip.hover title="alamat" class="tooltips-custom">?</b-button>
            </b-input-group>
            <b-input-group>
              <input type="text" v-model="kontak" class="form-control mb-4" placeholder="kontak">
              <b-button v-b-tooltip.hover title="Diisi No HP" class="tooltips-custom">?</b-button>
            </b-input-group>
            <b-input-group>
              <input type="email" v-model="email" class="form-control mb-4" placeholder="email">
              <b-button v-b-tooltip.hover title="Diisi email" class="tooltips-custom">?</b-button>
            </b-input-group>
            <b-input-group>
              <label style="width: 100%; font-weight:600">Spesialis Bidang</label>
              <select class="register-custom-select" v-model="spesial_bidang_id" @change="spesialisBidangFuncChange()">
                <option v-for="(spesialbidang, i) in spesialisBidangList" :value="spesialbidang.id" :key="'A' + i">{{ spesialbidang.nama }}</option>
              </select>
            </b-input-group>
            <div class="col-md-12 row m-b-10 m-t-20" style="padding:0">
              <b-button button-rounded-border-radius label="Verify" variant="primary" rounded class="col-md-12" size="14" @click="submit" style="color:white; padding: 20px 0; border-radius:5px;">
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
        nama: '',
        alamat: '',
        lmId: '',
        kontak: '',
        email: '',
        spesial_bidang_id: '',
        file: '',
        spesialisBidangList: [],
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
        fd.append('nama', self.nama)
        fd.append('alamat', self.alamat)
        fd.append('lm_id', self.lmId)
        fd.append('no_hp', self.kontak)
        fd.append('email', self.email)
        fd.append('spesial_bidang_id', self.spesial_bidang_id)
        let urls = url.url_app + 'sdm_add'
        axios({
          method: 'post',
          url: urls,
          data: fd,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            let responseData = response.data
            if (responseData.resultCode === 'OK') {
              alert('sdm berhasil di tambahkan');
              self.$router.push('/user')
            }
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
      },
      spesialisBidangFunc () {
        let self = this
        var parameter = {

        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'spesialBidang_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.spesialisBidangList = response.data.spesialBidang_list
            self.spesialisBidangId = self.spesialisBidangList[0].id
          } else {

          }
        }) 
      },
      getIP () {
        console.log(location.hostname)
      }
    },
    created: function () {
      // this.getIP()
      this.spesialisBidangFunc()
      this.lmId = this.$route.query.id;
    }
  }
</script>
