<template>
  <div class="row m-t-60 m-b-30">
    <div class="col-lg-12 col-sm-12 col-md-12 container6 row">
      <div class="col-lg-11 col-md-11 col-sm-12 row container5-1 " v-if="token">
        <div class="text-green-title1 col-12 fs24 tc m-b-10 title-forum"> {{namaForum}}</div>
        <div class="col-12 fs16 m-b-10 "> Provinsi : {{provinsiForum}}</div>
        <div class="col-12 fs16 m-b-10 "> Deskripsi : {{descriptionForum}}</div>
        <div class="row m-t-30 col-md-12" v-for="(index, id) in comment" style="padding-left:10px;"> 
          <div class="col-12 fs18"> {{index.username}}</div>
          <div class="col-12 fs12"> {{index.date}}</div>
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
          <div class="col-md-2 row m-b-10" style="padding:0; float:right; display:block;">
            <b-button button-rounded-border-radius label="Verify" rounded class="col-md-12" size="14" @click="submit" style="background:#6cbf16; color:white; padding: 20px 0 20px 20px; border-radius:5px;">
              submit
            </b-button>
          </div>
        </div>
      </div>
      <div class="col-lg-11 col-md-11 col-sm-12 row container5-1 " v-else> 
        <div class="text-green-title1 col-12 fs24 tc m-b-10 title-forum m-t-20"> Anda belum login</div>
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
        namaForum: '',
        message: '',
        descriptionForum: '',
        provinsiForum: '',
        token: localStorage.getItem('token_ppa'),
        beritahot: [
          {
            'name' : 'Berita Anak di Jawa Barat',
            author: 'admin provinsi',
            date: '2019-05-05',
            id : 1
          },
          {
            'name' : 'Berita Ketahanan Rumah Tangga',
            author: 'admin provinsi',
            date: '2019-05-05',
            id : 2
          },
          {
            'name' : 'Berita Ketahanan Rumah Tangga',
            author: 'admin provinsi',
            date: '2019-05-05',
            id : 3
          }
        ],
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
          forum_thread_id: parseInt(id),
          token: self.token
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'forum_thread_view', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let forum_thread_view = response.data.forum_thread_view
            self.descriptionForum = forum_thread_view.description
            self.provinsiForum = forum_thread_view.provinsi
            self.comment = response.data.reply_list
          } else {
            // alert('anda harus login')
          }
        }) 
      },
      submit () {
        var self = this
        let profile = JSON.parse(localStorage.getItem('profile'))
        var parameter = { 
          token: self.token,
          forum_thread_id: self.beritaId,
          description: self.message
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'forum_reply_add', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            alert('berhasil di submit')
            self.index(self.beritaId)
            self.message = ''
          } else {
          }
        }) 
      }
    },
    created: function () {
      let id = this.$route.query.id
      this.namaForum = this.$route.query.nama
      this.beritaId = id
      this.index(id)
    }
  }
</script>