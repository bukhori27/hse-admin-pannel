<template>
  <div class="content">
    <div class="row nmr nml">
      <div class="col-sm-12 col-xs-12 row">
        <div class="col-lg-4 col-md-6 col-xs-12" v-for="(indexs, id) in berita" style="cursor: pointer;"> 
          <div class="col-xs-12" style="border: 1px solid black; padding:10px; border-radius:10px;">
            <div class="pb8 col-12 fs20 fw600" style="text-transform: capitalize; margin: auto;"@click="detailBerita(indexs.id)" > {{indexs.title}}</div>
            <b-img :src="'/'+ indexs.id_image" fluid-grow alt="Responsive image" style="height:200px; border-radius: 8px"/>
            <div class="text-green-title1 col-12 fs12" style="margin: auto; padding:10px 15px;"> {{indexs.id_user}}, {{indexs.date}}</div>
            <div class="col-12 fs12" style="margin: auto; padding:0px 15px 10px 15px;"> {{changeStatus(indexs.status)}}</div>
            <div class="col-md-12 fs16 m-t-10 m-b-20"> 
              <span v-html="batasin(indexs.description)"> </span>
            </div>
            <div class="col-12 fs14" style="margin: auto; padding:0px 15px 10px 15px;"> {{indexs.id_category}}, {{indexs.id_location}}</div>
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
    name: 'issue',
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
        image: 'static/img/insiden/keramik.jpg',
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
        axios.post(url.url_app + 'issue_list', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.berita = response.data.issue_list
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
      changeStatus (stat) {
        if (stat === '1') {
          return 'Open'
        }else if(stat === '2') {
          return 'handle on executor'
        }else return 'closed'
      }
    },
    created: function () {
      this.listLM(this.pages)
    }
  }
</script>