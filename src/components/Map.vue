<template>
  <div id="vmap" class="fullSizeMap">
  </div>
</template>
<script>
  import * as ISY from 'maplib'

  export default {
    name: 'vmap',
    data: function () {
      return {
        config: {
          'name': 'default config',
          'useCategories': true,
          'showProgressBar': true,
          'showMousePosition': true,
          'comment': '',
          'numZoomLevels': 18,
          'newMaxRes': 21664,
          'extent': [-2000000, 3500000, 3545984, 9045984],
          'extentUnits': 'm',
          'proxyHost': '',
          'searchHost': '',
          'tokenHost': '',
          'searchpointzoom': 12,
          'groups': [],
          'languages': {
            'no': {},
            'en': {}
          },
          'layers': [{
            'id': '1992',
            'isBaseLayer': true,
            'subLayers': [{
              'title': 'norges_grunnkart',
              'source': 'WMS',
              'url': ['http://opencache.statkart.no/gatekeeper/gk/gk.open?LAYERS=norges_grunnkart'],
              'gatekeeper': true,
              'name': 'norges_grunnkart',
              'format': 'image/png',
              'coordinate_system': 'EPSG:25833',
              'id': '1992',
              'tiled': true
            }],
            'visibleOnLoad': false
          }],
          'zoom': 3,
          'center': [570130, 7032300],
          'hoverOptions': {
            'multiSelect': true,
            'mmultiSelect': false
          },
          'coordinate_system': 'EPSG:25833',
          'onlyOneGroup': false,
          'isOffline': false
        }
      }
    },
    mounted () {
      var eventHandler = new ISY.Events.EventHandler()
      var mapImplementation = new ISY.MapImplementation.OL3.Map(null, eventHandler)
      var layerHandler = new ISY.MapAPI.Layers(mapImplementation)
      var groupHandler = new ISY.MapAPI.Groups()
      var categoryHandler = new ISY.MapAPI.Categories()

      var map = new ISY.MapAPI.Map(
        mapImplementation,
        eventHandler,
        null,
        layerHandler,
        groupHandler,
        categoryHandler
      )
      map.Init('vmap', this.config)

      this.$http.get('http://norgeskart.no/config/geonorge.json').then(response => {
        this.config = response.body
        console.log(this.config)
        map.Init('vmap', this.config)
      }, response => {
        // error callback
      })
    }
  }

</script>
<style lang="scss">


</style>
