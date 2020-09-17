<template>
  	<div class="main-footer">
      <strong>Copyright © 2020 Platform HSE.</strong>
      All rights reserved.
	</div>	
</template>
<script>
import axios from 'axios'
import { url } from '../../url'
export default {
  	name: 'Footer',
    axios,
    data ()	{
      return {
      }
    },
    methods: {
      goTo (path, id) {
        let self = this
        self.LoginShow = false
        self.$router.push(path)
      },
    },
    created () {
    }
}
</script>
