<template>
  <div class="flex-row align-items-center">
    <div class="container-fluid">
      <b-row>
        <div class="col-sm-6">
          <h1>List Document</h1>
        </div>
      </b-row>
      <b-row class="justify-content-center">
        <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xs-12">
          <div class="float-right m-b-10" >
              <b-button variant="primary" @click="addDocument">Create Document</b-button>
          </div>
          <b-table class="t-1" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
          responsive="xs" :items="listing" :fields="fields" :current-page="currentPage" :per-page="perPage"
           :filter="filter" @filtered="onFiltered">
            <template slot="document" slot-scope="row">
              <b-img :src="'static/img/icons/pdf.jpg'" alt="Responsive image" style="width:50px; height:auto; border-radius: 8px" @click="viewDocument(row.item.image)"/>
            </template>
            <template slot="actions" slot-scope="row">
              <b-button variant="warning" style="border-radius: 20%" @click="viewDocument(row.item.image)"><i class="far fa-eye"></i></b-button>
              <router-link  v-bind:to="'category/edit?id=' + row.item.id" data-toggle="tooltip" data-original-title="View"><b-button variant="warning" style="border-radius: 20%"><i class="fas fa-pencil-alt"></i></i></b-button></router-link>
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

  export default {
    name: 'listDocument',
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
          {key: 'document'},
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
        axios.post(url.url_app + 'document_list', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let dump = response.data.document_list
            self.pages = response.data.current_page
            self.pageSize = response.data.page_size
            for (let i = 0; i < dump.length; i++) {
              let b = {
                nama: dump[i].name,
                image: url.url_image + dump[i].image,
                no: parseInt( (i+1) + (self.pages - 1) * self.perPage), 
                id: dump[i].id
              }
              status.push(b)
              self.totalRows = response.data.count_data
            }
            self.listing = status 
            console.log(self.listing)
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
      edit (data) {
        let self = this
        // window.open(url);
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
      addDocument () {
        let self = this
        self.LoginShow = false
        self.$router.push('/list-document/add')
      }
    },
    created: function () {
      this.listUser(1)
    }
  }
</script>
