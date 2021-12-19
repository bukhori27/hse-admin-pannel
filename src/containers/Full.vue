<template>
  <div class="wrapper">
    <AppHeader/>
    <div class="main-panel">
      <AppSidebar/>
      <div class="container-fluid no-padding m-t-80" style="position: relative;overflow: hidden;">
        <router-view></router-view>
      </div>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import nav from '../_nav'
import { Header as AppHeader, Sidebar as AppSidebar, FooterPrivate as AppFooter } from '../components/'

export default {
  name: 'full',
  components: {
    AppHeader,
    AppFooter,
    AppSidebar
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
