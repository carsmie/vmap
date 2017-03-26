<template>
  <div id="app">
    <search></search>
    <vmap></vmap>
    <baseLayerSwitcher></baseLayerSwitcher>
  </div>
</template>

<script>
  import Search from './components/Search'
  import vmap from './components/Map'
  import baseLayerSwitcher from './components/BaseLayerSwitcher'

  export default {
    name: 'app',
    components: {
      Search, vmap, baseLayerSwitcher
    }
  }
</script>

<style lang="scss">
 @import "./assets/styles/_main.scss";

#app {
  text-align: center;
  color: #2c3e50;
}

body {
  background: $white;
  color: $dark;
  font-size: $font-small;
  font-family: $font-default;
  line-height: $line-height-xsmall;
}

p {
  line-height: $line-height-small;
}
</style>
