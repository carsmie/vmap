<template>
  <div id='vmap'
       class='fullSizeMap'>
  </div>
</template>
<script>
import {map, mapConfig} from '../services/mapHelper'

export default {
  name: 'vmap',
  methods () {
  },
  mounted () {
    map.Init('vmap', mapConfig)
    map.AddZoom()
    console.log('Map initialised')
  }
}

</script>
<style lang='scss'>

</style>
