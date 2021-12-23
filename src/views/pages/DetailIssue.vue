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
            <div class="col-md-6 smnpl"><a class="btn btn-danger mb-2 button-issue col-md-12" @click="closed(id_issue)">Closed</a></div>
            <div class="col-md-6 smnpr"><a class="btn btn-primary mb-2 button-issue col-md-12" @click="assign(id_issue)">Assign</a></div>
            </div>
          <div class="col-md-12 row nplr" v-if="detailIssue.state == 2 || detailIssue.state == 3 || detailIssue.state == 4 || detailIssue.state == 5">
            <div class="col-md-6 smnpl"><a class="btn btn-danger mb-2 button-issue col-md-12" @click="closed(id_issue)" v-if="profil.pengguna_level == 1 || profil.pengguna_level == 2">Closed</a></div>
            <div class="col-md-6 smnpr"><a class="btn btn-primary mb-2 button-issue col-md-12" @click="confirmation(id_issue)">Confirmation</a></div>
          </div>
          <div class="col-md-12 row nplr" v-else>
          </div>
        </div>
        <div class="col-md-12" v-if="finding.length > 0">
          <div class="card card-timeline card-plain pb15">
            <div class="card-header" @click="toggleAccordion()"
              :aria-expanded="isOpen"
              :aria-controls="`collapse${_uid}`">
              <div class="row">
                <h3 class="card-title col-md-11">Status</h3>
                <div class="card-tools col-md-1" style="float:right">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="nc-icon nc-minimal-down"></i>
                  </button>
                </div>
              </div>
            </div>
             <div class="card-body" v-show="isOpen" :id="`collapse${_uid}`">
                <ul class="timeline timeline-simple" >
                  <li class="timeline-inverted" v-for="(indexs, id) in finding" >
                    <div class="timeline-badge danger" v-if="indexs.status === 'Manager'">
                      <i class="nc-icon nc-single-copy-04"></i>
                    </div>
                    <div class="timeline-badge success" v-if="indexs.status === 'Reporter'">
                      <i class="nc-icon nc-sun-fog-29"></i>
                    </div>
                    <div class="timeline-badge info" v-else>
                      <i class="nc-icon nc-world-2"></i>
                    </div>
                    <!-- <div class="timeline-badge danger" v-else>
                      <i class="nc-icon nc-single-copy-04"></i>
                    </div> -->
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <span class="badge badge-pill badge-danger">{{indexs.status}}</span>
                      </div>
                      <div class="timeline-body">
                        <p> {{indexs.description}} </p>
                        <p>{{indexs.name}}</p>
                      </div>
                      <h6>
                        <i class="ti-time"></i>
                        {{indexs.date}}
                      </h6>
                    </div>
                  </li>
                </ul>
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
        id_issue: '',
        isOpen: false,
        token: localStorage.getItem('token_hse'),
        profil: JSON.parse(localStorage.getItem('profile')),
      }
    },
    methods: {
      submit () {

      },
      toggleAccordion() {
        this.isOpen = !this.isOpen;
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
      checkStatus (data) {
        let self = this
        console.log(data)
        let index = parseInt(data)
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
            console.log( report.progress)
            let dumpdata = {
              reporter: self.paragrafCase(issue_view.id_user), 
              id: issue_view.issue_id, 
              title: self.paragrafCase(issue_view.title), 
              description: self.title(issue_view.description), 
              img: url.url_image + issue_view.path,
              executor: issue_view.executor,
              observer: issue_view.assign_to,
              date: issue_view.issue_date,
              state: issue_view.status,
            }
            self.detailIssue = dumpdata
            let progress = report.progress
            let dataProgress = []
            for (let i = 0; i < progress.length; i++) {
              let dumpdataprogress = {
                name: self.paragrafCase(progress[i].user_name),
                img: url.url_image + progress[i].path,
                state: progress[i].state,
                status: progress[i].privilage_name,
                
                description: self.title(progress[i].description),
                date: progress[i].date
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
        self.$router.push('/issue/confirmation?id=' + index)
      },
      assign (index) {
        let self = this
        self.$router.push('/issue/assign?id=' + index)
      }
    },
    created: function () {
      let self = this
      this.id_issue = self.$route.query.id
      console.log(this.id_issue)
      this.provincesFunc(this.id_issue)
    }
  }
</script>
