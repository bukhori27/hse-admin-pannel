<template>
  <div class="flex-row">
    <div class="container-fluid">
      <b-row>
        <div class="col-sm-6">
          <a @click="backTo" class="nav-link df nplr">
            <i class="nav-icon fas fa-arrow-left fs20 arrow-left"></i>
            <h1>Assign Issue</h1>
          </a>
        </div>
      </b-row>
      <b-row>
        <div class="col-6">
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
        <div class="col-6">
          <b-input-group>
            <label style="width: 100%; font-weight:600">Description</label>
            <textarea type="text" v-model="description" class="form-control mb-4 border-radius-8" placeholder="Penjelasan" rows="12"/>
          </b-input-group>
          <b-input-group>
            <label style="width: 100%; font-weight:600">Assign To</label>
            <select v-model="userId" class="register-custom-select mb-4">
              <option v-for="(user, i) in userList" :value="user.nama" :key="'user' + i">{{ user.nama }}</option>
            </select>
          </b-input-group>
        </div>
        <div class="col-5" style="display:none">
          <input type="file" class="form-control mb-4" @change="openFile">
        </div>
        <div class="col-12">
          <b-button button-rounded-border-radius label="Verify" variant="primary" rounded class="float-right" size="14" @click="submit" style="color:white; padding: 10px 25px; border-radius:5px;">
            Assign
          </b-button>
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
    name: 'AssignIssue',
    axios,
    data () {
      return {
        namacategory: '',
        description: '',
        finding: [],
        userList: [],
        userId: {},
        detailIssue: {},
        issueId: '',
        token: localStorage.getItem('token_hse'),
        fileId: '',
        imageFile: '',
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
      },
      userFunct () {
        let self = this
        var token = self.token
        var parameter = {
          token: self.token,
          page: 1,
          type: 6,
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'user_list', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.userList = response.data.user_list
            console.log(response.data.userList)
          } else {
            alert('SALAH...!')
          }
        })
      },
      openFile (event){
        let self = this
        var input = event.target
        self.imageFile = input.files[0];
        self.uploadImage()
      },
      uploadImage () {
        let self = this
        let fd = new FormData()
        fd.append('token', self.token)
        fd.append('photo_cover', self.imageFile)
        let urls = url.url_app + 'upload_document'
        axios({
          method: 'post',
          url: urls,
          data: fd,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {
            let responseData = response.data
            if (responseData.resultCode === 'OK') {
              self.fileId = responseData.data.id
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
      },
      submit () {
        let self = this
        console.log(self.userId)
        var token = self.token
        var parameter = {
          token: self.token,
          description: self.description,
          issue_id: self.issueId.id,
          assign: self.userId,
          state: 2, 
          image_id: self.fileId
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'assignto', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            window.history.back();
          } else {
            alert('SALAH...!')
          }
        })
      },
      closed () {
        alert ('apakah anda yakin untuk mengclosed issue?')
      },
      assign (index) {
        let self = this
        self.$router.push('/issue/assign/' + index)
      }
    },
    created: function () {
      this.issueId = this.$route.params;
      console.log(this.issueId)
      this.provincesFunc(this.issueId.id)
      this.userFunct()
    }
  }
</script>

