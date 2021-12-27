<template>
  <div class="flex-row align-items-center card">
    <div class="container-fluid">
      <b-row class="card-header">
        <div class="col-sm-6">
          <h1>List Activity</h1>
        </div>
      </b-row>
      <b-row class="justify-content-center card-body">
        <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xs-12">
          <b-row>
            <div class="col-12">
              <div class="float-right m-b-10 " >
                <b-button variant="danger" @click="addForm">Create Form</b-button>
              </div>
            </div>
          </b-row>
          <b-table class="t-1" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
          responsive="xs" :items="listing" :fields="fields" :current-page="currentPage" :per-page="perPage"
           :filter="filter" @filtered="onFiltered">
            <!-- <template slot="actions" slot-scope="row">
              <router-link  v-bind:to="'category/edit?id=' + row.item.id" data-toggle="tooltip" data-original-title="View"><b-button variant="warning" style="border-radius: 20%"><i class="fas fa-pencil-alt"></i></i></b-button></router-link>
            </template> -->
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
    name: 'listActivity',
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
        totalRows: 0,
        fields: [
          'no',
          'nama',
          'description',
          'staff',
          'date'
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
      search () {
        this.listUser(1)
      },
      listUser (page) {
        var self = this
        let status = []
        let dump2 =''
        var token = self.token
        var parameter = {
          token: token,
          "page": page
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'form_hse_list', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let dump = response.data.form_hse_list
            self.pages = response.data.current_page
            self.pageSize = response.data.page_size
            for (let i = 0; i < dump.length; i++) {
              let b = {
                nama: dump[i].name_form,
                description: dump[i].description,
                staff: dump[i].staff,
                date: dump[i].date,
                no: parseInt( (i+1) + (self.pages - 1) * self.perPage), 
                id: dump[i].id
              }
              status.push(b)
              self.totalRows = response.data.count_data
            }
            self.listing = status 
          } else {
            alert('SALAH...!')
          }
        })
      },
      
      edit (data) {
        let self = this
        self.$router.push({name: 'EditCategory', params: data})
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
        var del = confirm('Apakah anda yakin menghapus category?')
        if (del) {
          axios.post(url.url_app + 'category_delete', parameter, config).then(function (response) {
            if (response.data.resultCode == 'OK') {
              alert ('sukses menghapus category');
              self.listUser(1)
            } else {
            }
          })
        }
      },
      addCategory () {
        let self = this
        self.LoginShow = false
        self.$router.push('/category/add')
      },
      addForm () {
        let self = this
        self.LoginShow = false
        self.$router.push('/form/add')
      }
    },
    created: function () {
      this.listUser(1)
    }
  }
</script>
