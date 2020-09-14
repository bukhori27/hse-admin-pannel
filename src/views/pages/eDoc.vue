<template>
  <div class="flex-row align-items-center forum">
    <div class="container m-t-60">
      <b-row class="justify-content-center">
        <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xs-11">
          <div class="col-md-12"><h1 class="tc m-b-50">E-Document</h1> </div>
          <b-table class="t-1 forum__wrap" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
          responsive="sm" :items="listing" :fields="fields" :current-page="currentPage" :per-page="perPage"
           :filter="filter" @filtered="onFiltered">
            <template slot="index" slot-scope="data">
              {{ ((pages-1) * perPage) + data.index + 1 }}
            </template>
            <template slot="actions" slot-scope="row" id="actions" style="width: 200px;">
              <b-button variant="warning" style="border-radius: 20%" @click="viewDocument(row.item.path)">view Document</b-button>
            </template>
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
        fields: [
          "index",
          "nama",
          "author",
          "date",
          {key: 'actions'}
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
        var token = ''
        if (token) {
          token = self.token
        }
        var parameter = {
          token: token,
          "search": "",
          content_type: 1,
          "page": 1
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'content_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let forum = response.data.content_list
            for(let i = 0; i < forum.length; i++ ) {
              let b = {
                nama :forum[i].nama,
                author : forum[i].author_name,
                date: forum[i].date,
                id: forum[i].id,
                path: url.url_image + forum[i].url_content,
                index: forum[i].id
              }
              status.push(b)
            }
            self.listing = status
            self.pages = response.data.current_page
            self.pageSize = response.data.page_size
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
    },
    created: function () {
      this.listUser()
    }
  }
</script>