<template>
  <div class="row m-t-60 m-b-30">
    <div class="col-lg-12 col-sm-12 col-md-12 container6 row">
      <div class="col-lg-11 col-md-11 col-sm-12 row container5-1 ">
        <div class="text-green-title1 col-12 fs36 tc m-b-30"> Profile User</div>
        <div class="col-md-12 row" v-if="profile.pengguna_level === '4'">
          <div class="col-md-5 row"> 
            <div class="col-md-12 fs16 m-t-10">
              <span>Nama Organisasi : </span>
              <span>{{nama}}</span>
            </div>
            <div class="col-md-12 fs16 m-t-10">
              <span>Email : </span>
              <span>{{email}}</span>
            </div>
            <div class="col-md-12 fs16 m-t-10">
              <span>Nama Penanggung Jawab : </span>
              <span>{{penanggung_jawab}}</span>
            </div>
            <div class="col-md-12 fs16 m-t-10">
              <span>No HP : </span>
              <span>{{no_HP}}</span>
            </div>
            <div class="col-md-12 fs16 m-t-10">
              <span>Spesialis Bidang : </span>
              <span>{{nama_spesial_bidang}}</span>
            </div>
            <div class="col-md-12 fs16 m-t-10">
              <span>Jenis Lembaga: </span>
              <span>{{nama_jenis_lembaga}}</span>
            </div>
            <div class="col-md-12 fs16 m-t-10">
              <span>Alamat : </span>
              <span>{{alamat}}</span>
            </div>
            <div class="col-md-12 fs16 m-t-10">
              <span>Provinsi : </span>
              <span>{{provinsi}}</span>
            </div>
            <div class="col-md-12 fs16 m-t-10">
              <span>Tingkatan : </span>
              <span>{{tingkatan}}</span>
            </div>
            <div class="col-md-12 fs16 m-t-20" v-if="document.lenght > 0"> <span>Dokument : </span></div>
            <div class="col-md-12 m-t-20" style="border-top:1px solid black;"></div>
            <div class="row m-t-30 col-12" v-for="(index, id) in document" style="padding-left:10px;"> 
              <div class="col-7 fs18"> {{index.nama}}</div>
              <b-button variant="primary" style="border-radius: 20%" @click="viewDocument(url_images + index.path_img, beritaId)">view</b-button>
            </div>
          </div>
          <div class="col-md-5 row"> 
            <div class="col-lg-11 col-md-11 col-sm-11 col-xs-12 container5-1" style="padding-left: 10px"> 
              <b-img :src="imgContent" fluid-grow alt="Responsive image" style="height:auto" v-if="imgContent"/>
            </div>
          </div>
          <div class="col-md-12 m-t-20 nplr">
            <span v-if="listing.length>0">
              <b-table class="t-1 forum__wrap" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
              responsive="sm" :items="listing" :fields="fields" :current-page="currentPage" :per-page="perPage"
               :filter="filter" @filtered="onFiltered">
                <template slot="actions" slot-scope="row" id="actions" style="width: 200px;">
                  <b-button variant="danger" style="border-radius: 20%" @click="deleted(row.item.id)">delete</b-button>
                </template>
              </b-table>
              <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="float-right" />
            </span>
          </div>
          <div class="col-md-12 nplr">
            <b-button class="col-lg-2 m-t-40" variant="primary" @click="changePassword()">Change Password </b-button>
            <b-button class="col-lg-2 m-t-40" variant="primary" @click="editProfile()">Edit Profile </b-button>
            <b-button class="col-lg-2 m-t-40" variant="primary" @click="createsdm(user.lembaga_masyarakat_id)">Add SDM </b-button>
            <b-button class="col-lg-2 m-t-40" variant="primary" @click="DownloadKartu()">Kartu Anggota </b-button>
          </div>
        </div>
      </div>
      <div class="col-md-12 row" v-if="profile.pengguna_level === '1' || profile.pengguna_level === '2'">
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 container5-1" style="padding-left: 10px"> 
          <b-img :src="imgContent" fluid-grow alt="Responsive image" style="height:auto" v-if="imgContent"/>
        </div>
        <div class="col-md-12 fs16 m-t-10">
          <span>Nama : </span>
          <span>{{nama}}</span>
        </div>
        <div class="col-md-12 fs16 m-t-10">
          <span>email : </span>
          <span>{{email}}</span>
        </div>
        <div class="col-md-12 nplr">
          <b-button class="col-lg-2 m-t-40" variant="primary" @click="changePassword()">Change Password </b-button>
          <b-button class="col-lg-2 m-t-40" variant="primary" @click="editProfile()">Edit Profile </b-button>
        </div>
      </div>

      <div class="col-md-12 row" v-if="profile.pengguna_level === '3' || profile.pengguna_level === '5'">
        <div class="col-md-5 row">
          <div class="col-md-12 fs16 m-t-10">
            <span>Nama : </span>
            <span>{{nama}}</span>
          </div>
          <div class="col-md-12 fs16 m-t-10">
            <span>email : </span>
            <span>{{email}}</span>
          </div>
          
          <div class="col-md-12 fs16 m-t-10">
            <span>Nama Penanggung Jawab : </span>
            <span>{{penanggung_jawab}}</span>
          </div>
          <div class="col-md-12 fs16 m-t-10">
            <span>No HP : </span>
            <span>{{no_HP}}</span>
          </div>
          <div class="col-md-12 fs16 m-t-10">
            <span>Alamat : </span>
            <span>{{alamat}}</span>
          </div>
          <div class="col-md-12 fs16 m-t-10">
            <span>provinsi : </span>
            <span>{{provinsi}}</span>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 container5-1" style="padding-left: 10px"> 
          <b-img :src="imgContent" fluid-grow alt="Responsive image" style="height:auto" v-if="imgContent"/>
        </div>
        <div class="col-md-12 nplr">
          <b-button class="col-lg-2 m-t-40" variant="primary" @click="changePassword()">Change Password </b-button>
          <b-button class="col-lg-2 m-t-40" variant="primary" @click="editProfile()">Edit Profile </b-button>
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
  import { url } from '../url'
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
        nama: '',
        email: '',
        nama_spesial_bidang: '',
        nama_jenis_lembaga: '',
        no_HP: '',
        alamat: '',
        provinsi: '',
        tingkatan: '',
        email: '',
        penanggung_jawab: '',
        message: '',
        token: localStorage.getItem('token_ppa'),
        profile: JSON.parse(localStorage.getItem('profile')),
        document: [],
        url_images: url.url_image,
        user: '',
        listing: [],
        pageNumber: 0,
        paginate: ['listing'],perPage: 10,
        totalRows: 0,
        currentPage: 1,
        fields: ["nama",
          "alamat",
          "provinsi",
          "no_hp",
          "email",
          "Spesialis_Bidang",
          {key: 'actions'}
        ],
        sortBy: 'creator',
        sortDesc: false,
        filter: '',
        pageOptions: [ 5, 10, 15 ]
      }
    },
    methods: {
      onFiltered (filteredItems) {

        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      subContent (index) {
        return index.substring(parseInt(index.length)-2, index.length)
      },
      index () {
        var self = this
        var parameter = {
          token: self.token
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'user_view', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let listing = response.data.user_view
            self.user = listing
            self.imgContent = url.url_image+ listing.photo_profile
            self.nama = listing.username
            self.email = listing.email
            self.penanggung_jawab = listing.penanggung_jawab
            self.no_HP = listing.no_hp
            self.nama_spesial_bidang = listing.nama_spesial_bidang
            self.nama_jenis_lembaga = listing.nama_jenis_lembaga
            self.alamat = listing.alamat
            self.provinsi = listing.nama_provinsi
            self.tingkatan = listing.tingkatan
            self.document = response.data.dokument_list
            console.log(self.user)
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      viewDocument (url, id) {
        let self = this
        window.open(url);
        // self.$router.push('/document?url='+ url + '&id=' + id)
      },
      submit () {
        var self = this
        let profile = JSON.parse(localStorage.getItem('profile'))
        let nama = ''
        let emailUser = ''
        if(self.token) {
          nama = profile.pengguna_nama
          emailUser = profile.email
        } else {
          nama = self.namaUser
          emailUser = self.email
        }
        var parameter = { 
          article_id: self.beritaId,
          nama : nama,
          email: emailUser,
          message: self.message
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'comment_add', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            alert('berhasil di submit')
            self.index(self.beritaId)
          } else {
            alert('SALAH...!')
          }
        }) 
      },
      listSDM (page) {
        var self = this
        let status = []
        let dump2 =''
        let profile = this.profile
        var parameter = {
          "id": profile.pengguna_id,
          "page": page
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'sdm_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let sdm = response.data.sdm_list
            for(let i = 0; i < sdm.length; i++ ) {
              let b = {
                nama :sdm[i].nama,
                alamat : sdm[i].alamat,
                no_hp: sdm[i].kontak,
                provinsi: sdm[i].nama_provinsi,
                Spesialis_Bidang: sdm[i].nama_spesial_bidang,
                email: sdm[i].email,
                id: sdm[i].id
              }
              status.push(b)
            }
            self.listing = status
            console.log(self.listing)
          } else {
            alert('SALAH...!')
          }
        })
      },
      deleted (index) {
        var self = this
        var parameter = {
          token: self.token,
          id: index
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        var del = confirm('Apakah anda yakin akan menghapus sdm ini?')
        if (del) {
          axios.post(url.url_app + 'sdm_delete', parameter, config).then(function (response) {
            if (response.data.resultCode == 'OK') {
              self.listSDM(1)
            } else {
            }
          })
        }
      },
      /* forumThread (record, index) {
        let self = this
        self.$router.push('/forum-thread?id=' + record.id + '&nama=' + record.nama)
      }, */
      backto () {
        let self = this
        self.$router.push ('/approval-user')
      },
      createsdm (index) {
        let self = this
        self.$router.push ('/create-sdm?id=' + index)
      },
      changePassword () {
        let self = this
        self.$router.push ('/change-password')
      },
      editProfile () {
        let self = this
        console.log(self.user)
        self.$router.push ({path: '/edit-user', params: self.user})
      },
      DownloadKartu () {
        let self = this
        self.$router.push ('/document?type=kartu')
      }
    },
    created: function () {
      this.index()
      this.listSDM(1)
    }
  }
</script>