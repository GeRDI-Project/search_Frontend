<template>
<div class="results">
  <search-mask :query-value="$route.query.q"></search-mask>
  <br>
  <h6 v-if="results.length > 0" class="results-annotation"><b>{{ results.length }}</b> results found for <b> {{$route.query.q}} </b></h6>
  <b-alert class="nothing-found-alert" :show="results.length == 0">Nothing to see here</b-alert>
  <!-- <br>
  <h6 v-if="totalFoundDocs > 0" class="results-annotation">Showing <b>{{num in numDocsPerPage}} </b>of <b> {{ totalFoundDocs }} </b> results for <b> {{$route.query.q}} </b></h6> -->
  <br>
  <b-container>
    <b-row>
      <b-col cols="3"><search-facetes v-if="results.length > 0"></search-facetes>
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

import SearchResultEntry from './SearchResultEntry.vue'
import SearchFacetes from './SearchFacetes.vue'
export default {
  name: 'results',
  data() {
    return {
      // loading: false,
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
    },
    results: function() {
      return this.$store.getters.getResults
    }
  },
  created() {
    this.search()
  },
  watch: {
    '$route.query': 'search'
  },
  methods: {
    search() {
      let q = this.$route.query.q == '*' ? 1 : this.$route.query.q
      let page = this.currentPage
      this.$store.dispatch('search', {
        query: q,
        currentPage: page
      })
    },
    paginationInput(num) {
      this.$router.push({
        name: 'results',
        query: {
          q: this.$route.query.q,
          p: num
        }
      })
    },
    isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
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
