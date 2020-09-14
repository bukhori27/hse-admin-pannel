<template>
  <div class="row m-t-60 m-b-30">
    <div class="col-lg-12 col-sm-12 col-md-12 container6 row">
      <div class="col-lg-10 col-md-10 col-sm-12 row container5-1 ">
        <div class="text-green-title1 col-12 fs36 tc m-b-30"> Lembaga Masyarakat</div>
        <div class="col-md-5 row"> 
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
            <span>No HP : </span>
            <span>{{no_HP}}</span>
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
            <span>Alamat : </span>
            <span>{{alamat}}</span>
          </div>
          <div class="col-md-12 fs16 m-t-10">
            <span>Provinsi : </span>
            <span>{{provinsi}}</span>
          </div>
          <div class="col-md-12 fs16 m-t-10">
            <span>Tingkatan : </span>
            <span>{{tingkatan}}</span>
          </div>
        </div>
        <div class="col-md-5 row"> 
          <div class="col-lg-11 col-md-11 col-sm-11 col-xs-12 container5-1" style="padding-left: 10px"> 
            <b-img :src="imgContent" fluid-grow alt="Responsive image" style="height:auto" v-if="imgContent"/>
          </div>
        </div>
        <div class="col-md-12 m-t-20" style="border-top:1px solid black;"></div>
        <div class="row m-t-30">
          <div class="row" v-if="profile.pengguna_level === '1' || profile.pengguna_level === '3'" style="padding:0 15px;"> 
            <div class="col-md-12 fs16 m-t-20 tc"> <span>Dokument : </span></div>
            <div class="row m-t-30 col-12" v-for="(index, id) in document" style="padding-left:10px;"> 
              <div class="col-7 fs18"> {{index.nama}}</div>
              <b-button variant="primary" style="border-radius: 20%" @click="viewDocument(url_images + index.path_img, beritaId)">view</b-button>
            </div>
          </div>
          <label class="tc col-md-12 fs18 m-b-30 m-t-30">SDM</label>
          <paginate name="listing" :list="listings" :per="15" class="row" v-if="listings.length>0">
            <div v-for="(index, id) in paginated('listing')" :key="id" class="col-xl-4 col-lg-5 col-md-5 col-sm-6 fs12" style="padding: 0px 15px 20px 15px;" @click="modali(index.id)">
              <div class="row brdr-rds-5" style="border: 1px solid grey; margin-right:5px; padding-bottom:15px">
                <div class="col-md-12 m-t-20 m-b-10 img-relative">
                  <b-img :src="index.img" fluid-grow alt="Responsive image" style="height:250px"/>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12 row m-t-20"> 
                  <div class="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr"> nama</div>
                  <div class="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr"> : {{index.penanggungJawab}} </div>
                </div>
                <div class="col-md-12 row"> 
                  <div class="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr"> No HP</div>
                  <div class="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr"> : {{index.noHp}} </div>
                </div>
                <div class="col-md-12 row"> 
                  <div class="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr">Lokasi</div>
                  <div class="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr"> : {{index.namaProvinsi}} </div>
                </div>
                <div class="col-md-12 row"> 
                  <div class="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr">Alamat</div>
                  <div class="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr"> : {{index.alamat}} </div>
                </div>
                <div class="col-md-12 row"> 
                  <div class="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr">Spesialis Bidang</div>
                  <div class="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr"> : {{index.spesialisBidang}} </div>
                </div>
              </div>
            </div>
          </paginate> 
          <div class="col-md-12 m-t-30 m-b-20 text-green-title1" style="text-align: right; padding:10px;" >
            <span @click="listLM(pages-1)" v-if="pages !== 1"> << previous </span>
            <span @click="listLM(pages+1)" style="padding-left:20px" v-if="pageSize > pages"> more >> </span>
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
        no_HP: '',
        alamat: '',
        provinsi: '',
        tingkatan: '',
        email: '',
        penanggung_jawab: '',
        message: '',
        token: localStorage.getItem('token_ppa'),
        profile: JSON.parse(localStorage.getItem('profile')),
        document: [],
        url_images: url.url_image,
        listing: [],
        listings: [],
        paginate: ['listing'],
        lm_id: '',
        pages: 1,
        pageSize: ''
      }
    },
    methods: {
      subContent (index) {
        return index.substring(parseInt(index.length)-2, index.length)
      },
      index (id) {
        var self = this
        let token = ''
        let urls = '/uploads/images/defaultphoto.png'
        if (self.token) {
          token = self.token
        }
        var parameter = {
          id: parseInt(id),
          token: token
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'lembagaMasyarakat_view', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let listing = response.data.lembaga_masyarakat_view
            if(listing.photo_profile!== '') {
              self.imgContent = url.url_image + listing.photo_profile
            } else {
              self.imgContent = url.url_image + urls
            }
            self.nama = listing.nama_user
            self.email = listing.email
            self.penanggung_jawab = listing.penanggung_jawab
            self.nama_jenis_lembaga = listing.nama_jenis_lembaga
            self.no_HP = listing.no_hp
            self.nama_spesial_bidang = listing.nama_spesial_bidang
            self.alamat = listing.alamat
            self.provinsi = listing.provinsi
            self.tingkatan = listing.tingkatan
            self.lm_id = listing.user_id
            if (self.profile.pengguna_level === '1' || self.profile.pengguna_level === '3') {
              self.DocumentUser(self.lm_id)
            }
            self.DaftarLM(1)
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      DocumentUser (id) {
        var self = this
        let token = ''
        let urls = '/uploads/images/defaultphoto.png'
        if (self.token) {
          token = self.token
        }
        var parameter = {
          id: parseInt(id),
          token: token
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'documentUser_list', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let listing = response.data.lembaga_masyarakat_view
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
      DaftarLM (page) {
        let self = this
        this.listings = []
        let a = ''
        let token = ''
        let lm_id = ''
        if (self.token) {
          token = self.token
        }
        var parameter = {
          id: parseInt(self.lm_id),
          "page": page
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'sdm_filter', parameter, config).then(function (response) {
          if (response.data.resultCode === 'OK') {
            var list = response.data.sdm_list;
            for (let i = 0; i < list.length; i++) {
              a = {
                id : list[i].lembaga_masyarakat_id,
                penanggungJawab : list[i].nama,
                noHp : list[i].kontak,
                namaProvinsi : list[i].nama_provinsi,
                alamat : list[i].alamat,
                spesialisBidang: list[i].nama_spesial_bidang,
                img: url.url_image + list[i].url_images,
              }
              self.listings.push(a)
            }
            self.pages = response.data.current_page
            self.pageSize = response.data.page_size
          } else {
            alert('SALAH...!')
          }
        })
      },
    },
    created: function () {
      let id = this.$route.query.id
      this.index(id)
    }
  }
</script>