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
                <label style="width: 100%; font-weight:600">Foto Lembaga Masyarakat</label>
                <input type="file" class="form-control mb-4 border-radius-8" placeholder="pilih file" @change="openFile($event, 1)">
                <b-button v-b-tooltip.hover title="foto Lembaga Masyarakat" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Nama Organisasi / Lembaga / Komunitas</label>
                <input type="text" v-model="namaOrganisasi" class="form-control mb-4 border-radius-8" placeholder="Nama Organisasi/Lembaga/Komunitas">
                <b-button v-b-tooltip.hover title="Diisi Nama Organisasi/Lembaga/Komunitas sesuai dengan nama legal" class="tooltips-custom">?</b-button>
              </b-input-group>

              <b-input-group>
                <label style="width: 100%; font-weight:600">Provinsi</label>
                  <select class="register-custom-select" v-model="provinceId" @change="regenciesFunc()">
                    <option v-for="(provinsi, i) in provinceList" :value="provinsi.id" :key="'d' + i">{{ provinsi.nama }}</option>
                  </select>
                  <b-button v-b-tooltip.hover title="Pilih Provinsi" class="tooltips-custom">?</b-button>
              </b-input-group>
              <!-- <b-input-group>
                Kota
                  <select v-model="kotaId"  style="margin-left:10px;" >
                    <option v-for="(kota, i) in regenciesList" :value="kota.value" :key="'e' + i">{{ kota.nama }}</option>
                  </select>
              </b-input-group> -->
              <b-input-group class="m-t-20">
                <label style="width: 100%; font-weight:600">Alamat</label>
                <input type="text" v-model="alamat" class="form-control mb-4 border-radius-8" placeholder="Alamat">
                <b-button v-b-tooltip.hover title="Breakdown Provinsi, Breakdown Kota, Manual Alamat lengkap" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Email</label>
                <input type="email" v-model="email" class="form-control mb-4 border-radius-8" placeholder="email">
                <b-button v-b-tooltip.hover title="Digunakan untuk masuk ke dalam akun anda" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Password</label>
                <input type="password" v-model="Password" class="form-control mb-4 border-radius-8" placeholder="password">
                <b-button v-b-tooltip.hover title="Digunakan untuk masuk ke dalam akun anda" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Konfirmasi Password</label>
                <input type="password" v-model="cPassword" class="form-control mb-4 border-radius-8" placeholder="confirm password">
                <b-button v-b-tooltip.hover title="Digunakan untuk masuk ke dalam akun anda" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Penanggung Jawab</label>
                <input type="text" v-model="penanggung_jawab" class="form-control mb-4 border-radius-8" placeholder="penanggung jawab">
                <b-button v-b-tooltip.hover title="Penanggung Jawab Organisasi/Lembaga/Komunitas" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group>
                <label style="width: 100%; font-weight:600">Kontak Organisasi</label>
                <input type="text" v-model="no_hp" class="form-control mb-4 border-radius-8" placeholder="kontak">
                <b-button v-b-tooltip.hover title="Kontak Organisasi/Lembaga/Komunitas yg dapat dihubungi" class="tooltips-custom">?</b-button>
              </b-input-group>
              <div class="col-md-12 row m-b-10" style="padding:0 0 0 15px">
                <b-button button-rounded-border-radius label="Verify" variant="primary" rounded class="col-md-12" size="14" @click="step1Submit" style="color:white; padding: 20px 0; border-radius:5px;">
                  Berikutnya
                </b-button>
              </div>
            </div>
            <div id="step2" style="display: none" class="col-md-12 npr">
              <b-input-group>
                <label style="width: 100%; font-weight:600">Spesialis Bidang</label>
                  <select class="register-custom-select" v-model="spesialisBidangId" @change="spesialisBidangFuncChange()">
                    <option v-for="(spesialbidang, i) in spesialisBidangList" :value="spesialbidang.id" :key="'A' + i">{{ spesialbidang.nama }}</option>
                  </select>
                  <b-button v-b-tooltip.hover title="Pilih Berdasarkan Bidang Spesial" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group class="m-t-20 m-b-20">
                <label style="width: 100%; font-weight:600">Jenis Lembaga</label>
                  <select class="register-custom-select" v-model="jenisLembagaId">
                    <option v-for="(jenislembaga, i) in jenisLembagaList" :value="jenislembaga.id" :key="'B' + i">{{ jenislembaga.nama }}</option>
                  </select>
                  <b-button v-b-tooltip.hover title="Pilih Jenis Lembaga" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group id="akta_pendirian" class="m-t-20">
                <label style="width: 100%; font-weight:600">Akta Pendirian</label>
                <input type="file" class="form-control mb-4 border-radius-8" placeholder="pilih file" @change="openFile($event, 2)">
                <b-button v-b-tooltip.hover title="Akta Pendirian dikeluarkan oleh notaris yang memuat AD/ART" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group id="Kegiatan_bidang_ppa" class="row col-12">
                <label style="width: 100%; font-weight:600">Kegiatan bidang PP PA</label>
                <div class="col-md-11 row npr">
                  <input class="border-radius-8" type="radio" id="ada" value="ya" v-model="selectedKegiatan" v-on:change="selectedKegiatanFunc">
                  <label for="ya" style="margin-left:5px; margin-right:20px;">ada</label>
                  <br>
                  <input class="border-radius-8" type="radio" id="tidakAda" value="tidak" v-model="selectedKegiatan" checked v-on:change="selectedKegiatanNoneFunc">
                  <label for="tidak" style="margin-left:5px;">tidak ada </label>
                </div>
                <div class="col-md-2 row npr" style="float:right; margin-left: -7px;">
                  <b-button v-b-tooltip.hover title="Pilihan Ya/Tidak, Ya Sebutkan Kegiatannya" class="tooltips-custom" style="float:right">?</b-button>
                </div>
                <b-input-group id="kegiatanBidang" style="display:none;" class="m-t-10">
                  <input type="text" v-model="kegiatan_bidang" class="form-control mb-4 border-radius-8" placeholder="kegiatan bidang">
                </b-input-group>
              </b-input-group>
              <b-input-group id="struktur_organisasi">
                <label style="width: 100%; font-weight:600">Struktur Organisasi</label>
                <input type="file" class="form-control mb-4 border-radius-8" placeholder="pilih file" @change="openFile($event, 3)">
                <b-button v-b-tooltip.hover title="Sesuai dengan AD/ART" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group id="sk_domisili">
                <label style="width: 100%; font-weight:600">Surat Keterangan Domisili</label>
                <input type="file" class="form-control mb-4 border-radius-8" placeholder="pilih file" @change="openFile($event, 4)">
                <b-button v-b-tooltip.hover title="dari Kelurahan/Desa dan Kecamatan" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group id="npwp_ogranisasi">
                <label style="width: 100%; font-weight:600">NPWP Organisasi</label>
                <input type="file" class="form-control mb-4 border-radius-8" placeholder="pilih file" @change="openFile($event, 5)">
                <b-button v-b-tooltip.hover title="Atas Nama Organisasi" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group id="sk_kemenkumhan">
                <label style="width: 100%; font-weight:600">SK Kemenkumham/SKT Kemendagri</label>
                <input type="file" class="form-control mb-4 border-radius-8" placeholder="pilih file" @change="openFile($event, 6)">
                <b-button v-b-tooltip.hover title="SK Kemenkumham bagi Organisasi yang berbadan hukum berupa yayasan atau perkumpulan SKT Kemendagri bagi Organisasi tdk berbadan hukum" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group id="cabang">
                <div class="row">
                  <div class="col-md-12">
                    <label style="width: 100%; font-weight:600">Cabang</label>
                    <input type="radio" id="ya" value="ya" v-model="selectedCabang" v-on:change="selectedCabangfunc">
                    <label for="ya" style="margin-left:5px; margin-right:20px;">ya</label>
                    <br>
                    <input type="radio" id="tidak" value="tidak" v-model="selectedCabang" checked v-on:change="selectedCabangnoneFunc">
                    <label for="tidak" style="margin-left:5px;">tidak</label>
                  </div>
                </div>
                <div class="row">
                  <b-input-group class="col-md-9" id="cabangList" style="display:none !important;">
                    <span class="register-custom-select-title">provinsi</span>
                      <select class="register-custom-select" style="width:100%" v-model="provinceIdCabang">
                        <option v-for="(cabang, i) in provinceList" :value="cabang" :key="'cabang' + i">{{ cabang.nama }}</option>
                      </select>
                      <div v-for="(value, i) in cabang" class="row pt-2 pb-2 "> 
                        <div class="col-md-9" style="color:#636363;font-weight:600">{{value.nama}}</div>
                        <div class="col-md-3" @click="deleted(i)"><div title="hapus" style="cursor: pointer;color: white;background: red;border-radius: 50%;font-weight: bold;width: 23px;height: 23px;text-align: center;">x</div></div>
                      </div>
                  </b-input-group>
                  <div class="col-md-3" id="cabangTambah" style="display:none !important;">
                    <b-button title="tambah" style="background-color:#38a9ff;color:white; border-radius:5px; margin-top: 1.4em;width: 100%;" @click="tambahCabang">tambah</b-button>
                  </div>
                </div>
              </b-input-group>
              <b-input-group id="PSW">
                <label style="width: 100%; font-weight:600">PSW/PSGA</label>
                <input type="file" class="form-control mb-4 border-radius-8" placeholder="pilih file" @change="openFile($event, 7)">
                <b-button v-b-tooltip.hover title="SK PSW/PSGA" class="tooltips-custom">?</b-button>
              </b-input-group>
              <b-input-group id="Akreditasi">
                <label style="width: 100%; font-weight:600">Akreditasi</label>
                <input type="file" class="form-control mb-4 border-radius-8" placeholder="pilih file"
                @change="openFile($event, 8)">
                <b-button v-b-tooltip.hover title="Sertifikat Akreditasi" class="tooltips-custom">?</b-button>
              </b-input-group>
              <div class="col-md-12 row m-b-10 m-t-20" style="padding:0 0 0 15px">
                <b-button button-rounded-border-radius label="Verify" variant="primary" rounded class="col-md-12" size="14" @click="Register" style="color:white; padding: 20px 0; border-radius:5px;">
                  Submit
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

  export default {
    name: 'Register',
    axios,
    data () {
      return {
        Username: '',
        namaOrganisasi: '',
        Password: '',
        email: '',
        cPassword: '',
        checked: false,
        listing: {},
        provinceList: [],
        provinceId: '',
        kotaId: '',
        no_hp: '',
        alamat: '',
        penanggung_jawab: '',
        spesialisBidangId: '',
        provinceIdCabang: [],
        cabang: [],
        jenisLembagaId: '',
        regenciesList: [],
        spesialisBidangList: [],
        jenisLembagaList: [],
        selectedCabang: 'tidak',
        selectedKegiatan: 'tidak',
        photo_profile: '',
        akta_pendirian: '',
        npwp_lembaga: '',
        struktur_organisasi: '',
        sk_domisili: '',
        kegiatan_bidang: '',
        sk_kemenkumham: '',
        akreditasi: '',
        psw_psga: '',
      }
    },
    methods: {
      openFile(event, type) {
        var self = this
        var input = event.target;
        if (type === 1) {
          self.photo_profile = input.files[0];
        } else if (type === 2) {
          self.akta_pendirian = input.files[0];
        } else if (type === 3) {
          self.struktur_organisasi = input.files[0];
        } else if (type === 4) {
          self.sk_domisili = input.files[0];
        } else if (type === 5) {
          self.npwp_lembaga = input.files[0];
        } else if (type === 6) {
          self.sk_kemenkumham = input.files[0];
        } else if (type === 7) {
          self.akreditasi = input.files[0];
        } else if (type === 8) {
          self.psw_psga = input.files[0];
        }
      },
      Register () {
        var self = this
        let milikicabang = []
        console.log(self.cabang)
        for (let i = 0; i<self.cabang.length; i++) {
          let a = {
            id: self.cabang[i].id
          }
          milikicabang.push(a)
        }
        console.log(milikicabang)
        let fd = new FormData()
        let token = localStorage.getItem('token_ppa')
        fd.append('password', sha256(this.Password))
        fd.append('email', this.email)
        fd.append('photo_profile', self.photo_profile)
        fd.append('alamat', self.alamat)
        fd.append('no_hp', self.no_hp)
        fd.append('nama_organisasi', self.namaOrganisasi)
        fd.append('penanggung_jawab', self.penanggung_jawab)
        fd.append('spesialis_bidang_id', self.spesialisBidangId)
        fd.append('jenis_lembaga_id', self.jenisLembagaId)
        fd.append('province_id', self.provinceId)
        fd.append('kota_id', '')
        fd.append('npwp_lembaga', self.npwp_lembaga)
        fd.append('akta_pendirian', self.akta_pendirian)
        fd.append('struktur_organisasi', self.struktur_organisasi)
        fd.append('sk_domisili', self.sk_domisili)
        fd.append('kegiatan_bidang', self.kegiatan_bidang)
        fd.append('sk_kemenkumham', self.sk_kemenkumham)
        fd.append('memiliki_cabang', JSON.stringify(milikicabang))
        fd.append('akreditasi', self.akreditasi)
        fd.append('psw_psga', self.psw_psga)
        let urls = url.url_app + 'signup_user'
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
      },
      provincesFunc () {
        let self = this
        var parameter = {
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'provinces_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.provinceList = response.data.provinsi_list
          } else {
            let error = response.data.resultCode
            alert(error);
          }
        }) 
      },
      tambahCabang() {
        let self = this
        self.cabang.push(this.provinceIdCabang)
      },
      deleted(index) {
        this.cabang.splice(index, 1);
      },
      regenciesFunc () {
        let self = this
        console.log(self.provinceId)
        var parameter = {
          province_id: 15
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'regencies_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.regenciesList = response.data.kabupaten_list
          } else {

          }
        }) 
      },
      spesialisBidangFuncChange () {
        let self = this
        console.log(self.spesialisBidangId)
        if (self.spesialisBidangId === "1" || self.spesialisBidangId === "2") {
          document.getElementById("akta_pendirian").style.display = "flex";
          document.getElementById("Kegiatan_bidang_ppa").style.display = "flex";
          document.getElementById("struktur_organisasi").style.display = "flex";
          document.getElementById("npwp_ogranisasi").style.display = "flex";
          document.getElementById("sk_domisili").style.display = "flex";
          document.getElementById("sk_kemenkumhan").style.display = "flex";
          document.getElementById("cabang").style.display = "flex";
          
          document.getElementById("PSW").style.display = "none";
          document.getElementById("Akreditasi").style.display = "none";
        }
        else if (self.spesialisBidangId === "3" || self.spesialisBidangId === "5" || 
        self.spesialisBidangId === "6") {
          document.getElementById("akta_pendirian").style.display = "flex";
          document.getElementById("Kegiatan_bidang_ppa").style.display = "none";
          document.getElementById("struktur_organisasi").style.display = "flex";
          document.getElementById("npwp_ogranisasi").style.display = "flex";
          document.getElementById("sk_domisili").style.display = "flex";
          document.getElementById("sk_kemenkumhan").style.display = "flex";
          document.getElementById("cabang").style.display = "none";
          
          document.getElementById("PSW").style.display = "none";
          document.getElementById("Akreditasi").style.display = "none";
        }
        else if (self.spesialisBidangId === "4") {
          document.getElementById("akta_pendirian").style.display = "none";
          document.getElementById("Kegiatan_bidang_ppa").style.display = "none";
          document.getElementById("struktur_organisasi").style.display = "none";
          document.getElementById("npwp_ogranisasi").style.display = "none";
          document.getElementById("sk_domisili").style.display = "none";
          document.getElementById("sk_kemenkumhan").style.display = "none";
          document.getElementById("cabang").style.display = "none";

          document.getElementById("PSW").style.display = "flex";
          document.getElementById("Akreditasi").style.display = "flex";
        }
        else if (self.spesialisBidangId === "7" || self.spesialisBidangId === "8") {
          document.getElementById("akta_pendirian").style.display = "none";
          document.getElementById("Kegiatan_bidang_ppa").style.display = "none";
          document.getElementById("struktur_organisasi").style.display = "none";
          document.getElementById("npwp_ogranisasi").style.display = "none";
          document.getElementById("sk_domisili").style.display = "none";
          document.getElementById("sk_kemenkumhan").style.display = "none";
          document.getElementById("cabang").style.display = "none";

          document.getElementById("PSW").style.display = "none";
          document.getElementById("Akreditasi").style.display = "none";
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
        axios.post(url.url_app + 'spesialBidang_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.spesialisBidangList = response.data.spesialBidang_list
            self.spesialisBidangId = self.spesialisBidangList[0].id
            if (self.spesialisBidangId === "1" || self.spesialisBidangId === "2") {
              document.getElementById("akta_pendirian").style.display = "flex";
              document.getElementById("Kegiatan_bidang_ppa").style.display = "flex";
              document.getElementById("struktur_organisasi").style.display = "flex";
              document.getElementById("npwp_ogranisasi").style.display = "flex";
              document.getElementById("sk_domisili").style.display = "flex";
              document.getElementById("sk_kemenkumhan").style.display = "flex";
              document.getElementById("cabang").style.display = "flex";
              
              document.getElementById("PSW").style.display = "none";
              document.getElementById("Akreditasi").style.display = "none";
            }
          } else {

          }
        }) 
      },
      selectedKegiatanFunc() {
        document.getElementById("kegiatanBidang").style.display = "flex";
      },
      selectedKegiatanNoneFunc () {
        document.getElementById("kegiatanBidang").style.display = "none";
      },
      jenisLembagaFunc () {
        let self = this
        var parameter = {

        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'jenisLembaga_Filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.jenisLembagaList = response.data.jenisLembaga_list
            self.jenisLembagaId = self.jenisLembagaList[0].id
          } else {

          }
        }) 
      },
      selectedCabangfunc() {
        document.getElementById("cabangList").style.display = "block";
        document.getElementById("cabangTambah").style.display = "block";
      },
      selectedCabangnoneFunc() {
        document.getElementById("cabangTambah").style.display = "none";
        document.getElementById("cabangList").style.display = "none";

      },
      step1Submit() {

        if (this.namaOrganisasi === '' || this.namaOrganisasi === null) {
          return alert ('silakan isi nama organisasi')
        }

        if (this.email === '' || this.email === null) {
          return alert ('silakan isi email kamu')
        }
        if (this.Password === '' || this.Password === null) {
          return alert ('silakan isi password kamu')
        }

        if (this.cPassword === '' || this.cPassword === null) {
          return alert ('silakan isi konfirmasi password')
        }

        if (this.Password !== this.Password) {
          return alert ('konfirmasi password tidak sama')
        }
        else {
          document.getElementById("step1").style.display = "none";
          document.getElementById("step2").style.display = "block";
        }
      }
    },
    created: function () {
      this.provincesFunc()
      this.spesialisBidangFunc()
      this.jenisLembagaFunc()
    }
  }
</script>
