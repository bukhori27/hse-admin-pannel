<template>
  <div class="flex-row">
    <div class="container-fluid">
      <b-row>
        <div class="col-sm-6">
        <a @click="backTo" class="nav-link df nplr">
          <i class="nav-icon fas fa-arrow-left fs20 arrow-left"></i>
          <h1>Detail Issue</h1>
        </a>
        </div>
      </b-row>
      <b-row>
        <div class="col-md-8">
          <div>
            <span> Title </span><br/><b><p> {{detailIssue.title}} </p></b>
          </div>
          <div>
            <span> Reporter </span><br/><b><p> {{detailIssue.reporter}} </p></b>
          </div>
          <div>
            <span> Observer </span><br/><b><p> {{ detailIssue.observer ? paragrafCase(detailIssue.observer) : '-'}}</p></b>
          </div>
          <div>
            <span> Executor </span><br/><b><p> {{detailIssue.executor ? paragrafCase(detailIssue.executor) : '-'}} </p></b>
          </div>
          <div>
            <span> Status </span><br/><b><p> {{checkStatus(detailIssue.state)}}</p></b>
          </div>
        </div>
        <div class="col-md-4">
          <div class="col-md-12 row nplr" v-if="detailIssue.state == 1 && (profil.pengguna_level == 1 || profil.pengguna_level == 2) ">
            <div class="col-md-6 smnpl"><a class="btn btn-danger mb-2 button-issue col-md-12" @click="closed(detailIssue.id)">Closed</a></div>
            <div class="col-md-6 smnpr"><a class="btn btn-primary mb-2 button-issue col-md-12" @click="assign(detailIssue.id)">Assign</a></div>
            </div>
          <div class="col-md-12 row nplr" v-if="detailIssue.state == 2 || detailIssue.state == 3 || detailIssue.state == 4 || detailIssue.state == 5">
            <div class="col-md-6 smnpl"><a class="btn btn-danger mb-2 button-issue col-md-12" @click="closed(detailIssue.id)" v-if="profil.pengguna_level == 1 || profil.pengguna_level == 2">Closed</a></div>
            <div class="col-md-6 smnpr"><a class="btn btn-primary mb-2 button-issue col-md-12" @click="confirmation(detailIssue.id)">Confirmation</a></div>
          </div>
          <div class="col-md-12 row nplr" v-else>
          </div>
        </div>
        <div class="col-md-12" v-if="finding.length > 0">
          <div class="card">
          <div class="card-header">
            <h3 class="card-title">Status</h3>
            <div class="card-tools">
            <button type="button" class="btn btn-tool" data-card-widget="collapse">
              <i class="fas fa-minus"></i>
            </button>
            </div>
          </div>
          <div class="card-body p-0 mt-10">
            <div v-for="(indexs, id) in finding" class="row" >
              <div class="col-md-4 col-xs-12">
                <p class="xspl-15 xpr-15"><a class="btn btn-secondary btn-block mb-2 button-issue ">{{checkType(indexs.state)}}</a> </p>
                <p class="tar xpl-15 xpr-15">{{indexs.date}}</p>
              </div>
              <div class="col-md-8 col-xs-12">
                <b><p class="xpl-15">{{indexs.name}}</p></b>
                <p class="xpl-15 xpr-15">{{indexs.description}}</p>
              </div>
            </div>
          </div>
          <!-- /.card-body -->
          </div>
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
        token: localStorage.getItem('token_hse'),
        profil: JSON.parse(localStorage.getItem('profile')),
      }
    },
    methods: {
      submit () {

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
      checkStatus (index) {
        let self = this
        if (index == 1) {
          return 'Open' 
        }
        if (index == 2) {
          return 'Progresss' 
        }
        else if (index == 3) { 
          return 'Checking by Observer' 
        }
        else if (index == 4) { 
          return 'Repaired by Executor' 
        }
        else if (index == 5) { 
          return 'confirmation by Observer' 
        }
        else { 
          return 'Closed Issue' 
        }
      },
      checkType (data) {
        let index = parseInt(data)
        let self = this
        if (index == 1) {
          return 'Admin' 
        }
        else if (index == 2) { 
          return 'Observer' 
        }
        else if (index == 3) { 
          return 'Executor' 
        }
        else { 
          return 'Closed Issue' 
        }
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
            let dumpdata = {
              reporter: self.paragrafCase(issue_view.user_name), 
              id: issue_view.issue_id, 
              title: self.paragrafCase(issue_view.issue_name), 
              description: self.title(issue_view.issue_description), 
              img: url.url_image + issue_view.path,
              executor: issue_view.executor,
              observer: issue_view.assign_to,
              date: issue_view.issue_date,
              state: issue_view.state,
            }
            self.detailIssue = dumpdata
            let progress = report.progress
            let dataProgress = []
            for (let i = 0; i < progress.length; i++) {
              let dumpdataprogress = {
                name: self.paragrafCase(progress[i].user_name),
                img: url.url_image + progress[i].path,
                state: progress[i].state,
                description: self.title(progress[i].description),
                date: progress[i].progress_date
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
        alert ('apakah anda yakin untuk mengclosed issue?')
        let self = this
        console.log(self.userId)
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
      confirmation(index) {
        let self = this
        self.$router.push('/issue/confirmation/' + index)
      },
      assign (index) {
        let self = this
        self.$router.push('/issue/assign/' + index)
      }
    },
    created: function () {
      this.user = this.$route.params;
      console.log(this.user)
      this.provincesFunc(this.user.id)
    }
  }
</script>
