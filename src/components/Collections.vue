<template>
<div>
<br>    
  <bookmark-list v-if="collections.length > 0" :collections="collections"></bookmark-list>
</div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
export default {
  name: 'collections',
  data() {
    return {
      collections: [],
      bookmarksForCollection: []
    }
  },

  created() {
 
    this.getCollections()   
  },
  
  methods: {
    
    getCollections() {
      const self = this
      self.collections = [ ]
    
      axios.get('/api/v1/collections/nastja')
        .then(function(response) {
          self.collections = response.data
        })
        
        .catch(function(error) {
          self.errMsg = error.response;
          console.log(error)
        });
    }
  }
}
</script>

<style scoped>
.mask {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.results {
  margin-top: 1rem;
}
.nothing-found-alert {
  margin-top: 1rem;
}
.pagination {
  margin-top: 1rem;
}
.results-annotation {
  margin-top: 1rem;
}
</style>
