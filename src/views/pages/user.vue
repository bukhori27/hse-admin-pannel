<template>
  <div class="flex-row align-items-center">
    <div class="container-fluid">
      <b-row>
        <div class="col-sm-6">
          <h1>List All User</h1>
        </div>
      </b-row>
      <b-row class="justify-content-center">
        <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xs-12">
          <b-row>
            <div class="col-12">
              <div class="float-right m-b-10" >
                <b-button variant="primary" @click="addUser">Create User</b-button>
              </div>
              <div class="card-tools float-left p-t-3">
                <div class="input-group input-group-sm">
                  <input type="text" class="form-control" placeholder="Search User" v-model="searchText">
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
              <div>{{$index + 1}} </div>
            </template>
            <template slot="actions" slot-scope="row">
              <router-link  v-bind:to="'/user/edit?id=' + row.item.id" data-toggle="tooltip" data-original-title="View"><b-button variant="warning" style="border-radius: 20%"><i class="fas fa-pencil-alt"></i></b-button></router-link>
              <!-- <b-button variant="success" style="border-radius: 20%" @click="approve(row.item.id)">approve</b-button> -->
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
  import { changeStatus } from '../../mixins/helper'

  export default {
    name: 'User',
    axios,
    changeStatus,
    data () {
      return {
        checked: false,
        listing: [],
        pageNumber: 0,
        paginate: ['listing'],
        checkedNames : [],
        currentPage: 1,
        perPage: 10,
        totalRows: 0,
        searchText: '',
        fields: [
          'nama',
          'email',
          'role',
          {key: 'actions'}
        ],
        sortBy: 'creator',
        sortDesc: false,
        filter: '',
        pageOptions: [ 5, 10, 15 ],
        token: localStorage.getItem('token_hse'),
        profile: JSON.parse(localStorage.getItem('profile')),
        pages: 1,
        pageSize: 0
      }
    },
    methods: {
      onFiltered (filteredItems) {

        // this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      search () {
        this.listUser(1)
      },
      listUser (page) {
        var self = this
        console.log(self.profile.pengguna_level)
        let status = []
        let dump2 =''
        var token = self.token
        var parameter = {
          token: token,
          search: self.searchText,
          type: parseInt(self.profile.pengguna_level),
          page: page
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'user_list', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let dump = response.data.user_list
            // console.log(changeStatus(1));
            for (let i = 0; i < dump.length; i++) {
              let b = {
                nama: dump[i].nama,
                email: dump[i].email,
                role : changeStatus(dump[i].type_privilege), 
                id: dump[i].user_id,
              }
              status.push(b)
              self.totalRows = response.data.count_data
            }
            self.listing = status 
            self.pages = response.data.current_page
            self.pageSize = response.data.page_size
          } else {
            alert('SALAH...!')
          }
        })
      },
      addUser () {
        let self = this
        self.LoginShow = false
        self.$router.push('/user/add')
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
