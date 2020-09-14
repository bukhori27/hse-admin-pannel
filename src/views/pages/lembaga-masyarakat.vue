<template>
  <div class="m-t-60">
    <div class="col-md-12">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="text-green-title1 col-12 fs28 tc"> Lembaga Masyarakat</div>
          <div class="col-md-12 row m-t-50">
            <div class="col-md-12 row m-b-20">
              <div class="col-md-4 row" style="text-align: left">
                <span class="register-custom-select-title col-md-4" style="padding-top:10px">Provinsi</span>
                <select class="filter-custom-select m-t-10 col-md-8" v-model="provinceId">
                  <option v-for="(provinsi, i) in provinceList" :value="provinsi.id" :key="'d' + i">{{ provinsi.nama }}</option>
                </select>
              </div>
              <div class="col-md-4 row" style="text-align: left">
                <span class="register-custom-select-title col-md-4" style="padding-top:10px">Spesial Bidang</span>
                <select class="filter-custom-select m-t-10 col-md-8" v-model="spesialBidangId">
                  <option v-for="(spesialbidang, i) in spesialisBidangList" :value="spesialbidang.id" :key="'A' + i">{{ spesialbidang.nama }}</option>
                </select>
              </div>
              <div class="col-md-3 row" style="text-align: left; margin-left:10px">
                <b-button button-rounded-border-radius label="Verify" rounded class="col-md-12 btn-login-menu" size="14" @click="DaftarLM(1)" style="padding: 15px 0; border-radius:5px; margin-left:0px; margin-right:10px;">
                  filter
                </b-button>
              </div>
            </div>
            <div class="col-md-12">
              <paginate name="listing" :list="listings" :per="15" class="row" v-if="listings.length>0">
                <div v-for="(index, id) in paginated('listing')" :key="id" class="col-xl-4 col-lg-5 col-md-5 col-sm-6 fs12" style="padding: 0px 15px 20px 15px;" @click="modali(index.id)">
                  <div class="row brdr-rds-5" style="border: 1px solid grey; margin-right:5px; padding-bottom:15px">
                    <div class="col-md-12 m-t-20 m-b-10 img-relative">
                      <b-img :src="index.img" fluid-grow alt="Responsive image" style="height:250px"/>
                    </div>
                    <div class="col-md-12 fs20" style="text-transform: capitalize"> {{index.namaLembaga}} </div>
                    <div class="col-md-12 col-sm-12 col-xs-12 row m-t-20"> 
                      <div class="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr"> Penanggung Jawab</div>
                      <div class="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr"> : {{index.penanggungJawab}} </div>
                    </div>
                    <div class="col-md-12 row"> 
                      <div class="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr"> No HP</div>
                      <div class="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr"> : {{index.noHp}} </div>
                    </div>
                    <div class="col-md-12 row"> 
                      <div class="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr">Lokasi</div>
                      <div class="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr"> : {{index.namaProvinsi}} </div>
                    </div>
                    <div class="col-md-12 row"> 
                      <div class="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr">Alamat</div>
                      <div class="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr"> : {{index.alamat}} </div>
                    </div>
                    <div class="col-md-12 row"> 
                      <div class="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr">Spesialis Bidang</div>
                      <div class="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr"> : {{index.spesialisBidang}} </div>
                    </div>
                    <div class="col-md-12 row"> 
                      <div class="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-xs-6 npr">Jenis Lembaga</div>
                      <div class="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-6 nplr"> : {{index.jenisLembaga}}
                    </div>
                   </div>
                  </div>
                </div>
              </paginate> 
              <div v-else>
                tidak ada lembaga
              </div>
              <div class="col-md-12 m-t-30 m-b-20 text-green-title1" style="text-align: right; padding:10px;" >
                <span @click="DaftarLM(pages-1)" v-if="pages !== 1"> << previous </span>
                <span @click="DaftarLM(pages+1)" style="padding-left:20px" v-if="pageSize > pages"> more >> </span>
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
    name: 'carapemodalan',
    axios,
    data () {
      return {
        slide: 0,
        sliding: null,
        listing: [],
        listings: [],
        paginate: ['listing'],
        token: localStorage.getItem('token_ppa'),
        spesialBidangId: '',
        provinceId: '',
        provinceList: [],
        spesialisBidangList: [],
        pages: 1,
        pageSize: 0
      }
    },
    methods: {
      changeprofit (index) {
        return index + '.00 %'
      },
      changecurrent (index) {
        // return index
        return 'Rp. ' + index.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      },
      modali (index) {
        let self = this
        self.$router.push('/detail-lm?id='+ index)
      },
      DaftarLM (page) {
        let self = this
        this.listings = []
        let a = ''
        let provId = ''
        let specId = ''
        if (self.spesialBidangId) {
          specId = self.spesialBidangId
        }
        if (self.provinceId) {
          provId = self.provinceId
        }
        var parameter = {
          token: self.token,
          "province_id" : provId,
          "spesial_bidang": specId,
          "page": page
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'lembagaMasyarakat_Filter', parameter, config).then(function (response) {
          if (response.data.resultCode === 'OK') {
            console.log(response.data.lembaga_masyarakat_list);
            var list = response.data.lembaga_masyarakat_list;
            for (let i = 0; i < list.length; i++) {
              if(list[i].photo_profile !== '') {
                a = {
                  id : list[i].lembaga_masyarakat_id,
                  penanggungJawab : list[i].penanggung_jawab,
                  noHp : list[i].no_hp,
                  namaLembaga : list[i].nama_organisasi,
                  namaProvinsi : list[i].nama_provinsi,
                  alamat : list[i].alamat,
                  spesialisBidang: list[i].nama_spesial_bidang,
                  jenisLembaga: list[i].nama_jenis_lembaga,
                  img: url.url_image + list[i].photo_profile,
                }
              }
              else {
                a = {
                  id : list[i].lembaga_masyarakat_id,
                  penanggungJawab : list[i].penanggung_jawab,
                  noHp : list[i].no_hp,
                  namaLembaga : list[i].nama_organisasi,
                  namaProvinsi : list[i].nama_provinsi,
                  alamat : list[i].alamat,
                  spesialisBidang: list[i].nama_spesial_bidang,
                  jenisLembaga: list[i].nama_jenis_lembaga,
                  img: url.url_image + '/uploads/images/defaultphoto.png'
                }
              }
              self.listings.push(a)
            }
            self.pages = response.data.current_page
            self.pageSize = response.data.page_size
          } else {
            alert('SALAH...!')
          }
        })
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
      }
    },
    created: function () {
      this.spesialBidangId = this.$route.query.spesialBidangId;
      this.provinceId = this.$route.query.provinceId;
      this.provincesFunc();
      this.spesialisBidangFunc();
      this.DaftarLM(1);
    }
  }
</script>