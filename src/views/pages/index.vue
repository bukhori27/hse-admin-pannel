<template>
  <div class="row">
    <div class="col-md-12 img-relative pt-5 header-wrap" style="overflow: hidden;">
      <div class="curve-layer">
        <!-- <b-img src="../../../static/img/home/curve-layer.png"/> -->
        <div class="description-home">
          <!-- <h2 class="fs50" style="color:#fff;">Lembaga Masyarakat Peduli Perempuan dan Anak</h2> -->
          <h3 style="color:#fff;">Selamat Datang !</h3>
          <p class="fs20" style="color:#fff;">Lembaga Masyarakat Peduli Perempuan dan Anak</p>
          <p class="fs20" style="color:#fff;">Kami percaya Sinergi dari berbagai pihak merupakan solusi pemecahan permasalahan isu Perempuan dan Anak</p>
          <p class="fs18" style="color:#fff;"> Bantu kami untuk menciptakan Indonesia yang bebas kekerasan terhadap perempuan dan anak, bebas perdagangan orang dan bebas dari ketimpangan ekonomi bagi perempuan</p>
          <p class="fs16" style="color:#fff;">Klik tombol di bawah ini untuk partisipasi!</p>
          <a class="btn-home-header" @click="siapSinergi">Siap Sinergi</a>
        </div>
      </div>
      <div class="image-layer">
        <b-img src="../../../static/img/home/icon-footer.png"/>
      </div>
    </div>
    <div class="row m-t-40 m-b-20" style="margin:0 5%;">
      <div class="col-lg-9 col-md-9">
        <div class="row">
          <div class="fs30 col-12 text-green-title1 tc"> Kategori Berita</div>
          <div class="col-lg-4 col-md-4 col-sm-12 container5-1 card-category" style="padding: 0.5rem;border-radius:8px;" v-for="(berita , index) in berita" @click="ListBerita(berita.id)">
            <div class="col-sm-12 card-category__wrap" style="padding:0px 0px; border-radius: 4px; overflow:hidden;">
              <div class="col-md-12 img-relative" style="padding:0">
                <img :src="berita.image" fluid-grow alt="Responsive image" style="width:100%"/>
              </div>
              <div class="col-md-12 tc" style="height:100px; background:#e6e8e8;font-weight:500;">
                <div class="col-md-12 fs16 pt" style="text-transform: capitalize; padding-top:25px;line-height:16px; color:black;"> {{berita.name}} </div>
              </div>
              <div class="col-md-12 fs16" style="position:absolte;left:0;bottom:1.9em;text-align:center;font-weight:500; color:#ff3300;"> Cari > </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 container5-1" style="padding-left: 1rem; border-left: 1px solid #cecccc; "> 
        <div class="fs30 col-12 text-green-title1 tc"> Berita Terkini</div>
        <div class="col-sm-12 home-new-filter-right" v-for="(berita , index) in beritahot" @click="detailBerita(berita.id)">
          <div class="row">
            <div class="col-md-4">
              <img :src="berita.image" fluid-grow alt="Responsive image" style="width:100%;margin:30px 0 0 0;display:block;"/>
            </div>
            <div class="col-md-8">
              <div class="col-sm-12 fs20" style="padding:20px 0 0 0 ;font-weight:500;">
                {{berita.name}}
              </div>
              <div class="col-sm-12 fs16" style="padding:0px;font-weight:400;">
                {{berita.author}}
              </div><div class="col-sm-12 fs12" style="padding:10px 0;font-weight:500;">
                {{berita.date}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12" style="border-top: 1px solid #cecccc; margin-top:40px"></div>
    </div>
    <div class="col-md-12 row tc m-t-20 m-b-20">
      <div class="fs30 col-12 text-green-title1"> Daftar Lembaga Masyarakat</div>
    </div>
    <div class="row m-b-20" style="margin:0 5%;">
      <div class="col-md-9">
        <div class="col-md-12">
          <paginate name="listing" :list="listings" :per="6" class="row">
            <div v-for="(index, id) in paginated('listing')" :key="id" class="col-xl-4 col-lg-4 col-md-6 col-sm-4 fs12 list-lm-home" @click="modali(index.id)">
              <div class="list-lm-home-wrap brdr-rds-5">
                <div class="col-xs-12 img-relative p-1" style="height: 45%;overflow: hidden;">
                  <b-img :src="index.img" fluid-grow alt="Responsive image" style="width:100%"/>
                </div>
                <div class="col-xs-12 list-lm-home-wrap-text">
                  <div class="col-md-12 fs20" style="text-transform: capitalize"> {{index.namaLembaga}} </div>
                  <div class="col-md-12 col-sm-12 col-xs-12 m-t-20"> 
                    <div class="row">
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr" style="font-weight:600;color: #636363;"> Penanggung Jawab</div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr" style="color:#858b97;"> : {{index.penanggungJawab}} </div>
                    </div>
                  </div>
                  <div class="col-md-12"> 
                    <div class="row">
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr" style="font-weight:600;color: #636363;">Lokasi</div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr" style="color:#858b97;"> : {{index.namaProvinsi}} </div>
                    </div>
                  </div>
                  <div class="col-md-12"> 
                    <div class="row">
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr" style="font-weight:600;color: #636363;">Alamat</div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr" style="color:#858b97;"> : {{index.alamat}} </div>
                    </div>
                  </div>
                  <div class="col-md-12"> 
                    <div class="row">
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr" style="font-weight:600;color: #636363;">Spesialis Bidang</div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr" style="color:#858b97;"> : {{index.spesialisBidang}} </div>
                    </div>
                  </div>
                  <div class="col-md-12"> 
                    <div class="row">
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr" style="font-weight:600;color: #636363;">Jenis Lembaga</div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr" style="color:#858b97;"> : {{index.jenisLembaga}}
                    </div>
                  </div>
                </div>
               </div>
              </div>
            </div>
          </paginate>
          <div class="col-md-12  text-green-title1" style="text-align: right;" @click="goToListLm">
            more >>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="col-md-12 row" style="margin: auto; position:absolute;">
          <span class="register-custom-select-title">Provinsi</span>
          <select class="filter-custom-select m-t-10" v-model="provinceId">
            <option v-for="(provinsi, i) in provinceList" :value="provinsi.id" :key="'d' + i">{{ provinsi.nama }}</option>
          </select>
          <span class="register-custom-select-title m-t-10">Spesial Bidang</span>
          <select class="filter-custom-select m-t-10" v-model="spesialisBidangId">
            <option v-for="(spesialbidang, i) in spesialisBidangList" :value="spesialbidang.id" :key="'A' + i">{{ spesialbidang.nama }}</option>
          </select>
          <b-button button-rounded-border-radius label="Verify" rounded class="col-md-12 m-t-20 btn-login-menu" size="14" @click="filterLm" style="padding: 15px 0; border-radius:5px; margin-left:0px; margin-right:10px;">
            filter
          </b-button>
        </div>
      </div>
    </div>
    <div class="col-md-12 tc row" style="background:#efefef;">
      <div class="fs30 col-12 container5 text-green-title1" style="padding-top:30px;">
        Apa Kata Mereka
      </div>
      <div class="m-t-40 m-b-20 img-relative container7">
        <b-carousel id="carousel1"
          style="text-shadow: 1px 1px 2px #333;"
          controls
          indicators
          background="#fff"
          :interval="4000"
          v-model="slide"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd" class="row col-md-12 carousel-container"
        >
          <div v-for="(row, name) in comments">
            <b-carousel-slide img-blank img-alt="Blank image" >
              <img :src="row.url_images" class="d-block img30" width="500" height="480"/>
              <h3 v-html="row.message"></h3>
              <h5> <span>{{row.nama}}</span> - <span>{{row.jabatan}}</span>
              </h5>
            </b-carousel-slide>
          </div>
        </b-carousel>
      </div>
    </div>
    <div class="modalInovasi" style="display:none;">
      <b-modal v-model="modelInovasi">
          <img class="img-responsive" :src="srcinovasi" style="width:100%"/>
      </b-modal>
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
  // import imageInovasi from '../static/img/home/modalinovasi.pdf'

  export default {
    name: 'Index',
    axios,
    data () {
      return {
        Username: '',
        Password: '',
        currentPage: 1,
        perPage: 2,
        totalRows: 40,
        pageOptions: [ 5, 10, 15 ],
        checked: false,
        filter: '',
        listing: [],
        listings: [],
        berita: [
        ],
        beritahot: [],
        paginate: ['listing'],
        slide: 0,
        sliding: null,
        Activebar: 'Daftar',
        imgContent: '',
        Content: '',
        provinceList: [],
        provinceId: '',
        spesialisBidangId: '',
        spesialisBidangList: [],
        title: '',
        comments: [
        ],
        modelInovasi: false,
        srcinovasi: '../../../static/img/home/modalinovasi.png'
      }
    },
    methods: {
      goToCategoryNews(){

      },
      goTo (path, id) {
        let self = this
        self.$router.push(path)
      },
      changeprofit (index) {
        return index + '.00 %'
      },
      changecurrent (index) {
        // return index
        return 'Rp. ' + index.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      },
      getRowCount (items) {
        return items.length
      },
      onFiltered (filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      clickCallback: function(pageNum) {
        console.log(pageNum)
      },
      onSlideStart (slide) {
        this.sliding = true
      },
      onSlideEnd (slide) {
        this.sliding = false
      },
      modali (index) {
        let self = this
        self.$router.push('/detail-lm?id='+ index)
      },
      goToListLm () {
        let self = this
        self.$router.push('/lembaga-masyarakat')
      },
      siapSinergi () {
        let self = this
        self.$router.push('/register')
      },
      filterLm () {
        let self = this
        let provId = ''
        let specId = ''
        if (self.provinceId) {
          provId = self.provinceId
        }
        if (self.spesialisBidangId) {
          specId = self.spesialisBidangId
        }
        self.$router.push('/lembaga-masyarakat?provinceId=' + provId + '&specialBidangId=' + specId)
      },
      provincesFunc () {
        let self = this
        var parameter = {
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'provinces_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.provinceList = response.data.provinsi_list
          } else {

          }
        }) 
      },
      spesialisBidangFunc () {
        let self = this
        var parameter = {

        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'spesialBidang_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.spesialisBidangList = response.data.spesialBidang_list
            let dump = {
              id: 0,
              nama: 'Semua Bidang'
            }
            self.spesialisBidangList.push(dump)
          } else {

          }
        }) 
      },
      DaftarLM (index) {
        let self = this
        var token = ''
        let path_images = ''
        if (index) {
          token = index
        }
        var parameter = {
          token: token,
          "province_id" :"",
          "spesial_bidang": "",
          "page": 1
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'lembagaMasyarakat_Filter', parameter, config).then(function (response) {
          if (response.data.resultCode === 'OK') {
            var list = response.data.lembaga_masyarakat_list;
            for (let i = 0; i < list.length; i++) {
              if (list[i].photo_profile) {
                path_images = url.url_image + list[i].photo_profile
              } else { 
                path_images = url.url_image + '/uploads/images/defaultphoto.png'
              }
              let a = {
                id: list[i].lembaga_masyarakat_id,
                penanggungJawab : list[i].penanggung_jawab,
                noHp : list[i].no_hp,
                namaLembaga : list[i].nama_organisasi,
                namaProvinsi : list[i].nama_provinsi,
                alamat : list[i].alamat,
                spesialisBidang: list[i].nama_spesial_bidang,
                jenisLembaga: list[i].nama_jenis_lembaga,
                img: path_images
              }
              self.listings.push(a)
            }

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
                author : list[i].author_name,
                id: list[i].id
              }
              self.beritahot.push(a)
            }

          } else {
            alert('SALAH...!')
          }
        })
      },
      beritaIndex () {
        this.berita = [
          {
            'name' : 'Berita KPP PA',
            'image' : url.url_image+ '/uploads/img/home/KPPPA.jpg',
            id : 1
          },
          {
            'name' : 'Berita Forum Puspa',
            'image' : url.url_image+ '/uploads/img/home/FORUM-PUSPA.jpg',
            id : 2
          },
          {
            'name' : 'Berita Lembaga Masyarakat',
            'image' : url.url_image+ '/uploads/img/home/LM.jpg',
            id : 3
          }
        ]
      },
      detailBerita (id) {
        let self = this
        self.$router.push('/detail-berita?id=' + id)
      },
      ListBerita (id) {
        let self = this
        self.$router.push('/berita?categoryId=' + id)
      },
      QuoteFunc () {
        let self = this
        var parameter = {
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'quote_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let quote = response.data.quote_list
            for (let i = 0; i <quote.length; i++){
              let a = {
                id: quote[i].id,
                nama: quote[i].nama,
                jabatan: quote[i].jabatan,
                message: quote[i].message,
                url_images: url.url_image + quote[i].url_images,
              } 
              self.comments.push(a)
            }
          } else {

          }
        }) 
      }
    },
    created: function () {
      let token= localStorage.getItem('token_ppa');
      // this.Daftarclick('Daftar')
      this.beritaIndex();
      this.DaftarLM(token);
      this.DaftarTop3Article();
      this.provincesFunc();
      this.spesialisBidangFunc();
      this.QuoteFunc()
    }
  }
</script>