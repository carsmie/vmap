<template>
  <div id='vmap'
       class='fullSizeMap'>
  </div>
</template>
<script>
import { map, mapConfig, addLayer } from '../services/mapHelper'

export default {
  name: 'vmap',
  methods: {},
  mounted () {
    map.Init('vmap', mapConfig)
    // Add historiske wms kart as an example how to add layers
    addLayer('WMS', {
      type: 'overlay',
      gatekeeper: 'true',
      name: 'amts­kart',
      url: 'https://wms.geonorge.no/skwms1/wms.historiskekart',
      maxResolution: 2,
      params: {
        layers: 'amt1',
        format: 'image/png'
      },
      options: {
        isbaselayer: 'false',
        singletile: 'true',
        visibility: 'true'
      }
    })
    map.AddZoom()
    console.log('Map initialised')
  }
}
</script>
<style lang='scss'>

</style>
