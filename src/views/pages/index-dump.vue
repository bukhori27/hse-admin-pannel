<template>
  <div class="app flex-row">
    <div class="container-fluid">
      <b-row class="justify-content-center nmr nml">
        <div class="col-md-8 col-sm-12 col-lg-6 col-xl-6 col-xs-12" style="padding-right: 0px;" >
          <div id="pt-pgSignin" class="col-md-12 row register-form">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 tc">
              <!-- <b-img src="static/img/icons/logo.png" alt="Responsive image" style="height:60px; width:70px;"/> -->
              <h1 class="m-b-50">Login</h1> 
            </div>
            <b-input-group>
              <input type="text" v-model="Username" class="form-control mb-4" placeholder="username" v-on:keyup.enter="submit">
            </b-input-group>
            <b-input-group>
              <input type="password" v-model="Password" class="form-control mb-4" placeholder="password" v-on:keyup.enter="submit">
            </b-input-group>
            <div class="col-md-12 row m-b-10" style="padding:0">
              <b-button button-rounded-border-radius label="Verify" rounded class="col-md-12" size="14" @click="login" style="background:#f58931; color:white; padding: 20px 0; border-radius:5px; margin-left:15px; margin-right:-15px;">
                Login
              </b-button>
            </div>
          </div>
        </div>
      </b-row>
      <div class="row nmr nml">
        <div class="col-sm-12 col-xs-12 row">
          <div class="m-t-30 col-lg-4 col-md-6 col-xs-12" v-for="(indexs, id) in berita" style="cursor: pointer;"> 
            <div class="col-xs-12" style="border: 1px solid black; padding:10px; border-radius:10px;">
              <div class="text-green-title1 col-12 fs18" style="text-transform: capitalize; margin: auto;"@click="detailBerita(indexs.id)" > {{indexs.nama}}</div>
              <b-img :src="'/'+ indexs.url_images" fluid-grow alt="Responsive image" style="height:250px; border-radius: 8px"/>
              <div class="text-green-title1 col-12 fs12" style="margin: auto; padding:10px 15px;"> {{indexs.author}}, {{indexs.date}}</div>
              <div class="col-md-12 fs16 m-t-10 m-b-50"> 
                <span v-html="batasin(indexs.description)"> </span>
                <p v-if="more" class="m-t-10" @click="detailBerita(indexs.id)" style="color:blue;">More >> </p>
              </div>
            </div>
            <div class="col-md-12 m-t-10" style="border-top: 1px solid #cecccc; display:none;"></div>
          </div>
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
        newsupdate: [],
        beritahot: [],
        berita: [],
        token: localStorage.getItem('token_hse'),
        urlImage: url.url_image,
        pages: 1,
        pageSize: '',
        Categoryid: '',
        more: false,
        Username: '',
        Password: '',
        checked: false,
        listing: {}
      }
    },
    methods: {
      batasin (index) {
        if (index.length >100) this.more = true
        return index.substr(0, 100) + ' ... ';
      },
      listLM (page) {
        var self = this
        let status = []
        let dump2 =''
        var token = ''
        let catId = ''
        if (self.token) {
          token = self.token
        }
        console.log(self.token)
        var parameter = {
          "page": page
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'article_list', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.berita = response.data.article_list
            self.pages = response.data.current_page
            self.pageSize = response.data.page_size
          } else {
            alert('SALAH...!')
          }
        })
      },
      detailBerita (id) {
        let self = this
        self.$router.push('/detail-berita?id=' + id)
      },
      login () {
        var self = this
          // self.$router.push('/dashboard')
          self.token = url.token
          // localStorage.setItem('token_hse', self.token)
        var parameter = {
          username: self.Username,
          password: sha256(self.Password)
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'signin', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.listing = response.data
            localStorage.setItem('token_hse', self.listing.token)
            localStorage.setItem('profile', JSON.stringify(self.listing.profile))
            self.$router.push('/dashboard')
          } else {
            alert('SALAH...!')
          }
        })
      },
      submit () {
        let self = this
        if (!self.Username) return alert('SALAH...!')
        if (!self.Password) return alert('SALAH...!')
        else self.login()
      },
      onLogin() {
        this.isConnected = true
      },
      onLogout() {
        this.isConnected = false;
      },
      getIP () {
        console.log(location.hostname)
      }
    },
    created: function () {
      this.listLM(this.pages)
    }
  }
</script>