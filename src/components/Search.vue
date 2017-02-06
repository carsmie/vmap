<template>
  <div id="search" class="search-bar-overlay">
    <input v-model="message">
    <p>{{ message }}</p>
  </div>
</template>
<script>
  import {searchServices} from '../services/searchService'

  export default {
    name: 'search',
    data () {
      return {
        message: 'Test!'
      }
    },
    mounted () {
      console.log(searchServices)
    }
  }

</script>
<style>
  #search {
    text-align: left;
    color: #2c3e50;
  }

</style>
