<template>
  <div class="flex-row card">
    <div class="container-fluid">
        <b-row class="card-head">
            <div class="col-sm-6">
                <a @click="backTo" class="nav-link df nplr">
                    <i class="nav-icon fas fa-arrow-left fs20 arrow-left"></i>
                    <h1>Perbaikan</h1>
                </a>
            </div>
        </b-row >
        <b-row class="card-body justify-content-center ">
            <div class="col-md-12">
            <div>
                <span> Code </span><br/><b><p> {{detailIssue.code}} </p></b>
                <span> Date </span><br/><b><p> {{detailIssue.date}} </p></b>
            </div>
            <div>
                <span> Findings </span><br/><b><p> {{detailIssue.finding}} </p></b>
            </div>
            </div>
        </b-row>
        <div class="col-xs-12 col-md-12 m-b-10 nplr">
          <label style="font-weight:600" class="col-md-12 col-form-label">Foto Perbaikan</label>
           <div class="fileinput fileinput-new col-xs-12 col-md-4 text-center" data-provides="fileinput">
              <div class="fileinput-new thumbnail">
                <img :src="!imageData ? 'static/img/icons/defaultImage.jpg' : imageData" alt="...">
              </div>
              <div class="fileinput-preview fileinput-exists thumbnail"></div>
              <div>
                <span class="btn btn-rose btn-round btn-file btn-primary">
                  <span class="fileinput-new">Select image</span>
                  <span class="fileinput-exists">Change</span>
                  <input type="file" @change="openFile" name="..." />
                </span>
                <a href="javascript:;" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i> Remove</a>
              </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-12 nplr" v-if="Image.length >= 0">
          <div class="col-xs-12 col-md-12 nplr row" >
            <div class="col-3 mt-10" v-for="(img, i) in Image">
              <img :src="!img.path ? 'static/img/icons/defaultImage.jpg' : img.path" class="rounded">
            </div>
            <input type="file" class="form-control mb-2" style="display:none;" id="fileUploads">
          </div>
        </div>
        <div class="col-md-12 row nplr jcr mb-20">
           <div class=""><button class="btn btn-warning mb-2 col-md-12" @click="Simpan(id_issue)">Simpan</button></div>
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
        token: localStorage.getItem('token_hse'),
        profil: JSON.parse(localStorage.getItem('profile')),
        imageData: '',
        Image: [],
        imageFile: '',
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
      openFile (event){
        let self = this
        var input = event.target
        self.imageFile = input.files[0];
        console.log(input)
        self.uploadImage()
      },
      uploadImage () {
        let self = this
        let fd = new FormData()
        fd.append('token', self.token)
        fd.append('photo_cover', self.imageFile)
        let urls = url.url_app + 'upload_document'
        self.Image.push(self.imageFile)
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
              self.imageData = url.url_image + responseData.data.file.path
              console.log(self.imageData)
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
      },
      Simpan () {
          let self = this
          self.$router.push('/issue')
      }
    },
    created: function () {
      let self = this
      //  this.id_issue = self.$route.query.id
      let id = self.$route.query.id
      // console.log(this.id_issue)
      this.provincesFunc(id)
    }
  }
</script>
