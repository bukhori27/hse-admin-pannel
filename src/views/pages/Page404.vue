<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <div class="clearfix">
            <h1 class="float-left display-3 mr-4">404</h1>
            <h4 class="pt-3">Oops! Sepertinya anda nyasar ;)</h4>
            <p class="text-muted">Halaman yang anda tuju tidak tersedia.</p>
          </div>
          <b-input-group>
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-search"></i>
              </span>
            </div>
            <input id="prependedInput" class="form-control" size="16" type="text" placeholder="Apa yang anda cari?">
            <div class="input-group-append">
              <b-button variant="info">Cari</b-button>
            </div>
          </b-input-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404'
}
</script>
