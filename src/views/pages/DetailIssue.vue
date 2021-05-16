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
              <div class="col-md-12 row nplr">
                <div class="col-md-6 npl"><a class="btn btn-danger mb-2 button-issue col-md-12">Closed</a></div>
                <div class="col-md-6 npr"><a class="btn btn-primary mb-2 button-issue col-md-12">Assign</a></div>
              </div>
            </div>
            <div class="col-md-12">
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
                        <div class="col-md-4">
                            <a class="btn btn-secondary btn-block mb-2 button-issue ml10">{{checkType(indexs.state)}}</a>
                            <p class="tar">{{indexs.date}}</p>
                        </div>
                        <div class="col-md-8">
                            <b><span>{{indexs.name}}</span></b> <br/>
                            <p>{{indexs.description}}</p>
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
          return 'Progresss' 
        }
        else if (index == 2) { 
          return 'Checking by Observer' 
        }
        else if (index == 3) { 
          return 'Repaired by Executor' 
        }
        else if (index == 4) { 
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
              title: self.paragrafCase(issue_view.issue_name), 
              description: self.title(issue_view.issue_description), 
              img: url.url_image + issue_view.path,
              executor: issue_view.executor,
              observer: issue_view.observer,
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
        /* self.detailIssue = {
            reporter: 'Alexander', 
            title: 'Keramik Pecah', 
            description: 'testing menggunakan description apa yang terjadi apakah menjadi panjang atau gimana??', 
            img: self.imgContent,
            executor: 'aminah',
            observer: 'juminten',
            date: '2020-09-22',
            state: 2,
        }
        self.finding = [
            {id: 1, name: 'Alexander', title: 'Keramik Pecah', description: 'testing menggunakan description apa yang terjadi apakah menjadi panjang atau gimana??', img: self.imgContent, date : '2020-09-22', state: 1 },
            {id: 2, name: 'Alexander', title: 'Keramik Pecah', description: 'testing menggunakan description apa yang terjadi apakah menjadi panjang atau gimana??', img: self.imgContent, date : '2020-09-22', state: 2 },
            {id: 3, name: 'Alexander', title: 'Keramik Pecah', description: 'testing menggunakan description apa yang terjadi apakah menjadi panjang atau gimana??', img: self.imgContent, date : '2020-09-22', state: 3 },
            {id: 4, name: 'Alexander', title: 'Keramik Pecah', description: 'testing menggunakan description apa yang terjadi apakah menjadi panjang atau gimana??', img: self.imgContent, date : '2020-09-22', state: 1 },
            {id: 5, name: 'Alexander', title: 'Keramik Pecah', description: 'testing menggunakan description apa yang terjadi apakah menjadi panjang atau gimana??', img: self.imgContent, date : '2020-09-22', state: 4 }
        ] */
      },
    },
    created: function () {
      this.user = this.$route.params;
      console.log(this.user)
      this.provincesFunc(this.user.id)
    }
  }
</script>
