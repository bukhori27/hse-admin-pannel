<template>
  <div class="flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <div class="col-md-8 col-sm-12 col-lg-6 col-xl-6 col-xs-12">
          <div id="pt-pgSignin" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row npr">
            <div class="col-md-12"><h1 class="tc m-b-50">Register</h1> </div>
            <!-- step1 -->

            <div id="step1" class="col-md-12 npr">
              <b-input-group>
                <div class="row">
                  <div class="col-md-12">
                    <label style="width: 100%; font-weight:600">Type User</label>
                    <input type="radio" id="lm" value="1" v-model="selectedTypeUser" v-on:change="selectedtypefunc(1)">
                    <label for="ya" style="margin-left:5px; margin-right:20px;">Lembaga Masyarakat</label>
                    <br>
                    <input type="radio" id="individu" value="2" v-model="selectedTypeUser" v-on:change="selectedtypefunc(2)"">
                    <label for="tidak" style="margin-left:5px;">Individu</label>
                  </div>
                </div>
              </b-input-group>
              <b-input-group id="lm_nama">
                <label style="width: 100%; font-weight:600">Nama Organisasi / Lembaga / Komunitas</label>
                <input type="text" v-model="namaOrganisasi" class="form-control mb-4 border-radius-8" placeholder="Nama Organisasi/Lembaga/Komunitas">
                <b-button v-b-tooltip.hover title="Diisi Nama Organisasi/Lembaga/Komunitas sesuai dengan nama legal" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group id="lm2">
                <label style="width: 100%; font-weight:600">Spesialis Bidang</label>
                  <select class="register-custom-select  mb-4" v-model="spesialisBidangId">
                    <option v-for="(spesialbidang, i) in spesialisBidangList" :value="spesialbidang.id" :key="'A' + i">{{ spesialbidang.nama }}</option>
                  </select>
                  <b-button v-b-tooltip.hover title="Pilih Berdasarkan Bidang Spesial" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group id="lm3">
                <label style="width: 100%; font-weight:600">Nama Kontak</label>
                <input type="text" v-model="penanggung_jawab" class="form-control mb-4 border-radius-8" placeholder="penanggung jawab">
                <b-button v-b-tooltip.hover title="Penanggung Jawab Organisasi/Lembaga/Komunitas" class="tooltips-custom">?</b-button>
              </b-input-group>

              <b-input-group id="lm4" class="row col-12">
                <label style="width: 100%; font-weight:600">Legalitas Lembaga Masyarakat</label>
                <div class="col-md-11 row npr  mb-4">
                  <input class="border-radius-8" type="radio" id="ada" value="ya" v-model="selectedlegalitas" v-on:change="selectedlegalitasfunc('ya')">
                  <label for="ya" style="margin-left:5px; margin-right:20px;">ya</label>
                  <br>
                  <input class="border-radius-8" type="radio" id="tidakAda" value="tidak" v-model="selectedlegalitas" v-on:change="selectedlegalitasfunc('tidak')">
                  <label for="tidak" style="margin-left:5px;">tidak ada </label>
                </div>
                <div class="col-md-2 row npr" style="float:right; margin-left: -7px;">
                  <b-button v-b-tooltip.hover title="Pilihan Ya/Tidak, Ya masukkan SK Kemenkumham/SK Kesbangpol/Ijin lainnya" class="tooltips-custom" style="float:right">?</b-button>
                </div>
                <b-input-group id="legalitas" style="display:none;" class="m-t-10">
                <input type="file" class="form-control mb-4 border-radius-8" placeholder="pilih file" @change="openFile($event, 1)">
                </b-input-group>
              </b-input-group>
              <b-input-group id="individu1" style="display:none;">
                <label style="width: 100%; font-weight:600">Nama</label>
                <input type="text" v-model="penanggung_jawab" class="form-control mb-4 border-radius-8" placeholder="penanggung jawab">
                <b-button v-b-tooltip.hover title="Nama" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Nomor Kontak</label>
                <input type="text" v-model="no_hp" class="form-control mb-4 border-radius-8" placeholder="kontak">
                <b-button v-b-tooltip.hover title="Kontak Organisasi/Lembaga/Komunitas yg dapat dihubungi" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Email</label>
                <input type="email" v-model="email" class="form-control mb-4 border-radius-8" placeholder="email">
                <b-button v-b-tooltip.hover title="Digunakan untuk masuk ke dalam akun anda" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group class="m-t-10">
                <label style="width: 100%; font-weight:600">Upload Foto Kegiatan  </label>
                <input type="file" class="form-control mb-4 border-radius-8" placeholder="pilih file" @change="openFile($event, 2)">
                <b-button v-b-tooltip.hover title="maks 5 foto, maks 250kb/foto" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group class="m-t-10">
                <label style="width: 100%; font-weight:600">Surat Rekomendasi</label>
                <input type="file" class="form-control mb-4 border-radius-8" placeholder="pilih file" @change="openFile($event, 3)">
                <b-button v-b-tooltip.hover title="maks 5 foto, maks 250kb/foto" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Website</label>
                <input type="text" v-model="website" class="form-control mb-4 border-radius-8" placeholder="website">
                <b-button v-b-tooltip.hover title="link website" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Link liputan media</label>
                <input type="text" v-model="link_media" class="form-control mb-4 border-radius-8" placeholder="link liputan media">
                <b-button v-b-tooltip.hover title="link liputan media" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Sosial Media</label>
                <input type="text" v-model="sosmed" class="form-control mb-4 border-radius-8" placeholder="sosial media">
                <b-button v-b-tooltip.hover title="link sosial media" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Unique code</label>
                <input type="text" v-model="uniquecode" class="form-control mb-4 border-radius-8" readonly>
                <b-button v-b-tooltip.hover title="unique code" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Inovasi Bidang</label>
                  <select class="register-custom-select  mb-4" v-model="inovasiBidang">
                    <option v-for="(inovasibidang, i) in inovasiBidangList" :value="inovasibidang.id" :key="'A' + i">{{ inovasibidang.nama }}</option>
                  </select>
                  <b-button v-b-tooltip.hover title="Pilih Berdasarkan Bidang Spesial" class="tooltips-custom">?</b-button>
              </b-input-group>
              <div class="col-md-12 row m-b-10" style="padding:0 0 0 15px">
                <b-button button-rounded-border-radius label="Verify" variant="primary" rounded class="col-md-5" size="14" @click="step1Submit" style="color:white; padding: 20px 0; border-radius:5px;">
                  Berikutnya
                </b-button>

                <div class="col-md-1"></div>
                <b-button button-rounded-border-radius label="Verify" variant="primary" rounded class="col-md-5" size="14" @click="faq" style="color:white; padding: 20px 0; border-radius:5px;">
                  FAQ
                </b-button>
              </div>
            </div>
            <div id="step2" style="display: none" class="col-md-12 npr">
              <b-input-group>
                <label style="width: 100%; font-weight:600">Judul Inovasi </label>
                <input type="text" v-model="judul_inovasi" class="form-control mb-4 border-radius-8" placeholder="Judul Inovasi  ">
                <b-button v-b-tooltip.hover title="Judul Inovasi" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Masalah apa saja yang dihadapi sebelum dilaksanakannya inovasi?</label>
                <input type="text" v-model="q1" class="form-control mb-4 border-radius-8" placeholder="Masalah apa saja yang dihadapi sebelum dilaksanakannya inovasi?">
                <b-button id="tooltip1" class="tooltips-custom">?</b-button>
                <b-tooltip show target="tooltip1">{{text1}}</b-tooltip>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Apa hal yang mendasar sehingga inovasi ini dikatakan kreatif dan inovatif?</label>
                <input type="text" v-model="q2" class="form-control mb-4 border-radius-8" placeholder="Apa hal yang mendasar sehingga inovasi ini dikatakan kreatif dan inovatif?">
                <b-button id="tooltip2" class="tooltips-custom">?</b-button>
                <b-tooltip show target="tooltip2">{{text2}}</b-tooltip>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Bagaimana inovasi dilaksanakan selama ini?</label>
                <input type="text" v-model="q3" class="form-control mb-4 border-radius-8" placeholder="Bagaimana inovasi dilaksanakan selama ini?">
                <b-button id="tooltip3" class="tooltips-custom">?</b-button>
                <b-tooltip show target="tooltip3">{{text3}}</b-tooltip>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Sumber daya apa saja yang digunakan untuk inovasi dan bagaimana sumber daya tersebut dimobilisasi?</label>
                <input type="text" v-model="q4" class="form-control mb-4 border-radius-8" placeholder="Sumber daya apa saja yang digunakan untuk inovasi dan bagaimana sumber daya tersebut dimobilisasi?">
                <b-button id="tooltip4" class="tooltips-custom">?</b-button>
                <b-tooltip show target="tooltip4">{{text4}}</b-tooltip>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Apa saja keluaran (output) yang dinilai paling berhasil dari pelaksanaan inovasi?</label>
                <input type="text" v-model="q5" class="form-control mb-4 border-radius-8" placeholder="Apa saja keluaran (output) yang dinilai paling berhasil dari pelaksanaan inovasi?">
                <b-button id="tooltip5" class="tooltips-custom">?</b-button>
                <b-tooltip show target="tooltip5">{{text5}}</b-tooltip>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Bagaimana cara pemantauan penerapan inovasi?</label>
                <input type="text" v-model="q6" class="form-control mb-4 border-radius-8" placeholder="Bagaimana cara pemantauan penerapan inovasi?">
                <b-button id="tooltip6" class="tooltips-custom">?</b-button>
                <b-tooltip show target="tooltip6">{{text6}}</b-tooltip>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Apa yang menjadi kendala utama dalam pelaksanaan inovasi dan bagaimana mengatasi kendala tersebut?</label>
                <input type="text" v-model="q7" class="form-control mb-4 border-radius-8" placeholder="Apa yang menjadi kendala utama dalam pelaksanaan inovasi dan bagaimana mengatasi kendala tersebut?">
                <b-button id="tooltip7" class="tooltips-custom">?</b-button>
                <b-tooltip show target="tooltip7">{{text7}}</b-tooltip>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Apa saja manfaaat yang telah dihasilkan oleh inovasi?</label>
                <input type="text" v-model="q8" class="form-control mb-4 border-radius-8" placeholder="Apa saja manfaaat yang telah dihasilkan oleh inovasi?">
                <b-button id="tooltip8" class="tooltips-custom">?</b-button>
                <b-tooltip show target="tooltip8">{{text8}}</b-tooltip>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Apakah inovasi yang telah dilaksanakan sifatnya berkesinambungan?</label>
                <input type="text" v-model="q9" class="form-control mb-4 border-radius-8" placeholder="Apakah inovasi yang telah dilaksanakan sifatnya berkesinambungan?">
                <b-button id="tooltip9" class="tooltips-custom">?</b-button>
                <b-tooltip show target="tooltip9">{{text9}}</b-tooltip>
              </b-input-group>
              <div class="col-md-12 row m-b-10 m-t-20" style="padding:0 0 0 15px">
                <b-button button-rounded-border-radius label="Verify" variant="primary" rounded class="col-md-5" size="14" @click="Register" style="color:white; padding: 20px 0; border-radius:5px;">
                  Submit
                </b-button>
                <div class="col-md-1"></div>
                <b-button button-rounded-border-radius label="Verify" variant="primary" rounded class="col-md-5" size="14" @click="faq" style="color:white; padding: 20px 0; border-radius:5px;">
                  FAQ
                </b-button>
              </div>
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
  import Multiselect from 'vue-multiselect'
  import { url } from '../../url'
  import sha256 from 'sha256'
  import { Texting } from '../../mixins/text'

  export default {
    name: 'Register',
    axios,
    mixins: [
      Texting
    ],
    data () {
      return {
        Username: '',
        namaOrganisasi: '',
        email: '',
        cPassword: '',
        checked: false,
        listing: {},
        no_hp: '',
        penanggung_jawab: '',
        spesialisBidangId: '',
        spesialisBidangList: [],
        selectedTypeUser: 1,
        selectedlegalitas: 'tidak',
        sk_domisili: '',
        foto_kegiatan: '',
        sk: '',
        inovasiBidang: '',
        inovasiBidangList: '',
        website: '',
        link_media: '',
        sosmed: '',
        uniquecode: '',
        judul_inovasi: '',
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
        q6: '',
        q7: '',
        q8: '',
        q9: '',
        text1: '',
        text2: '',
        text3: '',
        text4: '',
        text5: '',
        text6: '',
        text7: '',
        text8: '',
        text9: '',
        urlFaq: '../../../static/img/home/faq.docx'
      }
    },
    methods: {
      openFile(event, type) {
        var self = this
        var input = event.target;
        if (type === 1) {
          self.sk = input.files[0];
        }
        else if (type === 2) {
          self.foto_kegiatan = input.files[0];
        }
        else if (type === 3) {
          self.sk_domisili = input.files[0];
        }
      },
      Register () {
        var self = this

        let fd = new FormData()
        fd.append('email', this.email)
        fd.append('no_hp', self.no_hp)
        fd.append('nama_organisasi', self.namaOrganisasi)
        fd.append('unique_code', self.uniquecode)
        fd.append('type_user_inovasi', self.selectedTypeUser)
        fd.append('penanggung_jawab', self.penanggung_jawab)
        fd.append('spesialis_bidang_id', self.spesialisBidangId)
        fd.append('sk_domisili', self.sk_domisili)
        fd.append('foto_kegiatan', self.foto_kegiatan)
        fd.append('sk_kemenkumham', self.sk)
        fd.append('website', self.website)
        fd.append('link_liputan_media', self.link_media)
        fd.append('inovasi_bidang_id', self.inovasiBidang)
        fd.append('sosmed', self.sosmed)
        fd.append('judul_inovasi', self.judul_inovasi)
        fd.append('q1', self.q1)
        fd.append('q2', self.q2)
        fd.append('q3', self.q3)
        fd.append('q4', self.q4)
        fd.append('q5', self.q5)
        fd.append('q6', self.q6)
        fd.append('q7', self.q7)
        fd.append('q8', self.q8)
        fd.append('q9', self.q9)
        let urls = url.url_app + 'signup_user_inovasi'
        var del = confirm('Apakah anda sudah yakin')
        if (del) {
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
                self.$router.push('/')
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
      spesialisBidangFunc () {
        let self = this
        var parameter = {

        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'spesialBidangInovasi_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.spesialisBidangList = response.data.spesialBidangInovasi_list
          } else {

          }
        }) 
      },
      inovasiBidangFunc () {
        let self = this
        var parameter = {

        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'inovasiBidang_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.inovasiBidangList = response.data.inovasiBidang_list
          } else {

          }
        }) 
      },
      selectedtypefunc(type) {
       if (type === 1) {
        document.getElementById("lm_nama").style.display = "flex";
        document.getElementById("lm2").style.display = "flex";
        document.getElementById("lm3").style.display = "flex";
        document.getElementById("lm4").style.display = "flex";
        document.getElementById("individu1").style.display = "none";       
       } else {

        document.getElementById("lm_nama").style.display = "none";
        document.getElementById("lm2").style.display = "none";
        document.getElementById("lm3").style.display = "none";
        document.getElementById("lm4").style.display = "none";
        document.getElementById("individu1").style.display = "flex";
       }
      },
      selectedlegalitasfunc (type){
       if (type === 'ya') {
        document.getElementById("legalitas").style.display = "flex";      
       } else {
        document.getElementById("legalitas").style.display = "none";
       }
      },
      step1Submit() {
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "block";
      },
      uniquecodefunc (length) {
         var result           = '';
         var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
         var charactersLength = characters.length;
         for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
         }
        this.uniquecode = result
      },

      faq () {
        let self = this
        window.open(self.urlFaq);
        // self.$router.push('/document?url='+ url + '&id=' + id)
      },
    },
    created: function () {
      this.text1= this.title1
      this.text2= this.title2
      this.text3= this.title3
      this.text4= this.title4
      this.text5= this.title5
      this.text6= this.title6
      this.text7= this.title7
      this.text8= this.title8
      this.text9= this.title9

      this.spesialisBidangFunc()
      this.inovasiBidangFunc()
      this.uniquecodefunc(6)
    }
  }
</script>
