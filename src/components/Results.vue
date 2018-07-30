/**
 * Copyright 2018 Nelson Tavares de Sousa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
<template>

<div class="results">
  
  <search-mask :query-value="$route.query.q"></search-mask>
  <h6 v-if="numResults > 0" class="results-annotation"><b>{{ numResults }}</b> results found for <b> {{$route.query.q}} </b></h6>
  <b-alert class="nothing-found-alert" :show="numResults == 0">Nothing to see here</b-alert>
  
  <b-container>
    <b-row>
      <b-col cols="3"><search-facetes v-if="numResults > 0"></search-facetes>
      </b-col>
      <b-col cols="9">
        <search-result-entry v-for="result in results" :result="result" :key="result._id"></search-result-entry>

      </b-col>
    </b-row>
  </b-container>
  <b-pagination align="center" size="md" :total-rows="numResults" v-model="currentPage" :per-page="numDocsPerPage" @change="paginationInput"/>
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
      numDocsPerPage: 10
    }
  },
  computed: {
    currentPage: {
      get: function() {
        if (isNaN(parseInt(this.$route.query.p))) {
          return 1
        }
        return parseInt(this.$route.query.p)
      },
      set: function(val) {}
    },
    results: function() {
      return this.$store.getters.getResults
    },
    numResults: function() {
      return this.$store.getters.getResultsAmount
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
      let q = this.$route.query.q
      let page = this.currentPage
      this.$store.dispatch('search', {
        query: q,
        currentPage: page
      })
    },
    paginationInput(val) {
      this.$router.push({
        name: 'results',
        query: {
          q: this.$route.query.q,
          p: val
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
