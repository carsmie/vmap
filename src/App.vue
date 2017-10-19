<template>
  <div id="app">
    <vmap></vmap>
  </div>
</template>

<script>
import vmap from './components/Map'

export default {
  name: 'app',
  components: {
    vmap
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
