<template>
<div class="bookmarks">
  
</div>

</template>

<script>
/* eslint-disable */

import axios from 'axios'
export default {
  name: 'results',
  data() {
    return {
      // loading: false,
      results: [],
      totalFoundDocs: 0,
      numDocsPerPage: 10
      // currentPage: 1
    }
  },
  computed: {
    currentPage: function() {
      if (this.$route.query.p > 1) {
        return this.$route.query.p
      }
      return 1
    }
  },
  created() {
    axios.defaults.timeout = 10000;
    this.search()
  },
  watch: {
    '$route.query': 'search'
  },
  methods: {
    search() {
      const self = this
      self.results = []
      axios.get('/api/search?q='.concat(encodeURIComponent(this.$route.query.q)).concat("&from=").concat(this.currentPage * this.numDocsPerPage - this.numDocsPerPage).concat("&size=").concat(this.numDocsPerPage))
        .then(function(response) {
          self.results = response.data.hits.hits;
          self.totalFoundDocs = response.data.hits.total;
        })
        .catch(function(error) {
          self.errMsg = error.response;
          console.log(error)
        });
    },
    paginationInput(num) {
      this.$router.push({
        name: 'results',
        query: {
          q: this.$route.query.q,
          p: num
        }
      })
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
