<template>
  <div class="row m-t-60 m-b-30">
    <div class="col-lg-12 col-sm-12 col-md-12 container6 row">
      <div class="col-lg-10 col-md-10 col-sm-12 row container5-1 ">
        <div class="text-green-title1 col-12 fs36 tc m-b-30"> Review User</div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 container5-1" style="padding-left: 10px"> 
          <b-img :src="imgContent" fluid-grow alt="Responsive image" style="height:auto"/>
        </div>
        <div class="col-md-12 fs16 m-t-10">
          <span>Nama Organisasi : </span>
          <span>{{nama}}</span>
        </div>

        <div class="col-md-12 fs16 m-t-10">
          <span>Email : </span>
          <span>{{email}}</span>
        </div>
        <div class="col-md-12 fs16 m-t-10">
          <span>Nama Penanggung Jawab : </span>
          <span>{{penanggung_jawab}}</span>
        </div>
        <div class="col-md-12 fs16 m-t-10">
          <span>Spesialis Bidang : </span>
          <span>{{nama_spesial_bidang}}</span>
        </div>
        <div class="col-md-12 fs16 m-t-10">
          <span>Jenis Lembaga: </span>
          <span>{{nama_jenis_lembaga}}</span>
        </div>
        <div class="col-md-12 fs16 m-t-10">
          <span>Spesialis Bidang : </span>
          <span>{{penanggung_jawab}}</span>
        </div>
        <div class="col-md-12 fs16 m-t-10">
          <span>Alamat : </span>
          <span>{{alamat}}</span>
        </div>
        <div class="col-md-12 fs16 m-t-10">
          <span>provinsi : </span>
          <span>{{provinsi}}</span>
        </div>
        <div class="col-md-12 fs16 m-t-10">
          <span>Tingkatan : </span>
          <span>{{tingkatan}}</span>
        </div>
        <div class="col-md-12 fs16 m-t-20"> <span>Dokument yang dibutuhkan : </span></div>
        <div class="col-md-12 m-t-20" style="border-top:1px solid black;"></div>
        <div class="row m-t-30" v-for="(index, id) in document" style="padding-left:10px;"> 
          <div class="col-12 fs18"> {{index.nama}}</div>
          <b-button variant="primary" style="border-radius: 20%" @click="viewDocument(url_images + index.path_img, beritaId)">view</b-button>
        </div>
        <div class="m-t-20" style="border-top: 1px solid black;"> <p> </p> </div>
        <div class="row col-md-12" style="display:block; padding:0;">
          <b-input-group class="m-t-20 col-md-12" style="padding:0 0 0 25px;" v-if="!token">
            <input type="text" v-model="namaUser" class="form-control mb-4 col-md-12" placeholder="nama">
          </b-input-group>
        </div>
        <div class="col-md-12">
          <b-button class="col-lg-2 m-t-40" variant="primary" @click="backto()">back </b-button>
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
    name: 'berita',
    axios,
    data () {
      return {
        slide: 0,
        sliding: null,
        berita: [],
        imgContent: '',
        nama: '',
        email: '',
        nama_spesial_bidang: '',
        nama_jenis_lembaga: '',
        alamat: '',
        provinsi: '',
        tingkatan: '',
        email: '',
        penanggung_jawab: '',
        message: '',
        token: localStorage.getItem('token_ppa'),
        document: [],
        url_images: url.url_image
      }
    },
    methods: {
      subContent (index) {
        return index.substring(parseInt(index.length)-2, index.length)
      },
      index (id) {
        var self = this
        var parameter = {
          user_id: parseInt(id),
          token: self.token
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'approval_user_view', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let listing = response.data.lembagaMasyarakat_view
            self.imgContent = url.url_image + listing.photo_profile
            self.nama = listing.nama_user
            self.email = listing.email
            self.penanggung_jawab = listing.penanggung_jawab
            self.nama_jenis_lembaga = listing.nama_jenis_lembaga
            self.nama_spesial_bidang = listing.nama_spesial_bidang
            self.alamat = listing.alamat
            self.provinsi = listing.provinsi
            self.tingkatan = listing.tingkatan
            self.document = response.data.dokument_list
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      viewDocument (url, id) {
        let self = this
        window.open(url);
        // self.$router.push('/document?url='+ url + '&id=' + id)
      },
      submit () {
        var self = this
        let profile = JSON.parse(localStorage.getItem('profile'))
        let nama = ''
        let emailUser = ''
        if(self.token) {
          nama = profile.pengguna_nama
          emailUser = profile.email
        } else {
          nama = self.namaUser
          emailUser = self.email
        }
        var parameter = { 
          article_id: self.beritaId,
          nama : nama,
          email: emailUser,
          message: self.message
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'comment_add', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            alert('berhasil di submit')
            self.index(self.beritaId)
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      backto () {
        let self = this
        self.$router.push ('/approval-user')
      }
    },
    created: function () {
      let id = this.$route.query.id
      this.beritaId = id
      this.index(id)
    }
  }
</script>