<template>
  <div class="flex-row card">
    <div class="container-fluid">
      <b-row class="card-head">
        <div class="col-sm-6">
        <a @click="backTo" class="nav-link df nplr">
          <i class="nav-icon fas fa-arrow-left fs20 arrow-left"></i>
          <h1>Detail Issue</h1>
        </a>
        </div>
      </b-row >
      <b-row class="card-body justify-content-center ">
        <div class="col-md-6">
        </div>
        <div class="col-md-6 nplr">
          <div class="col-md-12 row jcr" v-if="detailIssue.state == 1 && (profil.pengguna_level == 1) ">
            <div class="smnpr mr-10"><button class="btn btn-primary mb-2 col-md-12" @click="EditForm()">Edit</button></div>
            <div class="smnpr mr-10"><button class="btn btn-danger mb-2 col-md-12" @click="closed(id_issue)" v-if="profil.pengguna_level == 1">Closed</button></div>
            <div class="smnpr mr-10"><button class="btn btn-danger mb-2 col-md-12" data-toggle="modal" data-target="#modalClosed">Closed</button></div>
            <div class="smnpr"><button class="btn btn-warning mb-2 col-md-12" data-toggle="modal" data-target="#modalAssign">Assign</button></div>
            </div>
          <div class="col-md-12 row nplr jcr" v-if="detailIssue.state == 2">
            <div class="smnpr mr-10"><button class="btn btn-danger mb-2 col-md-12" @click="closed(id_issue)" v-if="profil.pengguna_level == 1">Closed</button></div>
            <div class="smnpr mr-10"><button class="btn btn-warning mb-2 col-md-12" @click="createrepair(id_issue)" >Create Repair</button></div>
          </div>
          <div class="col-md-12 row nplr jcr" v-if="detailIssue.state == 3 || detailIssue.state == 4">
            <div class="smnpr mr-10"><button class="btn btn-danger mb-2 col-md-12" @click="closed(id_issue)" v-if="profil.pengguna_level == 1">Closed</button></div>
            <div class="smnpr mr-10"><button class="btn btn-warning mb-2 col-md-12" data-toggle="modal" data-target="#modalConfirmation">Confirmation</button></div>
          </div>
          <div class="col-md-12 row nplr" v-else>
          </div>
        </div>
        <div class="col-md-12 mt-20">
          <div class="row col-xs-12 col-md-12 nplr mb-2 nplr">
            <label style="font-weight:600" class="col-md-2 col-form-label">Code</label>
            <span> {{detailIssue.code}} </span>
          </div>
          <div class="row col-xs-12 col-md-12 nplr mb-2 nplr">
            <label style="font-weight:600" class="col-md-2 col-form-label">Findings</label>
            <input type="text" v-model="detailIssue.finding" class="form-control mb-2 border-left col-md-10 npr" placeholder="" :readonly="editForm">
          </div>
          <div class="row col-xs-12 col-md-12 nplr mb-2 nplr">
            <label style="font-weight:600" class="col-md-2 col-form-label">Section</label>
            <input type="text" v-model="detailIssue.section_name" class="form-control mb-2 border-left col-md-10 npr" placeholder="" :readonly="editForm">
          </div>
          <div class="row col-xs-12 col-md-12 nplr mb-2 nplr">
            <label style="font-weight:600" class="col-md-2 col-form-label">Area</label>
            <input type="text" v-model="detailIssue.area" class="form-control mb-2 border-left col-md-10 npr" placeholder="" :readonly="editForm">
          </div>
          <div class="row col-xs-12 col-md-12 nplr mb-2 nplr">
            <label style="font-weight:600" class="col-md-2 col-form-label">PIC</label>
            <input type="text" v-model="detailIssue.pic" class="form-control mb-2 border-left col-md-10 npr" placeholder="" readonly>
          </div>
          <div class="row col-xs-12 col-md-12 nplr mb-2 nplr">
            <label style="font-weight:600" class="col-md-2 col-form-label">Date</label>
            <input type="date" v-model="detailIssue.date" class="form-control mb-2 border-left col-md-10 npr" placeholder="" :readonly="editForm">
          </div>
          <div class="row col-xs-12 col-md-12 nplr mb-2 nplr">
            <label style="font-weight:600" class="col-md-2 col-form-label">Code</label>
            <span> {{checkStatus(detailIssue.state)}} </span>
          </div>
          <div class="col-md-12 nplr row jcr" v-if="!editForm">
            <div class="smnpr"><button class="btn btn-warning mb-2 col-md-12" @click="Save()">Save</button></div>
          </div>
          <div class="row">
            <div class="col-md-12"><span> Images Temuan </span><br/></div>
            <div class="col-md-4 mt-10" v-for="(indexs, id) in detailIssue.attachment"> <img :src=" indexs.path"></div>
          </div>
        </div>
        <div class="col-md-12 mt-20">
        <hr/>
          <h3 class="card-title col-md-12 nplr">History</h3>
          <b-table class="t-1" responsive="xs" :items="finding">
            <template slot="id" slot-scope="row">
            {{row.item.id}}
            </template>
            <template slot="actions" slot-scope="row">
              <router-link  v-bind:to="'/issue/detail?id=' + row.item.id + '&type='+ row.item.id_status"  data-original-title="View"><b-button variant="warning" style="border-radius: 20%"><i class="fas fa-pencil-alt"></i></b-button></router-link>
              <b-button variant="danger" style="border-radius: 20%" @click="deleted(row.item.id)"><i class="fas fa-trash-alt"></i></b-button>
            </template>
          </b-table>
        </div>
      </b-row>
      <!-- modal assign -->
      <div class="col-3">
        <div class="modal fade" id="modalAssign" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Assign</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                List PIC
                <select v-model="picID" class="register-custom-select mb-2 col-md-12 npr">
                  <option v-for="(index, i) in listPic" :value="index.id" :key="'index' + i">{{ index.nama }}</option>
                </select> 
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                <button type="button" class="btn btn-warning">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- modal closed -->
      <div class="col-3">
        <div class="modal fade" id="modalClosed" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Closed Findings</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Noted
                <textarea v-model="reason" class="form-control mb-4 border-radius-8 border-left col-md-10 npr" placeholder="" rows="15"/>
         
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                <button type="button" class="btn btn-warning" @click="closed()">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- modal confirmation -->
      <div class="col-3">
        <div class="modal fade" id="modalConfirmation" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Confirmation Repair</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Apakah Anda Yakin perbaikan sudah selesai?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                <button type="button" class="btn btn-warning" @click="confirmation()">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  import Multiselect from 'vue-multiselect'
  import { url } from '../../url'
  import sha256 from 'sha256'

  export default {
    name: 'DetailIssue',
    axios,
    data () {
      return {
        namacategory: '',
        description: '',
        finding: [],
        detailIssue: {},
        id_issue: '',
        isOpen: false,
        token: localStorage.getItem('token_hse'),
        profil: JSON.parse(localStorage.getItem('profile')),
        showAssign: false,
        picID: '',
        reason: '',
        listPic: [],
        editForm: true
      }
    },
    methods: {
      submit () {

      },
      EditForm () {
        let self = this
        self.editForm = false
      },
      Save () {
        let self = this
        self.editForm = true
      },
      toggleAccordion() {
        this.isOpen = !this.isOpen;
      },
      changeformatDate(date) {
        let dump = new Date(date)
        let dd = dump.getDate()
        if (dd < 10) dd = '0' + dd
        let mm = dump.getMonth() + 1
        if (mm < 10) mm = '0' + mm
        let yyyy = dump.getFullYear()   
        return  yyyy + '-' + mm + '-' + dd
      },
      backTo () {
        let self = this
        window.history.back();
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
      checkStatus (state) {
        let data = parseInt(state)
        if (data === 1) return 'Draft'
        else if (data === 2) return 'Open'
        else if (data === 3 || data === 4) return 'On Progress'
        else return 'Closed'
      },
      checkStatusDetail (state) {
        let data = parseInt(state)
        if (data === 1) return 'Create Findings'
        else if (data === 2) return 'Assign Findings'
        else if (data === 3 ) return 'Fix Findings'
        else if (data === 4 ) return 'Review Findings'
        else return 'Closed'
      },
      PICList (){
        let self = this
        let data = [{
          id: 1,
          nama: 'ss'
        },
        {
          id: 2,
          nama: 'MM'
        }]
        self.listPic = data
      },
      provincesFunc (data) {
        let self = this
        var token = self.token
        var parameter = {
          token: token,
          id: data
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'issue_view', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let report = response.data
            let issue_view = report.issue_view
            self.detailIssue = issue_view
            self.detailIssue.date = self.changeformatDate(self.detailIssue.date)
            let progress = report.progress
            let dataProgress = []
            // img: url.url_image + progress[i].path,
            for (let i = 0; i < progress.length; i++) {
              let dumpdataprogress = {
                date: progress[i].date,
                user: progress[i].user,
                state: self.checkStatusDetail(progress[i].state),
              }
              dataProgress.push(dumpdataprogress)
            }
            self.finding = dataProgress
          } else {
            alert('SALAH...!')
          }
        })
      },
      closed () {
        let self = this
        console.log(self.userId)
        var token = self.token
        var parameter = {
          token: self.token,
          description: "",
          issue_id: self.id_issue,
          state: 6, 
          image_id: ""
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'confirmation', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            window.history.back();
          } else {
            alert('SALAH...!')
          }
        })
      },
      confirmation(index) {
        let self = this
        window.history.back();
        var token = self.token
        var parameter = {
          token: self.token,
          description: "",
          issue_id: self.issueId.id,
          state: 6, 
          image_id: ""
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'confirmation', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            window.history.back();
          } else {
            alert('SALAH...!')
          }
        })
      },
      createrepair(index) {
        let self = this
        self.$router.push('/issue/createRepair?id=' + index)
      },
      assign () {
        let self = this
        var token = self.token
        let id = self.issueId.id
        var parameter = {
          token: token
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'findings/'+ id + 'assign', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let report = response.data
          } else {
            alert('SALAH...!')
          }
        })
      }
    },
    created: function () {
      let self = this
      //  this.id_issue = self.$route.query.id
      let id = self.$route.query.id
      self.id_issue = id
      self.PICList()
      // console.log(this.id_issue)
      this.provincesFunc(id)
    }
  }
</script>
