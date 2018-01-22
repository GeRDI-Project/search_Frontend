<template>
<div class="results">
  <br>
  <search-mask :query-value="$route.query.q"></search-mask>

  <b-container>
    <b-row>
      <!-- <b-col cols="3"><search-facetes/></b-col> -->
      <b-col cols="12">
        <search-result-entry v-for="result in results" :result="result" :key="result._id"></search-result-entry>
        <br>
      </b-col>
    </b-row>
  </b-container>
  <b-pagination align="center" size="md" :total-rows="100" v-model="currentPage" :per-page="10" />
</div>
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
      // currentPage: 1
    }
  },
  computed: {
    totalPages: function() {
      return Math.ceil(this.totalFoundDocs / 10)
    },
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
      axios.get('/api/search?q='.concat(encodeURIComponent(this.$route.query.q)).concat("&from=").concat(this.currentPage * 10 - 10))
        .then(function(response) {
          self.results = response.data.hits.hits;
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
</style>
