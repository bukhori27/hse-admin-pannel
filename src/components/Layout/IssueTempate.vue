<template>
    <section class="flex-row">
      <div class="container-fluid">
        <b-row>
          <div class="col-sm-6">
            <h1>Issue</h1>
          </div>
        </b-row>
        <b-row>
          <div class="col-md-3">
            <!--
              <a @click="goTo('/finding')" class="btn btn-primary btn-block mb-3 button-issue">Finding</a>
            -->
            <div class="card" v-if="profil.pengguna_level == 1 || profil.pengguna_level == 2">
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
                    <a @click="filterStatus('Open')" class="nav-link">
                      <i class="far fa-folder-open"></i> Open
                      <!-- <i class="fas fa-inbox"></i> -->
                      <span class="badge bg-primary float-right"></span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a @click="filterStatus('OnProgress')" class="nav-link">
                      <i class="far fa-paper-plane"></i> OnProgress
                      <!-- <i class="fas fa-filter"></i> -->
                    </a>
                  </li>
                  <!--
                    <li class="nav-item">
                      <a @click="filterPrio('draft')" class="nav-link">
                        <i class="far fa-file-alt"></i> Drafts
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="#" class="nav-link">
                        <i class="fas fa-filter"></i> Junk
                        <span class="badge bg-warning float-right">65</span>
                      </a>
                    </li>
                  -->
                  <li class="nav-item">
                    <a @click="filterStatus('Closed')" class="nav-link">
                      <i class="fas fa-archive"></i> Closed
                    </a>
                  </li>
                </ul>
              </div>
              <!-- /.card-body -->
            </div>
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Prio</h3>

                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
              </div>
              <div class="card-body p-0">
                <ul class="nav nav-pills flex-column">
                  <li class="nav-item active">
                    <a @click="filterPrio('1')" class="nav-link">
                      <i class="nav-icon far fa-circle text-danger"></i> Important
                    </a>
                  </li>
                  <li class="nav-item">
                    <a @click="filterPrio('2')" class="nav-link">
                      <i class="nav-icon far fa-circle text-warning"></i> Medium
                    </a>
                  </li>
                  <li class="nav-item">
                    <a @click="filterPrio('3')" class="nav-link">
                      <i class="nav-icon far fa-circle text-info"></i> Low
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
                <h3 class="card-title">Issue</h3>

                <div class="card-tools">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control" placeholder="Search issue">
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
                    <tr v-for="(indexs, id) in issue" @click="detailIssue(indexs.issue_id)" class="d-none d-md-block">
                      <td>
                        <div class="icheck-primary">
                          <b-img :src="indexs.img" alt="Responsive image" style="height:auto; width:230px;" v-if="indexs.img"/>
                        </div>
                      </td>
                      <td class="mailbox-name">{{title(indexs.user_name)}} <p class="p-t-5" >{{checkStatus(indexs.state)}}</p></td>
                      <td class="mailbox-subject"><b>{{indexs.issue_name}} </b><p class="npb">{{title(indexs.issue_description)}}</p><p v-bind:class="changeColor(indexs.type_id)" class="npb"> {{checkType(indexs.type_id)}}</p>
                      </td>
                      <td class="mailbox-attachment"></td>
                      <td class="mailbox-date">{{indexs.date}}</td> 
                      <td class="mailbox-date">
                        <a @click="detailIssue(indexs.issue_id)">
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                      </td>
                    </tr>
                    <!-- start show in mobile only -->
                    <tr v-for="(indexs, id) in issue" @click="detailIssue(indexs.issue_id)" class="d-block d-md-none">
                      <td>
                        <div class="icheck-primary" @click="detailIssue(indexs.issue_id)">
                          <p class="m-b-10"><b>{{indexs.issue_name}} </b> <br/></p>
                          <b-img class="m-b-10" :src="indexs.img" alt="Responsive image" style="height:auto; width:230px; margin-bottom:10px;" v-if="indexs.img"/>
                          <p>From: {{title(indexs.user_name)}} </p><p>{{indexs.date}}</p>
                          <p class="m-b-10">{{title(indexs.issue_description)}}</p>
                          <p class="m-b-10"> Prio : <span v-bind:class="changeColor(indexs.type_id)">{{checkType(indexs.type_id)}}</span></p>
                          <p class="p-t-5 m-b-10" >State : {{checkStatus(indexs.state)}}</p>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- end show in mobile only -->
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
                    1-{{countData}}/{{countData}}
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
    name: 'Issue',
    axios,
    data () {
      return {
        checked: false,
        listing: [],
        imgContent: 'static/img/icons/logo.png',
        pageNumber: 0,
        paginate: ['listing'],
        checkedNames : [],
        currentPage: 1,
        perPage: 10,
        totalRows: 0,
        issue: [],
        sortBy: 'creator',
        sortDesc: false,
        filter: '',
        pageOptions: [ 5, 10, 15 ],
        token: localStorage.getItem('token_hse'),
        profil: JSON.parse(localStorage.getItem('profile')),
        pages: 1,
        pageSize: 0,
        countData: 1,
        popup: false,
        fontColor: '',
      }
    },
    methods: {
      onFiltered (filteredItems) {
        // this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      filterStatus (status) {
        let self = this
        self.listUser(1, 1, status)
      },
      filterPrio (data) {
        let self = this
        console.log(data)
        self.listUser(1, 2, data)
      },
      title(str) {
        return str.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
      },
      paragrafCase(str) {
        var sentence = str.toLowerCase().split(" ");
        for(var i = 0; i< sentence.length; i++){
          sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
        return sentence.join(" ");
      },
      showPopup () {
        let self = this
        if (self.popup == true) return self.popup = false
        else return self.popup = true
      },
      checkStatus (index) {
        let self = this
        if (index == 1) {
          return 'Open' 
        }
        else if (index == 2 || index == 3 || index == 4 || index == 5) { 
          return 'Onprogress' 
        }
        else { 
          return 'Closed' 
        }
      },
      
      checkType (index) {
        let self = this
        if (index == 1) {
          return 'Important' 
        }
        else if (index == 2) { 
          return 'Warning' 
          }
        else { 
          return 'Low' 
        }
      },
      changeColor (index) {
        let self = this
        if (index == 1) {
          return'font-red'
        }
        else if (index == 2) { 
          return'font-yellow'
          }
        else { 
          return'font-blue'
        }
      },
      
      listUser (page, type, data) {
        let self = this
        let status = []
        let dump2 =''
        let parameter = ''
        if (type === ''){
          parameter = {
            token: self.token,
            "page": page,
            "type" : "",
            "filter" : data
          }
        }else if(type === 1) {
          parameter = {
            token: self.token,
            "page": page,
            "type" : "status",
            "filter" : data
          }
        }else{
          parameter = {
            token: self.token,
            "page": page,
            "type" : "type",
            "filter" : data
          }
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
                issue_name: dump[i].issue_name, 
                category_description: dump[i].category_description, 
                category_name: dump[i].category_name,  
                date: dump[i].date, 
                image_name: dump[i].image_name, 
                issue_id: dump[i].issue_id, 
                issue_description: dump[i].issue_description,
                location_description: dump[i].location_description, 
                location_nama: dump[i].location_nama, 
                img: url.url_image + dump[i].path, 
                type_description: dump[i].type_description, 
                type_id: dump[i].type_id, 
                type_nama: dump[i].type_nama,  
                state: parseInt(dump[i].state),  
                user_name: dump[i].user_name, 
              }
              status.push(b)
              self.totalRows = response.data.count_data
            }
            self.issue = status 
            self.pages = response.data.current_page
            self.pageSize = response.data.page_size
            self.countData = response.data.count_data
          } else {
            alert('SALAH...!')
          }
        })
      },
      goTo (path) {
        let self = this
        self.LoginShow = false
        self.$router.push(path)
      },
      detailIssue(index) {
        let self = this
        self.$router.push('/issue/detail/' + index)
      },
    },
    created: function () {
      let self = this
      self.listUser(1,"", 1)
    }
  }
</script>
