<template>
  <div id='baseLayerSwitcher'>
    <div class="sidenav-group">
      <ul>
        <li tabindex="0"
            v-on:click="showMainMenuSections()">
          <div class="sidenav-header-text row">
            <div class="col-xs-1">
              <span class="icon-toggle-on fa fa-map"></span>
            </div>
            <div class="col-xs-11">
              <span class="text-uppercase"><span translate="bakgrunnskart"></span></span>
              <span :id="getSelectedBaseLayerName()"></span>
              <div class="backbtn">
                <span class="glyphicon glyphicon-menu-left"></span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul>
        <li tabindex="0"
            class="sidenav-sections"
            v-for="baseLayer in baseLayers()" v-if="baseLayer.name" > 
          <div class="row" @click="setAsBaseLayer(baseLayer)">
            <div class="col-xs-1">
              <span :style="getBaseLayerStyle(baseLayer)"></span>
            </div>
            <div class="col-xs-11">
              <div :id="baseLayer.name">{{baseLayer.name}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { map } from '../services/mapHelper'

export default {
  name: 'baseLayerSwitcher',
  data () {
    const data = {
      baseLayers: map.GetBaseLayers
    }
    return data
  },
  methods: {
    getBaseLayerStyle: (baseLayer) => {
      if (baseLayer.isVisible) {
        return 'icon-radio-checked pointer-cursor'
      } else {
        return 'icon-radio-unchecked pointer-cursor'
      }
    },
    getSelectedBaseLayerName: () => {
      let firstVisBaseLayer = map.GetFirstVisibleBaseLayer()
      if (firstVisBaseLayer !== undefined) {
        return firstVisBaseLayer.name
      } else {
        return ''
      }
    },
    setAsBaseLayer: (baseLayer) => {
      console.log('setAsBaseLayer : ', baseLayer)
    },
    showMainMenuSections: () => {
      console.log('showMainMenuSections')
    }
  }
}

</script>
<style lang='scss'>
 @import "./../assets/styles/_main.scss";
 @import "./../assets/styles/_sidenav.scss";
 #baseLayerSwitcher{
   position:absolute;
 }
</style>
