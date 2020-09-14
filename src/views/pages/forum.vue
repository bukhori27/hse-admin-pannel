<template>
  <div class="flex-row align-items-center forum">
    <div class="container m-t-60">
      <b-row class="justify-content-center">
        <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xs-11">
          <div class="col-md-12"><h1 class="tc m-b-50">Forum</h1> </div>
          <!-- step1 -->
          <div class="forum-header">List Forum</div>
          <b-table class="t-1 forum__wrap" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
          responsive="sm" :items="listing" :fields="fields" :current-page="currentPage" :per-page="perPage"
           :filter="filter" @filtered="onFiltered" @row-clicked="forumThread">
          </b-table>
          <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="float-right" />
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
        fields: ["nama",
        "author",
        "count_thread",
        "date"
        ],
        sortBy: 'creator',
        sortDesc: false,
        filter: '',
        pageOptions: [ 5, 10, 15 ],
        token: localStorage.getItem('token_ppa'),
      }
    },
    methods: {
      onFiltered (filteredItems) {

        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      listUser () {
        var self = this
        let status = []
        let dump2 =''
        var token = self.token
        console.log(token)

        var parameter = {
          token: token,
          "search": "",
          "page": 1
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'forum_Filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let forum = response.data.forum_list
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
            console.log(self.listing)
          } else {
            alert('SALAH...!')
          }
        })
      },
      forumThread (record, index) {
        let self = this
        self.$router.push('/forum-thread?id=' + record.id + '&nama=' + record.nama)
      }
    },
    created: function () {
      this.listUser()
    }
  }
</script>