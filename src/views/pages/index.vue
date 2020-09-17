<template>
  <div>
    <div class="row">
      <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-info">
          <div class="inner">
            <h3>150</h3>

            <p>New Orders</p>
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
      <div class="col-6">
        <div class="card card-info">
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
              type="PieChart"
              :data="dailyData"
              :options="chartOptions"
            />
          </div>
        </div>
      </div>

      <div class="col-6">
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
              :data="CategoryData"
              :options="CategoryOptions"
            />
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
        dailyData: [
          ['Type', 'Count']
        ],
        chartOptions: {
          chart: {
            title: 'Issue',
            subtitle: ''
          },
          is3D: true,
          /** bars: 'horizontal',
          legend: { position: 'top' }
          **/
        },
        CategoryData: [
          ['month', 'Count']
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
      getData () {
        let self = this
        let data = [
          {'type': 'forclip', 'count':6},
          {'type': 'mesin', 'count':4},
          {'type': 'lantai', 'count':7},
          {'type': 'pintu', 'count':15},
        ]
        let Categorydata = [

          {'month': '04-2020', 'count':8},
          {'month': '05-2020', 'count':7},
          {'month': '06-2020', 'count':10},
          {'month': '07-2020', 'count':2},
          {'month': '08-2020', 'count':9},
        ]

        for (let i = 0; i < data.length; i++) {
          const propertyValues = Object.values(data[i]);
          self.dailyData.push(propertyValues)
        }
        for (let i = 0; i < Categorydata.length; i++) {
          const categorydata = Object.values(Categorydata[i]);
          self.CategoryData.push(categorydata)
        }
      },
    },
    created: function () {
      let self = this
      self.getData()
    }
  }
</script>