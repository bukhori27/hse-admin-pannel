<template>
  <div class="row m-t-60">
    <div class="col-lg-12 col-sm-12 col-md-12 container6 row">
      <div class="col-lg-7 col-md-7 col-sm-12 row container5-1">
        <div class="text-green-title1 col-12 fs28 tc"> Setting</div>
        <div class="row m-t-30 nplr" v-for="(index, id) in berita"> 
          <div class="col-lg-6 col-md-6 col-sm-12 npl"> 
            <b-img :src="index.imgContent" fluid-grow alt="Responsive image" style="height:250px"/>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 row">
            <div class="text-green-title1 col-12 fs36"> {{index.title}}</div>
            <div class="text-green-title1 col-12 fs12"> {{index.author}}, {{index.date}}</div>
            <div class="text-green-title1 col-12 fs12"> {{index.category}}</div>
            <div class="col-md-12 fs16 m-t-10 m-b-50"> 
              <span v-html="index.Content"></span>
            </div>
          </div>
          <div class="col-md-12 m-t-30" style="border-top: 1px solid grey;"></div>
        </div>
        <div class="col-md-12 m-t-30 npr" style="text-align: right;">
          more
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 row " style="padding-left: 100px; display: block;">
        <div class="col-12 nplr">Terkini</div>
        <div class="col-sm-12" style="padding:20px 0; border: 1px solid grey; margin-top:10px; " v-for="(artikel , index) in beritahot">
          <div class=" col-12 fs18"> {{artikel.name}}</div>
          <div class="text-green-title1 col-12 fs12"> {{artikel.author}}, {{artikel.date}}</div>
        </div>
        <div class="col-12 nplr m-t-30">Terpopuler</div>
        <div class="col-sm-12" style="padding:20px 0; border: 1px solid grey; margin-top:10px; " v-for="(artikel , index) in beritahot">
          <div class=" col-12 fs18"> {{artikel.name}}</div>
          <div class="text-green-title1 col-12 fs12"> {{artikel.author}}, {{artikel.date}}</div>
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
        berita: []
      }
    },
    methods: {
      index () {
        this.berita = [
          {
            title: 'berita anak', 
            author: 'admin provinsi',
            date: '2019-05-05',
            category: 'Anak',
            imgContent: '../static/img/home/tani1.png',
            Content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          }
        ]
      },
      subContent (index) {
        return index.substring(parseInt(index.length)-2, index.length)
      }
    },
    created: function () {
      this.index()
    }
  }
</script>