<template>
  <div class="flex-row align-items-center forum">
    <div class="container m-t-60">
      <b-row class="justify-content-center" v-if="listing.length > 0">
        <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xs-11">
          <div class="col-md-12"><h1 class="tc m-b-30">List Quote</h1> </div>
          <div class="row m-b-30">
            <div class="col-md-8"></div>
            <div class="col-md-4" style="text-align:right;">
              <b-button class="col-md-4" variant="primary" @click="createQuote()">Create Quote </b-button>
            </div>
          </div>
          <!-- step1 -->
          <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Jabatan</th>
              <th scope="col" style="width:400px">Message</th>
              <th scope="col">status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, id) in listing" >
              <th scope="row">{{ ((pages-1) * perPage) + id+ 1 }}</th>
              <td>{{data.nama}}</td>
              <td>{{data.jabatan}}</td>
              <td style="width:400px">{{data.message}}}</td>
              <td>{{data.state}}</td>
              <td>
                <b-button variant="success"  style="border-radius: 20%" @click="show(data.id)" v-if="data.show === '80'">show</b-button>
                <b-button variant="warning" style="border-radius: 20%" @click="tidaktampil(data.id)" v-else>unpublish</b-button>
                <b-button variant="danger" style="border-radius: 20%" @click="deleted(data.id)">delete</b-button>
              </td>
            </tr>
          </tbody>
        </table>
          <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="float-right" />
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
        totalRows: 0,
        fields: [
          'index',
          'nama',
          'message',
          'jabatan',
          {key: 'actions'}
        ],
        sortBy: 'creator',
        sortDesc: false,
        filter: '',
        pageOptions: [ 5, 10, 15 ],
        token: localStorage.getItem('token_ppa'),
        pages: 1,
        pageSize: 0
      }
    },
    methods: {
      onFiltered (filteredItems) {

        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      createQuote () {
        let self = this
        self.$router.push ('/create-quote')
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
        axios.post(url.url_app + 'quote_filter_admin', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let listings = response.data.quote_list
            for (let i = 0; i < listings.length; i++) {
              if (listings[i].state === '1') {
                show = 'tampil'
              }
              let a = {
                id: listings[i].id,
                nama: listings[i].nama,
                jabatan: listings[i].jabatan,
                message: listings[i].message,
                show: listings[i].state,
                state: show
              }
              status.push(a)
              self.totalRows = response.data.count_data
            }
            self.listing = status
            self.pages = response.data.current_page
            self.pageSize = response.data.page_size
          } else {

          }
        })
      },
      show (id) {
        var self = this
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
        axios.post(url.url_app + 'quote_show', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.listUser(1)
          } else {
          }
        })
      },
      tidaktampil (id) {
        var self = this
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
        axios.post(url.url_app + 'quote_notshow', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.listUser(1)
          } else {
          }
        })
      },
      deleted(id) {
        var self = this
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

        var del = confirm('Apakah anda yakin akan menghapus quote ini?')
        if (del) {
          axios.post(url.url_app + 'quote_delete', parameter, config).then(function (response) {
            if (response.data.resultCode == 'OK') {
              self.listUser(1)
            } else {
            }
          })
        }
      }
    },
    created: function () {
      this.listUser(1)
    }
  }
</script>
