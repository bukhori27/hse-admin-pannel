<template>
  <div v-if="profil.pengguna_level == 1 || profil.pengguna_level == 2 || profil.pengguna_level == 4" class="flex-row">
    <div class="container-fluid">
      <div class="row" style="display:none">
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-info">
            <div class="inner">
              <h3>{{reportData}}</h3>

              <p>New Issue</p>
            </div>
            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-success">
            <div class="inner">
              <h3>53<sup style="font-size: 20px">%</sup></h3>

              <p>Bounce Rate</p>
            </div>
            <div class="icon">
              <i class="ion ion-stats-bars"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-warning">
            <div class="inner">
              <h3>44</h3>

              <p>User Registrations</p>
            </div>
            <div class="icon">
              <i class="ion ion-person-add"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-danger">
            <div class="inner">
              <h3>65</h3>

              <p>Unique Visitors</p>
            </div>
            <div class="icon">
              <i class="ion ion-pie-graph"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
      </div>
      <div class="row">

        <div class="col-12">
          <div class="card card-danger">
            <div class="card-header">
              <h3 class="card-title">Issue Chart</h3>
              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                  <i class="fas fa-minus"></i>
                </button>
                <button type="button" class="btn btn-tool" data-card-widget="remove">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
                <GChart
                type="LineChart"  
                :data="dateData"
                :options="CategoryOptions"
              />
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-6">
          <div class="card card-info">
            <div class="card-header">
              <h3 class="card-title">Issue by Prio Chart</h3>
              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                  <i class="fas fa-minus"></i>
                </button>
                <button type="button" class="btn btn-tool" data-card-widget="remove">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
                <GChart
                type="PieChart"
                :data="dailyData"
                :options="chartOptions" style="height: 340px;"
              />
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-6">
          <div class="card card-warning">
            <div class="card-header">
              <h3 class="card-title">Category Chart</h3>
              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                  <i class="fas fa-minus"></i>
                </button>
                <button type="button" class="btn btn-tool" data-card-widget="remove">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
                <GChart
                type="ColumnChart"
                :data="dataCategory"
                :options="barOptions" style="height: 340px;"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="flex-row">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <p>Create Issue</p>
              </div>
              <div class="icon">
                <i class="ion ion-bag"></i>
              </div>
              <a @click="goTo('/issue/create')" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <p>List Issue</p>
              </div>
              <div class="icon">
                <i class="ion ion-stats-bars"></i>
              </div>
              <a @click="goTo('/issue/')" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-warning">
              <div class="inner">

                <p>User</p>
              </div>
              <div class="icon">
                <i class="ion ion-person-add"></i>
              </div>
              <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-danger">
              <div class="inner">

                <p>Unique</p>
              </div>
              <div class="icon">
                <i class="ion ion-pie-graph"></i>
              </div>
              <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
        </div>
      </div>
      <!-- ./col -->
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
  import { url } from '../../url'
  import sha256 from 'sha256'
  import { GChart } from 'vue-google-charts'

  export default {
    name: 'Index',
    components: {
      GChart
    },
    axios,
    data () {
      return {
        token: localStorage.getItem('token_hse'),
        profil: JSON.parse(localStorage.getItem('profile')),
        reportData: '',
        dailyData: [
          ['Type', 'Count']
        ],
        chartOptions: {
          chart: {
            title: 'Issue',
            subtitle: ''
          },
          pieSliceText: 'label',
          slices: [{color: 'red'}, {color: 'yellow'}, {color: 'blue'}],
          is3D: true,
        },
        dataCategory: [
          ['Type', 'Count', { role: 'style' }]
        ],
        barOptions: {
          chart: {
            title: 'Issue',
            subtitle: ''
          },
          bars: 'horizontal',
          legend: { position: "none" }
        },
        dateData: [
          ['month', 'issue']
        ],
        CategoryOptions: {
          chart: {
            title: 'Issue',
            subtitle: ''
          },
          curveType: 'function',
          legend: { position: 'bottom' }
        }
      }
    },
    methods: {
      changeDate (date) {
        var todayTime = new Date(date);
        var month = todayTime.getMonth() + 1
        var day = todayTime.getDate()
        var year = todayTime.getFullYear()
        return month + "/" + day + "/" + year;
        // return date
      },
      reportTypeFunct () {
        let self = this
        var token = self.token
        let data = []
        var parameter = {
          token: token,
          type: "type"
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'report', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let report = response.data.report
            for (let i = 0; i < report.length; i++) {
              let a =  {
                type: report[i].nama,
                count: parseInt(report[i].count)
              }
              data.push(a)
            }
            for (let i = 0; i < data.length; i++) {
              const propertyValues = Object.values(data[i]);
              self.dailyData.push(propertyValues)
            }
          } else {
            alert('SALAH...!')
          }
        })
      },
      reportCategoryFunct () {
        let self = this
        var token = self.token
        let data = []
        var parameter = {
          token: token,
          type: "category"
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'report', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let report = response.data.report
            for (let i = 0; i < report.length; i++) {
              let a =  {
                type: report[i].nama,
                count: parseInt(report[i].count),
                style: self.rndColor()
              }
              data.push(a)
            }
            for (let i = 0; i < data.length; i++) {
              const propertyValues = Object.values(data[i]);
              self.dataCategory.push(propertyValues)
            }
          } else {
            alert('SALAH...!')
          }
        })
      },
      reportDateFunct () {
        let self = this
        var token = self.token
        let data = []
        var parameter = {
          token: token,
          type: "date"
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'report', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            let report = response.data.report
            for (let i = 0; i < report.length; i++) {
              let a =  {
                type: self.changeDate(report[i].date),
                count: parseInt(report[i].count)
              }
              data.push(a)
            }
            for (let i = 0; i < data.length; i++) {
              const propertyValues = Object.values(data[i]);
              self.dateData.push(propertyValues)
            }
            console.log(self.dateData)
          } else {
            alert('SALAH...!')
          }
        })
      },
      getData () {
        let self = this
        var token = self.token
        var parameter = {
          token: token,
          type: ""
        }
        var config = { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(url.url_app + 'report', parameter, config).then(function (response) {
          if (response.data.resultCode == 'OK') {
            self.reportData = response.data.report[0].count
          } else {
            alert('SALAH...!')
          }
        })
      },
      goTo (path, id) {
        let self = this
        self.LoginShow = false
        self.$router.push(path)
      },
      rndColor () {
        return Math.floor(Math.random()*16777215).toString(16);
      }
    },
    created: function () {
      let self = this
      self.getData()
      self.reportTypeFunct()
      self.reportDateFunct()
      self.reportCategoryFunct();
    }
  }
</script>