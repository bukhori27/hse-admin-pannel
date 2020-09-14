<template>
  <div class="row m-t-60">
    <div class="col-lg-12 col-sm-12 col-md-12 container6 row">
      <div class="col-lg-7 col-md-7 col-sm-12 row container5-1">
        <div class="text-green-title1 col-12 fs28 tc"> Berita</div>
        <div class="row m-t-30 nplr" v-for="(indexs, id) in berita" @click="detailBerita(indexs.id)" style="cursor: pointer;"> 
          <div class="col-lg-5 col-md-6 col-sm-12 npl"> 
            <b-img :src="urlImage + indexs.url_images" fluid-grow alt="Responsive image" style="height:250px; border-radius: 8px"/>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 row">
            <div class="text-green-title1 col-12 fs28" style="text-transform: capitalize; margin: auto;"> {{indexs.nama_article}}</div>
            <div class="text-green-title1 col-12 fs12" style="margin: auto; padding:10px 15px;"> {{indexs.author_name}}, {{indexs.date}}</div>
            <div class="text-green-title1 col-12 fs12" style="margin: auto;"> {{indexs.nama_category}}</div>
            <div class="col-md-12 fs16 m-t-10 m-b-50"> 
              <span v-html="batasin(indexs.description)"></span>
            </div>
          </div>
          <div class="col-md-12 m-t-30" style="border-top: 1px solid #cecccc;"></div>
        </div>
        <div class="col-md-12 m-t-30 m-b-20 text-green-title1" style="text-align: right; padding:10px;" >
          <span @click="listLM(pages-1)" v-if="pages !== 1"> << previous </span>
          <span @click="listLM(pages+1)" style="padding-left:20px" v-if="pageSize > pages"> more >> </span>
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 row " style="padding-left: 100px; display: block;">
        <div class="col-12 nplr" style='font-weight: 500;'>Terkini</div>
        <div class="col-sm-12 news-filter-right" v-for="(artikel , index) in newsupdate">
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
        <div class="col-12 nplr m-t-30" style='font-weight: 500;'>Terpopuler</div>
        <div class="col-sm-12 news-filter-right" style="padding:20px 0; border: 1px solid #cecccc; margin-top:10px;border-radius:8px;" v-for="(artikel , index) in beritahot" @click="detailBerita(artikel.id)">
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
        newsupdate: [],
        beritahot: [],
        berita: [],
        token: localStorage.getItem('token_ppa'),
        urlImage: url.url_image,
        pages: 1,
        pageSize: '',
        Categoryid: ''
      }
    },
    methods: {
      batasin (index) {
        return index.substr(0, 200);
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
        if (self.Categoryid) {
          catId = self.Categoryid
        }
        var parameter = {
          token: token,
          "category": catId,
          "province_id": "",
          "page": page
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'article_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.berita = response.data.article_list
            self.pages = response.data.current_page
            self.pageSize = response.data.page_size
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
      subContent (index) {
        return index.substring(parseInt(index.length)-2, index.length)
      },
      detailBerita (id) {
        let self = this
        self.$router.push('/detail-berita?id=' + id)
      },
    },
    created: function () {
      this.Categoryid = this.$route.query.categoryId
      this.DaftarTop3Article()
      this.news_terupdate()
      this.listLM(this.pages)
    }
  }
</script>