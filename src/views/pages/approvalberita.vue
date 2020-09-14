<template>
  <div class="flex-row align-items-center">
    <div class="container m-t-60">
      <b-row class="justify-content-center">
        <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xs-11">
          <div class="col-md-12"><h1 class="tc m-b-50">Approval Berita</h1> </div>
          <!-- step1 -->
          <b-table class="t-1" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
          responsive="sm" :items="listing" :fields="fields" :current-page="currentPage" :per-page="perPage"
           :filter="filter" @filtered="onFiltered">
            <template slot="index" slot-scope="data">
              {{ ((pages-1) * perPage) + data.index + 1 }}
            </template>
            <template slot="actions" slot-scope="row">
              <b-button variant="success" style="border-radius: 20%" @click="approve(row.item.id)">approve</b-button>
              <b-button variant="danger" style="border-radius: 20%" @click="deleted(row.item.id)">reject</b-button>
            </template>
          </b-table>

          <div class="col-md-12 m-t-30 m-b-20 text-green-title1" style="text-align: right; padding:10px;" >
            <span @click="listUser(pages-1)" v-if="pages !== 1"> << previous </span>
            <span @click="listUser(pages+1)" style="padding-left:20px"  v-if="pageSize > pages"> more >> </span>
          </div>
          <!-- <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="float-right" /> -->
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
          'author',
          'nama_category',
          {'description': {'class': 'row_description'}},
          'show',
          {key: 'actions'}
        ],
        sortBy: 'creator',
        sortDesc: false,
        filter: '',
        pageOptions: [ 5, 10, 15 ],
        token: localStorage.getItem('token_ppa'),
        pages: '',
        pageSize: 0
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
        let show = 'tidak'
        let dump2 =''
        var token = self.token
        console.log(token)

        var parameter = {
          token: token,
          "page": page
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'approval_article_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let listings = response.data.article_list
            for (let i = 0; i < listings.length; i++) {
              if (listings[i].show_article === '1') {
                show = 'tampil'
              } else {
                show = '-'
              }
              let a = {
                id: listings[i].id,
                nama: listings[i].title_article,
                nama_category: listings[i].nama_category,
                author: listings[i].author_name,
                description: listings[i].description,
                url: url.url_image + listings[i].url_images,
                show: show
              }
              status.push(a)
              self.totalRows = response.data.count_data * 100
            }
            self.listing = status
            self.pages = response.data.current_page
            self.pageSize = response.data.page_size
          } else {
          }
        })
      },
      approve (id) {
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
        var del = confirm('Apakah anda yakin akan approve berita ini?')
        if (del) {
          axios.post(url.url_app + 'approval_article_approve', parameter, config).then(function (response) {
            if (response.data.resultCode == 'OK') {
              self.listUser(1)
            } else {
            }
          })
        }
      },
      reject (id) {
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
        var del = confirm('Apakah anda yakin akan menolak berita ini?')
        if (del) {
          axios.post(url.url_app + 'approval_article_reject', parameter, config).then(function (response) {
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
