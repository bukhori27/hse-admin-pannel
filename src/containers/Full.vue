<template>
  <div class="app layout-fixed"">
    <AppHeader/>
    <AppMenu/>
    <div class="content-wrapper">
      <main>
        <div class="container-fluid no-padding mt-10" style="position: relative;overflow: hidden;">
            <router-view></router-view>
        </div>
      </main>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import nav from '../_nav'
import { Header as AppHeader, Footer as AppFooter, Menu as AppMenu } from '../components/'

export default {
  name: 'full',
  components: {
    AppHeader,
    AppMenu,
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
