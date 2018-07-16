<template>
<div>
<br>
  <b-tabs>
  <b-tab title="Collections">
    
    <br>
    <b-list-group v-for="collection in collections" :key="collection.id">
  <b-list-group-item >{{collection.name}} <br> {{collection._id}}
  <br>
  
  </b-list-group-item>
  
  
</b-list-group>
  </b-tab>
  <b-tab title="Bookmarks" >
    <br><bookmark-list v-if="collections.length > 0" :collections="collections"></bookmark-list>
  </b-tab>
</b-tabs>
  
</div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import usercookie from '../util/usercookie.js'
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
      axios.get('/api/v1/collections/' + usercookie.getUsername())
        .then(function(response) {
          self.collections = response.data
        })

        .catch(function(error) {
          self.errMsg = error.response;
          console.log(error)
        });
    },
    showBookmarks() {
      const self = this
  self.bookmarksForCollection = []
      axios.get('/api/v1/collections/' + usercookie.getUsername() + '/' + '5b30ec0465e12d00013d008b')
        .then(function(response) {
          self.bookmarksForCollection = response.data
          console.log(self.bookmarksForCollection)
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

</style>
