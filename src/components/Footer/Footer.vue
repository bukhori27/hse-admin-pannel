<template>
   <div class="container-fluid2">
      <div class="row nplr">
        <div class="credits ml-auto">
          <span class="copyright">
            © 2021
          </span>
        </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import { url } from '../../url'
export default {
  	name: 'Lfooter_',
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
    created: function () {
    }
}
</script>
