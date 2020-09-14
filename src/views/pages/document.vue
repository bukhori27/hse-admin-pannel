<template>
  <div class="row m-t-60 m-b-30">
    <div class="col-lg-12 col-sm-12 col-md-12">
      <div class="row" id="printableArea">
        <div class="col-lg-6 col-md-10  col-sm-12 col-xs-12 container5-1" style="padding-left: 10px; margin:auto;"  > 
          <b-img :src="document" fluid-grow alt="Responsive image" style="height:auto; z-index: 99;"/>
          <span class="container-kartu row">
            <span class="nama_lm_doc col-md-12 capitalize">{{user.nama_organisasi}}</span>
            <span class="col-md-12 capitalize">{{user.alamat}}</span>
            <span class="col-md-12">{{user.no_hp}}</span>
            <span class="col-md-12">{{user.email}}</span>

          </span>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-10">
          <b-button class="col-lg-2 m-t-20" variant="primary" @click="backto()">Back </b-button>
          <b-button class="col-lg-2 m-t-20" variant="primary" @click="download('printableArea')">Download </b-button>
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
        document: '',
        id: '',
        type: '',
        token: localStorage.getItem('token_ppa'),
        profile: JSON.parse(localStorage.getItem('profile')),
        kartu: '',
        user:''
      }
    },
    methods: {
      subContent (index) {
        return index.substring(parseInt(index.length)-2, index.length)
      },
      viewUser () {
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
            self.user = listing
            self.imgContent = url.url_image+ listing.photo_profile
            self.nama = listing.username
            self.email = listing.email
            self.penanggung_jawab = listing.penanggung_jawab
            self.no_HP = listing.no_hp
            self.nama_spesial_bidang = listing.nama_spesial_bidang
            self.nama_jenis_lembaga = listing.nama_jenis_lembaga
            self.alamat = listing.alamat
            self.provinsi = listing.nama_provinsi
            self.tingkatan = listing.tingkatan
            self.document = url.url_image+ '/uploads/img/home/card.jpg'
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      download (index) {
        var printContents = document.getElementById(index).innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
      },
      backto() {
        let self = this
        if (self.type === 'kartu') {
          self.$router.push ('/user')
        }else {
          self.$router.push ('/view-approval-user?id='+self.id)
        }
      }
    },
    created: function () {
      this.document = this.$route.query.url
      this.type = this.$route.query.type
      if(this.type=== 'kartu') {
        this.viewUser();
      }
      this.id = this.$route.query.id
    }
  }
</script>