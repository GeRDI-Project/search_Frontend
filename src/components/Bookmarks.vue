<template>
<div class="bookmarks">
  <b-container>
    Hallo!
    <b-row>
      
      <b-col cols="12">
       
        {{bookmarks}}
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
      self.bookmarks = ['blah']
      console.log(self.bookmarks)
      axios.get('https://www.test.gerdi.org/api/v1/collections/tobias')
        .then(function(response) {
          self.bookmarks = response.data
          console.log(response.data)
          console.log(response.status)
    console.log(response.statusText)
    console.log(response.headers)
    console.log(response.config)
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
