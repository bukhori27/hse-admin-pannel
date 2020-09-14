<template>
  <div class="flex-row align-items-center">
    <div class="container m-t-60">
      <b-row class="justify-content-center">
        <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xs-11" v-if="akses == 1">
          <div class="col-md-12"><h1 class="tc m-b-50"> {{namaForum}}</h1> </div>
          <!-- step1 -->
          <b-table class="t-1" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
          responsive="sm" :items="listing" :fields="fields" :current-page="currentPage" :per-page="perPage"
           :filter="filter" @filtered="onFiltered" @row-clicked="forumReply">
           <template slot="id" slot-scope="row">
              <div>{{$index + 1}} </div>
            </template>
          </b-table>
          <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="float-right" />
        </div>
        <div v-else style="height: 150px; padding-top:20px;">
          Anda harus login
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
    name: 'forum',
    axios,
    data () {
      return {
        slide: 0,
        sliding: null,
        checked: false,
        listing: [],
        pageNumber: 0,
        paginate: ['listing'],
        checkedNames : [],
        currentPage: 1,
        perPage: 10,
        totalRows: 0,
        fields: [
          'nama',
          'author',
          'date'
        ],
        sortBy: 'creator',
        sortDesc: false,
        filter: '',
        pageOptions: [ 5, 10, 15 ],
        token: localStorage.getItem('token_ppa'),
        namaForum: '',
        akses: ''
      }
    },
    methods: {
      onFiltered (filteredItems) {

        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      listUser (id) {
        var self = this
        let status = []
        let dump2 =''
        var token = self.token

        var parameter = {
          token: token,
          search: "",
          id_forum: id,
          page: 1
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'forum_thread_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let forum = response.data.forum_thread_list
            console.log(forum)
            for(let i = 0; i < forum.length; i++ ) {
              let b = {
                nama :forum[i].nama,
                author : 'Admin ' + forum[i].provinsi,
                count_thread: forum[i].count_thread,
                date: forum[i].date,
                id: forum[i].id
              }
              status.push(b)
            }
            self.listing = status
            self.akses = 1
          } else {
            self.akses = 0
          }
        })
      },
      forumReply (record, index) {
        let self = this
        self.$router.push('/forum-reply?id=' + record.id + '&nama=' + record.nama)
      }
    },
    created: function () {
      this.Categoryid = this.$route.query.id
      this.namaForum = this.$route.query.nama
      this.listUser(this.Categoryid)
    }
  }
</script>