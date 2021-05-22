<template>
  <div class="row m-t-20 m-b-30">
    <div class="container-fluid">
      <div class="col-sm-12 col-xs-12 " style="padding:0px 35px">
        <div class="text-green-title1 col-12 fs36 tc m-b-30"> {{title}}</div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 container5-1" style="padding-left: 10px"> 
          <b-img :src="urlImage + imgContent" fluid-grow alt="Responsive image" style="height:auto"/>
        </div>
        <div class="col-12 fs18 m-t-10 text-green-title1"> {{titles(author)}}</div>
        <div class="col-12 fs18"> {{date}}</div>
        <div class="col-md-12 fs16 m-t-10" v-html="Content"> </div>
        <div class="row m-t-30" v-for="(index, id) in comment" style="padding-left:10px;"> 
          <div class="col-12 fs18"> {{index.nama}}</div>
          <div class="col-12 fs12"> {{index.date}}</div>
          <div class="col-12 fs12"> {{index.description}}</div>
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
        urlImage: url.url_image,
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
      titles(str) {
        return str.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
      },
      paragrafCase(str) {
        var sentence = str.toLowerCase().split(" ");
        for(var i = 0; i< sentence.length; i++){
          sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
        return sentence.join(" ");
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
            self.imgContent = listing.image
            self.title = listing.nama_article
            self.Content = listing.description
            self.author = listing.author_name
            self.date = listing.date
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