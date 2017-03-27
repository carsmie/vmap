<template>
  <div id="search"
       class="search-bar-overlay">
    <div class="field-group">
      <div class="inner-addon left-addon right-addon">
        <input caret
               type="text"
               v-on:change="searchBarValueChanged()"
               v-model="searchBarModel"
               name="searchBarName"
               id="searchBarId"
               :placeholder="search_text" />
        <i class="left-side glyphicon glyphicon-menu-hamburger has-tooltip"
           @click="openNav()">
                              <span class="tooltip tooltip-absolute tooltip-info" translate="menu"></span>
                          </i>
        <i v-show="searchResults != undefined"
           @click="cleanResults(); resetSearchPanel()">
                              <div class="cleanResults">
                                  <span class="glyphicon glyphicon-menu-right"></span>
                                  <span class="glyphicon glyphicon-menu-left"></span>
                              </div>
                          </i>
        <i class="absolute-right-side glyphicon glyphicon-search has-tooltip">
                              <span class="tooltip tooltip-absolute tooltip-info" translate="search"></span>
                          </i>
      </div>
    </div>
  
    <div ng-switch="searchPanelLayout">
      <div v-if="searchPanelLayout = searchResultsPanel"
           search-results-panel></div>
      <div v-else-if="searchPanelLayout = searchOptionsPanel"
           search-options-panel></div>
      <div v-else-if="searchPanelLayout = searchSeEiendomPanel"
           search-se-eiendom-panel
           ng-init="showSelection()"></div>
      <div v-else-if="searchPanelLayout = searchKoordTransPanel"
           search-koord-trans-panel></div>
      <div v-else-if="searchPanelLayout = searchLagTurkartPanel"
           search-lag-turkart-panel></div>
      <div v-else-if="searchPanelLayout = searchLagFargeleggingskartPanel"
           search-lag-fargeleggingskart-panel></div>
      <div v-else-if="searchPanelLayout = searchLagNodplakatPanel"
           search-lag-nodplakat-panel></div>
    </div>
  
  </div>
</template>
<script>
import { map } from '../services/mapHelper'

export default {
  name: 'search',
  props: ['map'],
  data () {
    return {
      searchBarModel: '',
      searchPanelLayout: '',
      searchResults: undefined,
      activeSearchResult: undefined,
      coordinate: undefined,
      placenamePage: undefined,
      unifiedResults: {},
      serviceDict: undefined,
      search_text: 'search'
    }
  },
  methods: {
    resetResults: () => {
      this.unifiedResults = {}
      this.searchResults = {}
    },
    populateServiceDict: (query) => {
      // this.serviceDict = searchPanelFactory.getServiceDict(query)
    },
    emoveInfomarkers: () => {
      map.RemoveInfoMarkers()
      map.RemoveInfoMarker()
    },
    init: (query) => {
      this.resetResults()
      this.searchResults = undefined
      this.activeSearchResult = undefined
      this.populateServiceDict(query)
      this.coordinate = false
      map.RemoveInfoMarker()
      // this.placenamePage = searchPanelFactory.resetPlacenamePage() + 1
    },
    cleanResults: () => {
      this.init()
      this.removeInfomarkers()
      this.searchBarModel = ''
      this.deactivatePrintBoxSelect()
    },
    resetSearchPanel: () => {
      this.showSearchOptionsPanel()
      this.searchPanelLayout = ''
      // searchPanelFactory.setShowEiendomMarkering(false)
    },
    deactivatePrintBoxSelect: () => {
      // const printBoxSelectTool = toolsFactory.getToolById("PrintBoxSelect")
      // toolsFactory.deactivateTool(printBoxSelectTool)
    },
    showSearchOptionsPanel: (previous) => {
      this.deactivatePrintBoxSelect()
      this.deactivateAddLayerUrl()
      this.searchPanelLayout = 'searchOptionsPanel'
      if (!previous) {
        // mainAppFactory.setActiveSearchPanel('searchOptionsPanel')
      }
    },
    deactivateAddLayerUrl: () => {
      // const addLayerUrlTool = toolsFactory.getToolById("AddLayerUrl")
      // addLayerUrlTool.additionalOptions.show = false
      // toolsFactory.activateTool(addLayerUrlTool)
      // toolsFactory.deactivateTool(addLayerUrlTool)
    },
    searchBarValueChanged: () => {
      if (this.searchBarModel === '') {
        this.cleanResults()
        return
      }
      const query = this.getQuery()
      this.setSearchInUrl(query)

      if (this.checkQueryForCoordinates(query)) {
        this.initSearchOptions()
        return
      }
      this.init(query)
      this.showSearchResultPanel()
      // this.getResults(searchPanelFactory.getInitialSearchServices())
    }
  }
}

</script>
<style lang='scss'>
@import "./../assets/styles/_main.scss";
@import "./../assets/styles/_sidenav.scss";

</style>
