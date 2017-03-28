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
import * as searchServices from '../services/searchService'

export default {
  name: 'search',
  props: ['map'],
  mounted () {
  },
  data () {
    return {
      searchBarModel: '',
      searchPanelLayout: '',
      activeSearchResult: undefined,
      coordinate: undefined,
      search_text: 'search',
      placenameHitsPerPage: 15,
      placenamePage: 0,
      mapEpsg: 'EPSG:25833',
      initialSearchServices: ['ssr', 'matrikkelveg', 'matrikkeladresse', 'matrikkelnummer'],
      availableUTMZones: ['25832', '25833', '25834', '25835', '25836', '32632', '32633', '32634', '32635', '32636'],
      sourceDict: {
        ssr: 'Stedsnavn',
        adresse: 'Adresse',
        matrikkelveg: 'Vegnavn',
        matrikkeladresse: 'Adresse',
        coordGeo: 'Geografisk koordinat',
        coordUtm: 'UTM-koordinat',
        mouseClick: 'Klikk i kartet',
        matrikkelnummer: 'Gårds og bruksnummer'
      },
      searchOptionsOrder: ['seEiendom', 'ssrFakta', 'koordTrans', 'lagTurkart', 'lagFargeleggingskart', 'lagNodplakat'],
      eiendomMarkering: false,
      searchResults: {},
      unifiedResults: {},
      serviceDict: {},
      queryDict: {},
      searchTimestamp: undefined
    }
  },
  methods: {
    resetResults () {
      this.unifiedResults = {}
      this.searchResults = {}
    },
    populateServiceDict (query) {
      this.serviceDict = searchServices.generateServiceDict(query)
    },
    removeInfomarkers () {
      map.RemoveInfoMarkers()
      map.RemoveInfoMarker()
    },
    init (query) {
      this.resetResults()
      this.searchResults = undefined
      this.activeSearchResult = undefined
      this.populateServiceDict(query)
      this.coordinate = false
      // map.RemoveInfoMarker()
      this.placenamePage = this.resetPlacenamePage() + 1
    },
    resetPlacenamePage () {
      this.placenamePage = 0
      return this.placenamePage
    },
    decreasePlacenamePage () {
      if (this.placenamePage > 0) {
        this.placenamePage--
      }
      return this.placenamePage
    },
    increasePlacenamePage () {
      return this.placenamePage++
    },
    openNav () {
      console.log('Open main menu, not implented yet')
    },
    cleanResults () {
      this.init()
      this.removeInfomarkers()
      this.searchBarModel = ''
      this.deactivatePrintBoxSelect()
    },
    resetSearchPanel () {
      this.showSearchOptionsPanel()
      this.searchPanelLayout = ''
      this.eiendomMarkering = false
    },
    deactivatePrintBoxSelect () {
      // const printBoxSelectTool = toolsFactory.getToolById("PrintBoxSelect")
      // toolsFactory.deactivateTool(printBoxSelectTool)
    },
    showSearchOptionsPanel (previous) {
      this.deactivatePrintBoxSelect()
      this.deactivateAddLayerUrl()
      this.searchPanelLayout = 'searchOptionsPanel'
      if (!previous) {
        // mainAppFactory.setActiveSearchPanel('searchOptionsPanel')
      }
    },
    deactivateAddLayerUrl () {
      // const addLayerUrlTool = toolsFactory.getToolById("AddLayerUrl")
      // addLayerUrlTool.additionalOptions.show = false
      // toolsFactory.activateTool(addLayerUrlTool)
      // toolsFactory.deactivateTool(addLayerUrlTool)
    },
    searchBarValueChanged () {
      if (this.searchBarModel === '') {
        this.cleanResults()
        return
      }
      const query = this.searchBarModel + ''
      this.setSearchInUrl(query)

      /*
      if (this.checkQueryForCoordinates(query)) {
        this.initSearchOptions()
        return
      }
      */
      this.init(query)
      this.showSearchResultPanel()
      this.getResults(this.initialSearchServices)
    },
    setSearchInUrl (query) {
      this.removeSearchFromUrl()
      // var oldUrl = $location.url()
      // $location.url(oldUrl + '&sok=' + query)
    },
    removeSearchFromUrl () {
      // var hash = _getValueFromUrl('sok')
      // var oldUrl = $location.url()
      // $location.url(oldUrl.replace('sok=' + hash, ''))
    },
    showSearchResultPanel () {
      deactivatePrintBoxSelect()
      this.searchPanelLayout = 'searchResultsPanel'
      // mainAppFactory.setActiveSearchPanel('searchResultsPanel');
    },
    downloadSearchBarFromUrl (serviceDict, timestamp) {
/*
      this.queryDict[serviceDict.source] = $.ajax({
        type: 'GET',
        url: serviceDict.url,
        async: true,
        success: function (document) {
          if (((document.length && document.length > 0) || (document.childNodes && document.childNodes[0].childNodes.length)) && this.searchTimestamp === timestamp) {
            this.successFullSearch(serviceDict, document)
          }
        },
        error: function (searchError) {
          console.error('Error downloading from ' + serviceDict.url, searchError)
        }
      })
*/
    },
    getResults (searchServices) {
      this.cancelOldRequests()
      this.searchTimestamp = parseInt((new Date()).getTime(), 10)
      for (var serviceIndex = 0; serviceIndex < searchServices.length; serviceIndex++) {
        this.downloadSearchBarFromUrl(this.serviceDict[searchServices[serviceIndex]], this.searchTimestamp)
      }
    },
    cancelOldRequests () {
      for (let service in this.queryDict) {
        this.queryDict[service].abort()
      }
    }
  }
}

</script>
<style lang='scss'>
@import "./../assets/styles/_main.scss";
@import "./../assets/styles/_sidenav.scss";
</style>
