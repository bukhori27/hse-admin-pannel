<template>
    <section class="content">
      <div class="container-fluid">
        <b-row>
          <div class="col-sm-6">
            <h1>Finding</h1>
          </div>
        </b-row>
        <b-row>
          <div class="col-md-3">
            <a @click="goTo('/issue')" class="btn btn-primary btn-block mb-3 button-issue">Issue</a>

            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Status</h3>

                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
              </div>
              <div class="card-body p-0">
                <ul class="nav nav-pills flex-column">
                  <li class="nav-item active">
                    <a href="#" class="nav-link">
                      <i class="fas fa-inbox"></i> Inbox
                      <span class="badge bg-primary float-right">12</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-link">
                      <i class="far fa-envelope"></i> Sent
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-link">
                      <i class="far fa-file-alt"></i> Drafts
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-link">
                      <i class="fas fa-filter"></i> Junk
                      <span class="badge bg-warning float-right">65</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-link">
                      <i class="far fa-trash-alt"></i> Trash
                    </a>
                  </li>
                </ul>
              </div>
              <!-- /.card-body -->
            </div>
          </div>
          <div class="col-md-9">
            <div class="card card-primary card-outline">
              <!-- /.card-header -->
              <div class="card-header">
                <h3 class="card-title">Finding</h3>

                <div class="card-tools">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control" placeholder="Search Mail">
                    <div class="input-group-append">
                      <div class="btn btn-primary">
                        <i class="fas fa-search"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /.card-tools -->
              </div>
              <div class="card-body p-0">
                <div class="table-responsive mailbox-messages">
                  <table class="table table-hover table-striped">
                    <tbody>
                    
                    <tr v-for="(indexs, id) in finding">
                      <td>
                        <div class="icheck-primary">
                          <b-img :src="indexs.img" alt="Responsive image" style="height:auto; width:50px !important;" v-if="indexs.img"/>
                        </div>
                      </td>
                      <td class="mailbox-name">{{indexs.name}}</a></td>
                      <td class="mailbox-subject"><b>{{indexs.title}} </b><p>{{indexs.description}}</p>
                      </td>
                      <td class="mailbox-attachment"></td>
                      <td class="mailbox-date">{{indexs.date}}</td>
                      <td class="mailbox-date">
                        <a class="nav-link p0 f-black" data-toggle="dropdown" href="#">
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                        <div class="dropdown-menu">
                          <a class="dropdown-item" tabindex="-1" href="#">Create New Issue</a>
                          <a class="dropdown-item" tabindex="-1" href="#">Merge Issue</a>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <!-- /.table -->
                </div>
                <!-- /.mail-box-messages -->
              </div>
              <!-- /.card-body -->
              <div class="card-footer p-0">
                <div class="mailbox-controls">
                  <div class="float-right">
                    1-50/200
                    <div class="btn-group">
                      <button type="button" class="btn btn-default btn-sm">
                        <i class="fas fa-chevron-left"></i>
                      </button>
                      <button type="button" class="btn btn-default btn-sm">
                        <i class="fas fa-chevron-right"></i>
                      </button>
                    </div>
                    <!-- /.btn-group -->
                  </div>
                  <!-- /.float-right -->
                </div>
              </div>
            </div>
          </div>
        </b-row>
        <!-- start Modal-->
        <div class="modal fade m-t-80" id="modal-default">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Action</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>One fine body&hellip;</p>
              </div>
              <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Submit</button>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
        </div>
        <!-- end modal -->
      </div>
    </div>
    </section>
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
    name: 'Finding',
    axios,
    data () {
      return {
        checked: false,
        listing: [],
        pageNumber: 0,
        imgContent: 'static/img/icons/logo.png',
        paginate: ['listing'],
        checkedNames : [],
        currentPage: 1,
        perPage: 10,
        totalRows: 0,
        finding: [],
        sortBy: 'creator',
        sortDesc: false,
        filter: '',
        pageOptions: [ 5, 10, 15 ],
        token: localStorage.getItem('token_hse'),
        pages: 1,
        pageSize: 0,
        popup: false
      }
    },
    methods: {
      onFiltered (filteredItems) {

        // this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      listUser (page) {
        var self = this
        self.finding = [{name: 'Alexander', title: 'Keramik Pecah', description: 'testing menggunakan description apa yang terjadi apakah menjadi panjang atau gimana??', img: self.imgContent, date : '2020-09-22', state: 1 },
        {name: 'Alexander', title: 'Keramik Pecah', description: 'testing menggunakan description apa yang terjadi apakah menjadi panjang atau gimana??', img: self.imgContent, date : '2020-09-22', state: 1 },
        {name: 'Alexander', title: 'Keramik Pecah', description: 'testing menggunakan description apa yang terjadi apakah menjadi panjang atau gimana??', img: self.imgContent, date : '2020-09-22', state: 1 },
        {name: 'Alexander', title: 'Keramik Pecah', description: 'testing menggunakan description apa yang terjadi apakah menjadi panjang atau gimana??', img: self.imgContent, date : '2020-09-22', state: 1 },
        {name: 'Alexander', title: 'Keramik Pecah', description: 'testing menggunakan description apa yang terjadi apakah menjadi panjang atau gimana??', img: self.imgContent, date : '2020-09-22', state: 1 }]
        /** 
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
        axios.post(url.url_app + 'approval_user_filter', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let dump = response.data.lembagaMasyarakat_list
            for (let i = 0; i < dump.length; i++) {
              let b = {
                nama: dump[i].nama_user,
                email: dump[i].email,
                spesialis_bidang: dump[i].nama_spesial_bidang,
                nama_organisasi: dump[i].nama_organisasi,
                jenis_lembaga: dump[i].nama_jenis_lembaga,
                date: dump[i].date,
                tingkatan: dump[i].tingkatan, 
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
        }) **/
      },
      deleted(id) {
        var self = this
        var token = self.token
        var parameter = {
          token: token,
          user_id: id
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }

        var del = confirm('Apakah anda yakin akan mereject lembaga masyarakat ini?')
        if (del) {
          axios.post(url.url_app + 'approval_user_reject', parameter, config).then(function (response) {
            if (response.data.resultCode == 'OK') {
              self.listUser(1)
            } else {
            }
          })
        }
      },
      goTo (path) {
        let self = this
        self.LoginShow = false
        self.$router.push(path)
      },
    },
    created: function () {
      this.listUser(1)
    }
  }
</script>
