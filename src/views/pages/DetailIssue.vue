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
                    <span> Observer </span><br/><b><p> {{detailIssue.observer}}</p></b>
                </div>
                <div>
                    <span> Executor </span><br/><b><p> {{detailIssue.executor}} </p></b>
                </div>
                <div>
                    <span> Status </span><br/><b><p> {{checkStatus(detailIssue.state)}}</p></b>
                </div>
            </div>
            <div class="col-md-4">
                <a class="btn btn-primary btn-block mb-2 button-issue">Closed</a>
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
                            <a @click="goTo('/issue')" class="btn btn-secondary btn-block mb-2 button-issue ml10">{{checkType(indexs.state)}}</a>
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
        detailIssue: {}
      }
    },
    methods: {
      submit () {

      },
      backTo () {
        let self = this
        window.history.back();
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
          return 'repaired by executor' 
        }
        else if (index == 4) { 
          return 'confirmation by Observer' 
        }
        else { 
          return 'closed Issue' 
        }
      },
      checkType (index) {
        let self = this
        if (index == 1) {
          return 'Admin' 
        }
        else if (index == 2) { 
          return 'Observer' 
        }
        else if (index == 3) { 
          return 'executor' 
        }
        else { 
          return 'closed Issue' 
        }
      },
      provincesFunc () {
        let self = this
        self.detailIssue = {
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
        ]
      },
    },
    created: function () {
      this.provincesFunc()
    }
  }
</script>
