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
            <div class="col-lg-12 col-md-12 col-sm-12 row m-t-30 skema-left2">
              <div class="col-lg-12 col-md-12 col-sm-12 row text-skema-top-sm tc" v-if="activedash ===''">
                <div class="col-md-12 fs16"> resume
                </div>
              </div>
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
    name: 'Resume',
    axios,
    data () {
      return {
        Username: '',
        Password: '',
        checked: false,
        Activebar: 'resume',
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
