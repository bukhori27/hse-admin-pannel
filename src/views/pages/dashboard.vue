<template>
  <div class="flex-row">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card card-danger">
            <div class="card-header">
              <h3 class="card-title">Finding Patrol</h3>
            </div>
            <div class="card-body">
                <GChart
                type="BarChart"  
                :data="dateData"
                :options="CategoryOptions"
              />
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-2"></div>
        <div class="col-xs-12 col-md-12 row">
          <div class="col-xs-12 col-md-3 col-sm-6">
            <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title">Summary Findings</h3>
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
          <div class="col-xs-12 col-md-3 col-sm-6">
            <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title">Open</h3>
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
          <div class="col-xs-12 col-md-3 col-sm-6">
            <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title">On Progress</h3>
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
          <div class="col-xs-12 col-md-3 col-sm-6">
            <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title">Closed</h3>
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
        </div>
        <div class="col-xs-12 col-md-2"></div>
        <!-- <div class="col-xs-12 col-md-6">
          <div class="card card-warning">
            <div class="card-header">
              <h3 class="card-title">Category Chart</h3>
            </div>
            <div class="card-body">
                <GChart
                type="ColumnChart"
                :data="dataCategory"
                :options="barOptions" style="height: 340px;"
              />
            </div>
          </div>
        </div> -->
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
  import { url } from '../../url'
  import sha256 from 'sha256'
  import { GChart } from 'vue-google-charts'
  import IssueTempate from '../../components/Layout/IssueTempate.vue'    
  import { corechart } from '../../mixins/chart'

  export default {
    name: 'Index',
    components: {
      GChart,
      IssueTempate
    },
    axios,
    data () {
      return {
        token: localStorage.getItem('token_hse'),
        profil: JSON.parse(localStorage.getItem('profile')),
        reportData: '',
        colorStackbar: [],
        dailyData: [
          ['Type', 'Count']
        ],
        chartOptions: {},
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
        CategoryOptions: { },
        dateData: [
          ['PIC', 'Close', 'On Progress', 'Open']
        ],
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
        let dataColor = []
        let ab = ''
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
              ab = self.rndColor()
              if (ab.length < 6) ab = self.rndColor()
              dataColor.push(ab) 
              let a =  {
                type: report[i].nama,
                count: parseInt(report[i].count),
              }
              data.push(a)
            }
            for (let i = 0; i < data.length; i++) {
              const propertyValues = Object.values(data[i]);
              self.dailyData.push(propertyValues)
            }
            self.chartOptions = {
              chart: {
                title: 'Issue',
                subtitle: ''
              },
              pieSliceText: 'label',
              is3D: true,
              colors: dataColor
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
                color: self.rndColor()
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
      //stackbar
      reportDateFunct () {
        let self = this
        var token = self.token
        let data = []
        let ab = ''
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
              //type: self.changeDate(report[i].date),
              let a =  {
                type: report[i].nama,
                close: parseInt(report[i].close),
                onProgress: parseInt(report[i].onProgress),
                open: parseInt(report[i].open)
              }
              data.push(a)
            }
            
            for (let i = 0; i < 3; i++) {
              
              ab = self.rndColor()
              if (ab.length < 6) ab = self.rndColor()
              self.colorStackbar.push(ab)
            }
            self.CategoryOptions = {
              isStacked: true,
              colors: self.colorStackbar
            }
            self.CategoryOptions.color = self.colorStackbar
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
      if (self.token === null) {self.$router.push('')
      } else {
        if (self.profil.pengguna_level == 1 || self.profil.pengguna_level == 2 || self.profil.pengguna_level == 4) {
          self.getData()
          self.reportTypeFunct()
          self.reportDateFunct()
          self.reportCategoryFunct();
        }
      }
    }
  }
</script>