<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <main class="main">
        <div class="container-fluid no-padding" style="position: relative;overflow: hidden;">
          <router-view></router-view>
        </div>
        <AppFooter/>
      </main>
    </div>
  </div>
</template>

<script>
import nav from '../_nav'
import { Header as AppHeader, Footer as AppFooter } from '../components/'

export default {
  name: 'full',
  components: {
    AppHeader,
    AppFooter
  },
  data () {
    return {
      nav: ''
    }
  },
  methods: {
    viewemail () {
      var privilage = localStorage.getItem ('privilage')
      if(privilage ==='user'){
        this.nav = nav.items2
      }else {
        this.nav = nav.items
      }
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
  },
  created () {
    this.viewemail()
  }
}
</script>
