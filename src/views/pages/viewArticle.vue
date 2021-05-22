<template>
  <div class="flex-row">
    <div class="container-fluid">
      <b-row>
        <div class="col-sm-6">
          <a @click="backTo" class="nav-link df nplr">
            <i class="nav-icon fas fa-arrow-left fs20 arrow-left"></i>
            <div class="text-green-title1 fs18">
                {{nama}}
            </div>
          </a>
        </div>
      </b-row>
      <b-row>
        <div class="col-12">
          <b-img class="m-t-10" :src="urlImage + image" fluid-grow alt="Responsive image" style="height:250px; border-radius: 8px"/>
              
          <b-input-group>
            <div class="m-t-10">
                {{description}}
            </div>
          </b-input-group>
        </div>
      </b-row>
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
  import Multiselect from 'vue-multiselect'
  import { url } from '../../url'
  import sha256 from 'sha256'

  export default {
    name: 'viewArticle',
    axios,
    data () {
      return {
        nama: '',
        description: '',
        token: localStorage.getItem('token_hse'),
        id: '',
        urlImage: url.url_image,
        image: ''
      }
    },
    methods: {
      submit () {

      },
      backTo () {
        let self = this
        window.history.back();
      },
      getDetail (id) {
        var self = this
        var token = self.token
        var parameter = {
          token: token,
          "id": id
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'article_view', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let dump = response.data.article_view
            self.nama = dump.nama_article
            self.description = dump.description
            self.image = dump.image
          } else {
            alert('SALAH...!')
          }
        })
      },
      submit () {
        var self = this
        var token = self.token
        var parameter = {
          token: token,
          id: self.id,
          nama: self.nama,
          description: self.description,
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'category_edit', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.$router.push('/category')
          } else {
            alert('SALAH...!')
          }
        })
      }
    },
    created: function () {
      let self = this
      console.log(self.$route.query)
      self.id = self.$route.query.id
      self.getDetail(self.id)
    }
  }
</script>
