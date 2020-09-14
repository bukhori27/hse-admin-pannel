<template>
  <div class="row m-t-30">
    <div class="col-md-12 skema-left1 row">
      <div class="col-lg-12 col-md-12 col-sm-12 row npr">
        <div class="col-lg-12 col-md-12 col-sm-12 row sm-npr" style="padding: 0 0 10px 0; border-radius: 0 0 10px 10px; border: 1px solid black;">
            <div class="col-md-2 tc section-skema" :class="{active:Activebar ==='profile'}" @click="Daftarclick('profile')"> Ubah Profile </div>
            <div class="col-md-2 tc section-skema" :class="{active:Activebar ==='bank'}" @click="Daftarclick('bank')"> Ubah Akun Bank </div>
            <div class="col-md-2 tc section-skema" :class="{active:Activebar ==='tarik'}" @click="Daftarclick('tarik')"> Tarik Pendanaan</div>
            <div class="col-md-3 tc section-skema" :class="{active:Activebar ==='resume'}" @click="Daftarclick('resume')"> Resume Project </div>
            <div class="col-md-3 tc section-skema" :class="{active:Activebar ==='toupup'}" @click="Daftarclick('topup')"> Topup Wallet</div>
            <div class="col-lg-12 col-md-12 col-sm-12 row m-t-30 skema-left2" v-if="Activebar === 'tarik'">
              <div class="col-lg-12 col-md-12 col-sm-12 row text-skema-top-sm tc">
                <div class="col-md-12 fs16"> tarik
                </div>
              </div>
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
                  <b-button button-rounded-border-radius label="Verify" rounded class="col-md-12" size="14" @click="simpan" style="background:#6cbf16; color:white; padding: 10px 0; border-radius:5px;">
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
    name: 'Tarik',
    axios,
    data () {
      return {
        Username: '',
        Password: '',
        checked: false,
        Activebar: 'tarik',
        activedash: '',
        listing: {},
        token: localStorage.getItem('token_rise'),
        account_bank: '',
        options: [      
          {id: 1, label: 'foo'},
          {id: 3, label: 'bar'},
          {id: 2, label: 'baz'},
        ],
        selected: {id: 3, label: 'bar'},
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
      index () {
        if (this.token === null) {
          this.$router.push('/')
        }
      },
      tambah_akun () {
        this.activedash = 'next'
      }
    },
    created: function () {
      this.index()
    }
  }
</script>
