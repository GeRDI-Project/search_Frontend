<template>
<div>

  <br>
  <h3>Collections for Robin</h3>
  <br>
<b-card class="mb-3" no-body v-for="collection in collections" :collection="collection" :key="collection._id">
        <h4 slot="header"> {{collection.name}} <br> <h6>{{collection._id}}</h6> </h4>
    
        <b-card-body>
<b-list-group v-for= "bookmark in bookmarks" :bookmark="bookmark">
  <b-list-group-item>{{bookmark._source.publisher}}</b-list-group-item>
  
</b-list-group>
        </b-card-body>
        <b-card-footer><a href="#" class="card-link">Remove collection</a>
            <a href="#" class="card-link">Edit collection</a>
        </b-card-footer>
</b-card>
</div>

</template>

<script>
/* eslint-disable */

import axios from 'axios'
export default {
  name: 'bookmarks',
  props: ['results'],
  data() {
    return {
      collections: [],
      bookmarks: []

    }
  },

  created() {
    axios.defaults.timeout = 10000;
    this.getCollections(),
    this.getBookmarks()
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
    },
    getBookmarks() {
      const self = this
      self.bookmarks = [ ]
      console.log(self.bookmarks)
      axios.get('/api/v1/collections/nastja/5b1ff4423756c90001c5b022')
        .then(function(response) {
          self.bookmarks = response.data
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
