<template>
  <div class="row m-t-60 m-b-30">
    <div class="col-lg-12 col-sm-12 col-md-12 container6 row">
      <div class="col-lg-7 col-md-7 col-sm-12 row container5-1 ">
        <div class="text-green-title1 col-12 fs36 tc m-b-30"> {{title}}</div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 container5-1" style="padding-left: 10px"> 
          <b-img :src="imgContent" fluid-grow alt="Responsive image" style="height:auto"/>
        </div>
        <div class="col-md-12 fs16 m-t-10" v-html="Content"> 
        </div>
        <div class="row m-t-30" v-for="(index, id) in comment" style="padding-left:10px;"> 
          <div class="col-12 fs18"> {{index.nama}}</div>
          <div class="col-12 fs12"> {{index.email}}, {{index.date}}</div>
          <div class="col-12 fs12"> {{index.description}}</div>
        </div>
        <div class="m-t-20" style="border-top: 1px solid black;"> <p> </p> </div>
        <div class="row col-md-12" style="display:block; padding:0;">
          <b-input-group class="m-t-20 col-md-12" style="padding:0 0 0 25px;" v-if="!token">
            <input type="text" v-model="namaUser" class="form-control mb-4 col-md-12" placeholder="nama">
          </b-input-group>
          <b-input-group class=" col-md-12" style="padding:0 0 0 25px;" v-if="!token">
            <input type="text" v-model="email" class="form-control mb-4  col-md-12" placeholder="email">
          </b-input-group>
          <b-input-group class=" col-md-12" style="padding:0 0 0 25px;" v-if="!token">
            <textarea type="text" v-model="message" class="form-control mb-4  col-md-12" placeholder="message" style="height: 100px;"/>
          </b-input-group>
          <b-input-group class=" col-md-12 m-t-20" style="padding:0 0 0 25px;" v-if="token">
            <textarea type="text" v-model="message" class="form-control mb-4  col-md-12" placeholder="message" style="height: 100px;"/>
          </b-input-group>
          <div class="col-md-4 row m-b-10" style="padding:0; float:right; display:block;">
            <b-button button-rounded-border-radius label="Verify" rounded class="col-md-12" size="14" @click="submit" style="background:#6cbf16; color:white; padding: 20px 0 20px 20px; border-radius:5px;">
              submit
            </b-button>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 row " style="padding-left: 100px; display: block;">
        <div class="col-12 nplr">Terkini</div>
        <div class="col-sm-12 news-filter-right" style="border: 1px solid grey; margin-top:10px; " v-for="(artikel , index) in beritahot">
          <div class="row">
            <div class="col-md-4">
              <img :src="artikel.image" fluid-grow alt="Responsive image" style="width:100%;margin:30px 0 0 0;display:block;"/>
            </div>
            <div class="col-md-8">
              <div class="col-sm-12 fs16" style="padding:20px 0 0 0 ;font-weight:600;">
                {{artikel.name}}
              </div>
              <div class="col-sm-12 fs14" style="padding:0px;font-weight:400;">
                {{artikel.author}}
              </div><div class="col-sm-12 fs12" style="padding:10px 0;font-weight:500;">
                {{artikel.date}}
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 nplr m-t-30">Terpopuler</div>
        <div class="col-sm-12 news-filter-right" style="border: 1px solid grey; margin-top:10px; " v-for="(artikel , index) in beritahot" @click="detailBerita(artikel.id)">
          <div class="row">
            <div class="col-md-4">
              <img :src="artikel.image" fluid-grow alt="Responsive image" style="width:100%;margin:30px 0 0 0;display:block;"/>
            </div>
            <div class="col-md-8">
              <div class="col-sm-12 fs16" style="padding:20px 0 0 0 ;font-weight:600;">
                {{artikel.name}}
              </div>
              <div class="col-sm-12 fs14" style="padding:0px;font-weight:400;">
                {{artikel.author}}
              </div><div class="col-sm-12 fs12" style="padding:10px 0;font-weight:500;">
                {{artikel.date}}
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
    name: 'berita',
    axios,
    data () {
      return {
        slide: 0,
        sliding: null,
        berita: [],
        imgContent: '',
        title: '',
        Content: '',
        author: '',
        date: '',
        email: '',
        namaUser: '',
        message: '',
        token: localStorage.getItem('token_ppa'),
        newsupdate: [],
        beritahot: [],
        berita: [],
        beritaId: '',
        comment: []
      }
    },
    methods: {
      subContent (index) {
        return index.substring(parseInt(index.length)-2, index.length)
      },
      index (id) {
        var self = this
        var parameter = {
          id: parseInt(id),
          token: self.token
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'article_view', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let listing = response.data.article_view
            self.imgContent = url.url_image + listing.url_images
            self.title = listing.nama_article
            self.Content = listing.description
            self.author = listing.author
            self.date = listing.date
            self.comment = response.data.comment_list
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      DaftarTop3Article () {
        let self = this
        var parameter = {
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'top_3_article', parameter, config).then(function (response) {
          if (response.data.resultCode === 'OK') {
            var list = response.data.article_list;
            for (let i = 0; i < list.length; i++) {
              let a = {
                name : list[i].nama,
                image : url.url_image + list[i].url_images,
                date : list[i].date,
                author : list[i].author_name
              }
              self.beritahot.push(a)
            }

          } else {
            alert('SALAH...!')
          }
        })
      },
      news_terupdate () {
        let self = this
        var parameter = {
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'new_3_article', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            var list = response.data.article_list
            for (let i = 0; i < list.length; i++) {
              let a = {
                name : list[i].nama,
                image : url.url_image + list[i].url_images,
                date : list[i].date,
                author : list[i].author_name
              }
              self.newsupdate.push(a)
            }
            self.pages = response.data.current_page
            self.pageSize = response.data.page_size
          } else {
            alert('SALAH...!')
          }
        })
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
      }
    },
    created: function () {
      let id = this.$route.query.id
      this.beritaId = id
      this.DaftarTop3Article()
      this.news_terupdate()
      this.index(id)
    }
  }
</script>