<template>
<div>
  <br>
  <h3>Collections for Nastja</h3>
  <br>
  <b-list-group v-for="collection in collections" :collection="collection" :key="collection._id">
    <b-list-group-item href="#" class="flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{collection.name}}</h5>
        <small>{{collection._id}}</small>
      </div>
      <br>
      <p class="mb-1">
        <b-button-group size="sm">
          <b-button variant="link">Remove collection</b-button>
          <b-button variant="link">Edit collection</b-button>
        </b-button-group>
      </p>
    </b-list-group-item>
  </b-list-group>
  <br><br>
  <hr>
  <bookmark-list-entry v-if="collections.length > 0" :collections="collections"></bookmark-list-entry>
</div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
export default {
  name: 'collections',
  props: ['results'],
  data() {
    return {
      collections: []
    }
  },

  created() {
    axios.defaults.timeout = 10000;
    this.getCollections()
    this.deleteCollections()
   
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
