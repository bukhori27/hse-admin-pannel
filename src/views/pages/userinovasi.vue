<template>
  <div class="flex-row align-items-center forum">
    <div class="container m-t-60">
      <b-row class="justify-content-center" v-if="listing.length > 0">
        <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xs-11">
          <div class="col-md-12"><h1 class="tc m-b-50">List User Inovasi</h1> </div>
          <!-- step1 -->
          <b-table class="t-1" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
          responsive="sm" :items="listing" :fields="fields" :current-page="currentPage" :per-page="perPage"
           :filter="filter" @filtered="onFiltered">
            <template slot="index" slot-scope="data">
              {{ ((pages-1) * perPage) + data.index + 1 }}
            </template>
            <template slot="actions" slot-scope="row" id="actions" style="width: 200px;">
              <b-button variant="success" style="border-radius: 20%" @click="download(row.item)">Download</b-button>
            </template>
          </b-table>
          <div class="col-md-12 m-t-30 m-b-20 text-green-title1" style="text-align: right; padding:10px;" >
            <span @click="listUser(pages-1)" v-if="pages !== 1"> << previous </span>
            <span @click="listUser(pages+1)" style="padding-left:20px" v-if="pageSize > pages"> more >> </span>
          </div>
          <!-- <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="float-right" /> -->
        </div>
        <div ref="content" style="display:none;"> 
        <!-- <div ref="content"> -->
          <div style="padding-bottom:10px; line-height: 30px; text-transform: capitalize;"> <span>Nama : </span> <span> {{ userInovasi[0].penanggung_jawab }} </span> </div>
          <div style="padding-bottom:10px; line-height: 30px; text-transform: capitalize;"> <span>Nama Organisasi : </span> <span> {{ userInovasi[0].nama_organisasi }}</span> </div>
          <div style="padding-bottom:10px; line-height: 30px; text-transform: capitalize;"> <span>Type User : </span> <span> {{ userInovasi[0].nama_type_user_inovasi }}</span> </div>
          <div style="padding-bottom:10px; line-height: 30px; text-transform: capitalize;"> <span>Spesial Bidang : </span> <span> {{ userInovasi[0].spesial_bidang_inovasi }}</span> </div>
          <div style="padding-bottom:10px; line-height: 30px; text-transform: capitalize;"> <span>Judul : </span> <span> {{ userInovasi[0].judul }}</span> </div>
          <div style="padding-bottom:10px; line-height: 30px; text-transform: capitalize;"> <span>Masalah apa saja yang dihadapi sebelum dilaksanakannya inovasi? : </span> <span> {{ userInovasi[0].q1 }}</span> </div>
          <div style="padding-bottom:10px; line-height: 30px; text-transform: capitalize;"> <span>Apa hal yang mendasar sehingga inovasi ini dikatakan kreatif dan inovatif? : </span> <span> {{ userInovasi[0].q2 }}</span> </div>
          <div style="padding-bottom:10px; line-height: 30px; text-transform: capitalize;"> <span>Bagaimana inovasi dilaksanakan selama ini? : </span> <span> {{ userInovasi[0].q3 }}</span> </div>
          <div style="padding-bottom:10px; line-height: 30px; text-transform: capitalize;"> <span>Sumber daya apa saja yang digunakan untuk inovasi dan bagaimana sumber daya tersebut dimobilisasi? : </span> <span> {{ userInovasi[0].q4 }}</span> </div>
          <div style="padding-bottom:10px; line-height: 30px; text-transform: capitalize;"> <span>Apa saja keluaran (output) yang dinilai paling berhasil dari pelaksanaan inovasi? : </span> <span> {{ userInovasi[0].q5 }}</span> </div>
          <div style="padding-bottom:10px; line-height: 30px; text-transform: capitalize;"> <span>Bagaimana cara pemantauan penerapan inovasi? : </span> <span> {{ userInovasi[0].q6 }}</span> </div>
          <div style="padding-bottom:10px; line-height: 30px; text-transform: capitalize;"> <span>Apa yang menjadi kendala utama dalam pelaksanaan inovasi dan bagaimana mengatasi kendala tersebut? : </span> <span> {{ userInovasi[0].q7 }}</span> </div>
          <div style="padding-bottom:10px; line-height: 30px; text-transform: capitalize;"> <span>Apa saja manfaaat yang telah dihasilkan oleh inovasi? : </span> <span> {{ userInovasi[0].q8 }}</span> </div>
          <div style="padding-bottom:10px; line-height: 30px; text-transform: capitalize;"> <span>Apakah inovasi yang telah dilaksanakan sifatnya berkesinambungan? : </span> <span> {{ userInovasi[0].q9 }}</span> </div>
          <!-- <div style="padding-bottom:10px; line-height: 30px; text-transform: capitalize;"> <img :src="imgRekomendasi" /> </div> -->
        </div>
      </b-row>
      <b-row class="justify-content-center" v-else>
        <div style="height:250px;">
          Tidak ada berita
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
  import { url } from '../../url'
  import sha256 from 'sha256'
  import jsPDF from 'jspdf' 

  export default {
    name: 'Register',
    axios,
    data () {
      return {
        checked: false,
        listing: [],
        pageNumber: 0,
        paginate: ['listing'],
        checkedNames : [],
        currentPage: 1,
        perPage: 15,
        totalRows: 40,
        fields: [
          'index',
          'nama',
          'email',
          'kontak',
          'spesialBidangInovasi',
          {key: 'actions'}
        ],
        sortBy: 'creator',
        sortDesc: false,
        filter: '',
        pageOptions: [ 5, 10, 15 ],
        token: localStorage.getItem('token_ppa'),
        pages: '',
        pageSize: 0,
        userInovasi: [],
        urlImage: url.url_image,
        indexs: 0,
        imgRekomendasi: ''
      }
    },
    methods: {
      onFiltered (filteredItems) {

        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      listUser (page) {
        var self = this
        let status = []
        let dump2 =''
        var token = self.token
        let show = 'tidak'
        var parameter = {
          token: token,
          "page": page
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'user_inovasi_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let listings = response.data.userInovasi_list
            for (let i = 0; i < listings.length; i++) {
              let a = {
                index: i,
                id: listings[i].user_id,
                nama: listings[i].penanggung_jawab,
                type_user: listings[i].type_user_inovasi,
                spesialBidangInovasi: listings[i].spesial_bidang_inovasi,
                email: listings[i].email,
                url: url.url_image + listings[i].photo_profile,
                kontak: listings[i].no_hp,
                provinsi: listings[i].nama_provinsi,
                alamat: listings[i].alamat,
              }
              status.push(a)
            }
            self.listing = status
            self.array = listings
            self.userInovasi = listings
            self.dumpdata = listings
            self.totalRows = response.data.count_data
            self.pages = response.data.current_page
            self.pageSize = response.data.page_size
          } else {

          }
        })
      },
      download(id) {
        let self = this
        let objIndex = self.listing.findIndex((obj => obj.id === id.id))
        self.userInovasi = []
        self.indexs = objIndex
        self.userInovasi.push(self.array[objIndex])
        if (self.userInovasi[0].legalitas_lembaga) {
          // legalitas_lembaga = self.renderImages(self.urlImage + self.userInovasi[0].legalitas_lembaga)
          // doc.addImage(legalitas_lembaga,'JPEG',20,20);
        }
        if (self.userInovasi[0].surat_rekomendasi) {

          // self.imgRekomendasi = 'data:image/jpg;base64,' + window.btoa(self.urlImage + self.userInovasi[0].surat_rekomendasi)
          // console.log(self.imgRekomendasi)
        }
        setTimeout(function () {
          self.downloadHTML( self.array[objIndex].penanggung_jawab, self.userInovasi)
        }, 1000);
      },
      renderImages(base64) {
        let mime = 'image/jpeg';
        var sliceSize = 1024;
        var byteChars = window.btoa(base64);
        var byteArrays = [];
        for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
          var slice = byteChars.slice(offset, offset + sliceSize);
          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
          var byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, {type: mime});
      },
      downloadHTML (index, data) {
        const doc = new jsPDF();
        let self = this
        let legalitas_lembaga = ''
        let surat_rekomendasi = ''

        surat_rekomendasi = url.url_image + data[0].surat_rekomendasi
        console.log(data)
        console.log(surat_rekomendasi)
        // legalitas_lembaga = self.renderImages(self.urlImage + data.legalitas_lembaga)
        const contentHtml = this.$refs.content.innerHTML;
        doc.fromHTML(contentHtml, 15, 15, {
          width: 170
        });
        // doc.addImage(surat_rekomendasi,'JPG',20,20);
        // console.log(contentHtml)
        doc.save( index + ".pdf");
      },
      downloadWithCSS() {
         const doc = new jsPDF();
         /** WITH CSS */
         var canvasElement = document.createElement('canvas');
          html2canvas(this.$refs.content, { canvas: canvasElement 
            }).then(function (canvas) {
          const img = canvas.toDataURL("image/jpeg", 0.8);
          doc.addImage(img,'JPEG',20,20);
          doc.save("sample.pdf");
         });
      }
        /* var self = this
        var token = self.token
        var parameter = {
          token: token,
          id: id
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'user_invoasi_download', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.listUser(1)
          } else {
          }
        }) */
      // }
    },
    created: function () {
      this.listUser(1)
    }
  }
</script>
