<template>
  <div class="row m-t-30">
    <div class="col-md-12 skema-left1 row">
      <div class="col-lg-12 col-md-12 col-sm-12 row npr">
        <div class="col-lg-12 col-md-12 col-sm-12 row sm-npr" style="padding: 0 0 10px 0; border-radius: 0 0 10px 10px; border: 1px solid black;">
            <div class="col-md-2 tc section-skema" :class="{active:Activebar ==='profile'}" @click="Daftarclick('profile')"> Ubah Profile </div>
            <div class="col-md-2 tc section-skema" :class="{active:Activebar ==='bank'}" @click="Daftarclick('bank')"> Ubah Akun Bank </div>
            <div class="col-md-2 tc section-skema" :class="{active:Activebar ==='tarik'}" @click="Daftarclick('tarik')"> Tarik Pendanaan</div>
            <div class="col-md-3 tc section-skema" :class="{active:Activebar ==='resume'}" @click="Daftarclick('resume')"> Resume Project </div>
            <div class="col-md-3 tc section-skema" :class="{active:Activebar ==='topup'}" @click="Daftarclick('topup')"> Topup Wallet</div>
            <div class="col-lg-12 col-md-12 col-sm-12 row m-t-30 skema-left2">
              <div class="col-lg-12 col-md-12 col-sm-12 row text-skema-top-sm m-t-60" v-if="activedash ===''">
                <div class="col-lg-12 col-md-12 col-sm-12 fs16 tc"> Anda belum menambahkan Nomor Rekening yang akan anda gunakan
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3"></div>
              <div class="col-lg-6 col-md-6 col-sm-6 row text-skema-top-sm m-b-40" v-if="activedash ===''">
                <div class="col-md-12 row m-t-20 tc" style="padding:0">
                  <b-button button-rounded-border-radius label="Verify" rounded class="col-md-12" size="14"  @click="tambah_akun" style="background:#6cbf16; color:white; padding: 20px 0 20px 20px; border-radius:5px; margin-left:15px; margin-right:-15px;">
                   <i class="fa fa-plus-circle fs24" style="padding-right:10px;"></i>  Tambahkan akun bank sekarang
                  </b-button>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3"></div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 row m-t-30 skema-left2" v-if="activedash ==='next'">
              <div class="col-lg-4 col-md-4 col-sm-4"></div>
              <div class="col-lg-4 col-md-4 col-sm-4 row text-skema-top-sm">
                <div class="col-md-12 fs16 tc"> Tambah Nomor Rekening
                </div>
                <div class="col-md-12 fs16 m-t-40"> Nama Akun Bank
                </div>
                <b-input-group>
                  <input type="text" v-model="account_bank" class="form-control mb-4" placeholder="Input Email">
                </b-input-group>
                <div class="col-md-12 fs16"> Pilih Bank anda
                </div>
                <b-input-group class="col-sm-12 col-md-12 col-lg-12 nplr" id="input_bank">
                  <v-select v-model="selected" :options="options" class="col-sm-12 col-md-12 col-lg-12 nplr"></v-select>
                </b-input-group>
                <div class="col-md-12 fs16 m-t-20"> Tambah Nomor Rekening
                </div>
                <b-input-group>
                  <input type="text" v-model="account_bank" class="form-control mb-4" placeholder="Input Email">
                </b-input-group>
                <b-input-group class="col-md-6"></b-input-group>
                <b-input-group class="col-md-6 nplr m-b-20">
                  <b-button button-rounded-border-radius label="Verify" rounded class="col-md-12" size="14" @click="simpan_account" style="background:#6cbf16; color:white; padding: 10px 0; border-radius:5px;">
                    Simpan Akun Bank
                  </b-button>
                </b-input-group>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4"></div>
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
    name: 'Topup',
    axios,
    data () {
      return {
        Username: '',
        Password: '',
        checked: false,
        Activebar: 'topup',
        activedash: '',
        listing: {},
        token: localStorage.getItem('token_rise'),
        account_bank: '',
        options: [],
        selected: {id: '', label: 'please select bank'},
      }
    },
    methods: {
      Daftarclick (index) {
        let dump = ''
        if (index === 'profile') {
          dump = ''
        }
        if (index === 'bank') {
          dump = 'account-bank'
        }
        if (index === 'tarik') {
          dump = 'tarik-pendanaan'
        }
        if (index === 'resume') {
          dump = 'resume-project'
        }
        if (index === 'topup') {
          dump = 'topup'
        }
        this.$router.push('/user/' + dump)
        // this.Activebar = index
      },
      simpan () {
        console.log(location.hostname)
      },
      view_bank () {
        let var_dump = []
        let self = this
        var parameter = {
          token: this.token
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'bank_user_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let a = response.data
            console.log(a)
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      index () {
        let var_dump = []
        let self = this
        var parameter = {
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'bank_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.listing = response.data.bank_list
            for (let i = 0; i < self.listing.length; i++ ) {
              let a = {
                id: self.listing[i].id_bank,
                label: self.listing[i].nama,
              }
              var_dump.push(a)
            }
            self.options = var_dump
            console.log(var_dump)
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      simpan_account () {
        let var_dump = []
        let self = this
        console.log(self.selected)
        var parameter = {
          nama_account: this.name_account_bank,
          token: this.token,
          id_bank: this.selected.id,
          nomor_rekening: this.nomor_rekening,
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'bank_user_add', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.listing = response.data.bank_list
            
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      tambah_akun () {
        this.activedash = 'next'
      }
    },
    created: function () {
      this.index()
      this.view_bank()
    }
  }
</script>
