<template>
  <div class="app">
    <AppHeader/>
    <div>
      <main class="main container-simple">
        <div class="container-fluid no-padding bg-gray" style=" margin-top: 78px;">
          <router-view></router-view>
          <AppFooter/>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import nav from '../_nav'
import { Headers as AppHeader, FooterPublic as AppFooter } from '../components/'

export default {
  name: 'simple',
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
