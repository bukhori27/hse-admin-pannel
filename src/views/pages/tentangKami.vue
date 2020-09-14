<template>
  <div class="row m-t-30">
    <div class="col-md-12 footer1-left row">
      <div class="col-lg-8 col-md-7 col-sm-12 row container5-1">
        <div class="text-green-title1 col-12 fs36"> {{listing.title}}</div>
        <div class="col-md-12 fs16 m-t-10" v-html="listing.description"> 
        </div>
      </div>
      <div class="col-lg-4 col-md-5 col-sm-12" style="padding-left: 10px"> 
        <b-img :src="image" fluid-grow alt="Responsive image" style="height:250px"/>
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

  export default {
    name: 'tentangKami',
    axios,
    data () {
      return {
        slide: 0,
        sliding: null,
        listing: [],
        url_image: '',
        image: ''
      }
    },
    methods: {
      index () {
        var self = this
        self.url_image = 'http://localhost/admin-ecommerce/'
        var parameter = {
          name_article: "Cerita Kami"
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'article_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.listing = response.data.article_list[0]
            self.image = self.url_image + self.listing.url_images
          } else {
            alert('SALAH...!')
          }
        }) 
      }
    },
    created: function () {
      this.index()
    }
  }
</script>