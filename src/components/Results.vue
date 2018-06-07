<template>
<div class="results">
  <search-mask :query-value="$route.query.q"></search-mask>
  <br>
  <h6 v-if="totalFoundDocs > 0" class="results-annotation"><b>{{ totalFoundDocs }}</b> results found for <b> {{$route.query.q}} </b></h6>
  <b-alert class="nothing-found-alert" :show="totalFoundDocs == 0">Nothing to see here</b-alert>
  <!-- <br>
  <h6 v-if="totalFoundDocs > 0" class="results-annotation">Showing <b>{{num in numDocsPerPage}} </b>of <b> {{ totalFoundDocs }} </b> results for <b> {{$route.query.q}} </b></h6> -->
  <br>
  <b-container>
    <b-row>
      <b-col cols="3"><search-facetes v-if="results.length > 0" :results="this.results"></search-facetes>
      </b-col>
      <b-col cols="9">
        <search-result-entry v-for="result in results" :result="result" :key="result._id"></search-result-entry>

      </b-col>
    </b-row>
  </b-container>
  <b-pagination align="center" size="md" :total-rows="totalFoundDocs" v-model="currentPage" :per-page="numDocsPerPage" @input="paginationInput" />
</div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import SearchResultEntry from './SearchResultEntry.vue'
import SearchFacetes from './SearchFacetes.vue'
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
