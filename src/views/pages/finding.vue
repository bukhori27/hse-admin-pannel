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
                    <tr>
                      <td>
                        <div class="icheck-primary">
                          <input type="checkbox" value="" id="check1">
                          <label for="check1"></label>
                        </div>
                      </td>
                      <td class="mailbox-star"><a href="#"><i class="fas fa-star text-warning"></i></a></td>
                      <td class="mailbox-name"><a href="read-mail.html">Alexander Pierce</a></td>
                      <td class="mailbox-subject"><b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                      </td>
                      <td class="mailbox-attachment"></td>
                      <td class="mailbox-date">5 mins ago</td>
                    </tr>
                    <tr>
                      <td>
                        <div class="icheck-primary">
                          <input type="checkbox" value="" id="check2">
                          <label for="check2"></label>
                        </div>
                      </td>
                      <td class="mailbox-star"><a href="#"><i class="fas fa-star-o text-warning"></i></a></td>
                      <td class="mailbox-name"><a href="read-mail.html">Alexander Pierce</a></td>
                      <td class="mailbox-subject"><b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                      </td>
                      <td class="mailbox-attachment"><i class="fas fa-paperclip"></i></td>
                      <td class="mailbox-date">28 mins ago</td>
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
        paginate: ['listing'],
        checkedNames : [],
        currentPage: 1,
        perPage: 10,
        totalRows: 0,
        fields: [
          'nama',
          'email',
          'nama_organisasi',
          'tingkatan',
          {key: 'actions'}
        ],
        sortBy: 'creator',
        sortDesc: false,
        filter: '',
        pageOptions: [ 5, 10, 15 ],
        token: localStorage.getItem('token_ppa'),
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
        })
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
