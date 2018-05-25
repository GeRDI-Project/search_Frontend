<template>
<div class="bookmarks">
  <b-container>
    <b-row>
      
      <b-col cols="12">
       
        <bookmark-list-entry v-for="bookmark in bookmarks" :result="bookmark" :key="bookmark._id"></bookmark-list-entry>
        
      </b-col>
    </b-row>
  </b-container>
</div>

</template>

<script>
/* eslint-disable */

import axios from 'axios'
export default {
  name: 'bookmarks',
  data() {
    return {
      // loading: false,
      bookmarks: [],

    }
  },

  created() {
    axios.defaults.timeout = 10000;
    this.getBookmarks()
  },
  
  methods: {
    getBookmarks() {
      const self = this
      self.bookmarks = []
      axios.get('/api/v1/collections/tobias')
        .then(function(response) {
          self.bookmarks = response;
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
