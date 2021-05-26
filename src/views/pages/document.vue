<template>
  <div class="app flex-row">
    <div class="container-fluid">
      <div class="row nmr nml">
        <div class="col-sm-12 col-xs-12 row" style="padding:10px 35px;">
        
          <div class="m-t-30 col-lg-4 col-md-6 col-xs-12" v-for="(indexs, id) in berita" style="cursor: pointer;" @click="detailBerita(urlImage + indexs.image)" > 
            <div class="col-xs-12" style="border: 1px solid black; padding:10px; border-radius:10px;">
              <div class="text-green-title1 col-12 fs18" style="text-transform: capitalize; margin: auto;"> {{indexs.name}}</div>
              <b-img :src="'static/img/icons/pdf.jpg'" fluid-grow alt="Responsive image" style="height:250px; border-radius: 8px"/>
              <div class="text-green-title1 col-12 fs12" style="margin: auto; padding:10px 15px;"> {{indexs.author}}, {{indexs.date}}</div>
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
        token: localStorage.getItem('token_ppa'),
        urlImage: url.url_image,
        pages: 1,
        pageSize: '',
        more: false
      }
    },
    methods: {
      batasin (index) {
        if (index.length > 200) this.more = true
        return index.substr(0, 200) + ' ... ';
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
        axios.post(url.url_app + 'document_list', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.berita = response.data.document_list
            self.pages = response.data.current_page
            self.pageSize = response.data.page_size
          } else {
            alert('SALAH...!')
          }
        })
      },
      detailBerita (url) {
        console.log(url)
        let self = this
        window.open(url);
      },
    },
    created: function () {
      this.listLM(this.pages)
    }
  }
</script>