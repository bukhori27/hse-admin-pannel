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
                <b-button variant="primary" @click="createissue">Create Finding</b-button>
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
            <template slot="actions" slot-scope="row">
              <router-link  v-bind:to="'/issue/assign/id=' + row.item.id"  data-original-title="View"><b-button variant="warning" style="border-radius: 20%"><i class="fas fa-pencil-alt"></i></b-button></router-link>
              <b-button variant="danger" style="border-radius: 20%" @click="deleted(row.item.id)"><i class="fas fa-trash-alt"></i></b-button>
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
          'name',
          'status',
          'lokasi',
          {key: 'actions'}
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
        if (data === 1) return 'Menunggu proses'
        else if (data === 2) return 'cek issue'
        else if (data === 3) return 'Perbaikan'
        else return 'closed'
      },
      batasin (index) {
        if (index.length > 30)
        return index.substr(0, 30) + ' ... ';
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
                name: self.batasin(dump[i].title), 
                category_description: dump[i].category_description, 
                category_name: dump[i].category_name,  
                date: dump[i].date, 
                image_name: dump[i].image_name, 
                id_issue: dump[i].id_issue, 
                issue_description: dump[i].issue_description,
                location_description: dump[i].location_description, 
                lokasi: dump[i].id_location, 
                img: url.url_image + dump[i].path, 
                type_description: dump[i].type_description, 
                type: dump[i].id_type, 
                type_nama: dump[i].type_nama,  
                status: self.changeStatus(parseInt(dump[i].status)),  
                user_name: dump[i].user_name, 
                id: dump[i].id_issue, 
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
