<template>
  <div class="flex-row align-items-center card">
    <div class="container-fluid">
      <b-row class="card-header">
        <div class="col-sm-6">
          <h3 class="card-title">Finding</h3>
        </div>
      </b-row>
      <b-row class="justify-content-center card-body">
        <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xs-1s">
          <b-row>
            <div class="col-12">
              <div class="float-right m-b-10 " >
                <b-button variant="danger" @click="createissue">Create Finding</b-button>
              </div>
              <div class="card-tools float-left p-t-3">
                <div class="input-group input-group-sm">
                  <input type="text" class="form-control" placeholder="Search Finding" v-model="searchText">
                  <div class="input-group-append">
                    <div class="btn btn-primary">
                      <i class="fas fa-search" @click="search(searchText)"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-row>
          <b-table class="t-1" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
          responsive="xs" :items="listing" :fields="fields" :current-page="currentPage" :per-page="perPage"
           :filter="filter" @filtered="onFiltered">
            <template slot="id" slot-scope="row">
            {{row.item.id}}
            </template>
            <template slot="detail" slot-scope="row">
              <router-link  v-bind:to="'/issue/detail?id=' + row.item.id"  data-original-title="View"><b-button variant="warning" style="border-radius: 20%"><i class="fa fa-eye"></i></b-button></router-link>
            </template>
          </b-table>

          <!-- <div class="col-md-12 text-green-title1" style="text-align: right; padding:10px;" >
            <span @click="listUser(pages-1)" v-if="pages !== 1"> << previous </span>
            <span @click="listUser(pages+1)" style="padding-left:20px" v-if="pageSize > pages"> more >> </span>
          </div> -->
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
    name: 'Issue',
    axios,
    data () {
      return {
        checked: false,
        listing: [],
        pageNumber: 0,
        paginate: ['listing'],
        checkedNames : [],
        currentPage: 1,
        perPage: 10,
        searchText: '',
        totalRows: 0,
        fields: [
          'id',
          'date', 
          'section', 
          'area', 
          'findings', 
          'pic', 
          'status', 
          {key: 'detail'}
        ],
        sortBy: 'creator',
        sortDesc: false,
        filter: '',
        pageOptions: [ 5, 10, 15 ],
        token: localStorage.getItem('token_hse'),
        pages: 1,
        pageSize: 0
      }
    },
    methods: {
      onFiltered (filteredItems) {

        // this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      search (data) {
        this.listUser(1)
      },
      changeStatus (data) {
        if (data === 1) return 'Draft'
        else if (data === 2) return 'Open'
        else if (data === 3 || data === 4) return 'On Progress'
        else return 'Closed'
      },
      batasin (index) {
        if (index.length > 15) return index.substr(0, 15) + ' ... ';
        return index
      },
      listUser (page) {
        let self = this
        let status = []
        let dump2 =''
        var token = self.token
        var parameter = {
          token: token,
          filter: '2',
          search: self.searchText,
          type: 4,
          "page": page
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'issue_list', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            var dump = response.data.issue_list
            for (let i = 0; i < dump.length; i++) {
              let b = {
                id: dump[i].id, 
                date: dump[i].date, 
                section: dump[i].section, 
                area: self.batasin(dump[i].area), 
                findings: self.batasin(dump[i].finding),
                pic: dump[i].pic? dump[i].pic: '-', 
                status: self.changeStatus(parseInt(dump[i].state)),
              }
              status.push(b)
              self.totalRows = response.data.count_data
            }
            self.listing = status 
            self.pages = response.data.current_page
            self.pageSize = response.data.page_size
            self.countData = response.data.count_data
          } else {
            alert('SALAH...!')
          }
        })
      },
      createissue () {
        let self = this
        self.$router.push('/issue/create')
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
        var del = confirm('Apakah anda yakin menghapus user?')
        if (del) {
          axios.post(url.url_app + 'user_delete', parameter, config).then(function (response) {
            if (response.data.resultCode == 'OK') {
              alert ('sukses menghapus user');
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
