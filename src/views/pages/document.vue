<template>
  <div class="app flex-row">
    <div class="container-fluid">
      <div class="row nmr nml">
        <div class="col-sm-12 col-xs-12 row">
          <div class="m-t-30 col-lg-4 col-md-6 col-xs-12" v-for="(indexs, id) in berita" style="cursor: pointer;"> 
            <div class="col-xs-12" style="border: 1px solid black; padding:10px; border-radius:10px;">
              <div class="text-green-title1 col-12 fs18" style="text-transform: capitalize; margin: auto;"@click="detailBerita(indexs.id)" > {{indexs.nama}}</div>
              
              <div class="col-12">
                <b-img :src="'/' + indexs.url_images" fluid-grow alt="Responsive image" style="height:200px; border-radius: 8px"/>
              </div>
              <div class="text-green-title1 col-12 fs12" style="margin: auto; padding:10px 15px;"> {{indexs.author}}, {{indexs.date}}</div>
              <div class="col-md-12 fs16 m-t-10 m-b-20"> 
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
        berita: [],
        token: localStorage.getItem('token_hse'),
        urlImage: url.url_image,
        pages: 1,
        pageSize: '',
        more: false,
        image: 'static/img/icons/profile.jpeg',
      }
    },
    methods: {
      batasin (index) {
        if (index.length > 100) this.more = true
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
        var parameter = {
          token: token,
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
    },
    created: function () {
      this.listLM(this.pages)
    }
  }
</script>