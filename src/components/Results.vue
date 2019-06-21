/**
 * Copyright 2018 Nelson Tavares de Sousa, Ingo Thomsen
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
  <b-container>
    <b-row>
      <b-col v-if="anyResults">
        <h6 class="results-annotation"><b>{{ numResults }}</b> results found for <b> {{$route.query.q}} </b></h6>
      </b-col>
      <b-col v-else>
        <b-alert v-if="isSearching" class="nothing-found-alert" show>Searching...</b-alert>
        <b-alert v-else             class="now-searching-alert" show>No results</b-alert>
      </b-col>
    </b-row>
    <b-row v-if="anyResults || anyFacetFilteringApplied">
      <b-col cols="3">
        <search-facets/>
      </b-col>
      <b-col v-if="anyResults" cols="9">
        <search-result-entry id="result-list" v-for="result in results" :result="result" :key="result._id"></search-result-entry>
      </b-col>
    </b-row>
    <b-row v-if="anyResults">
      <b-col>
        <b-pagination align="center" size="md" :total-rows="numResults" v-model="currentPage" :per-page="numDocsPerPage" @change="paginationInput"/>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'results',
  data() {
    return {
      numDocsPerPage: 10,
      loadedBookmarks: false
    }
  },
  computed: {
    isSearching: function() {
      return this.$store.getters.isSearching
    },
    anyFacetFilteringApplied: function() {
      return this.$store.getters.areAnyFacetFilteringApplied
    },
    anyResults: function() {
      return (this.$store.getters.getResultsAmount > 0)
    },
    isChecked: function () {
      return this.$gerdi.aai.isChecked()
    },
    currentPage() {
      if (isNaN(parseInt(this.$route.query.p))) {
        return 1
      }
      return parseInt(this.$route.query.p)
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
    '$route.query': 'search',
    isChecked: function () {
      if (this.loadedBookmarks === true || this.$gerdi.aai.getUser() === null) return
      var self = this
      this.$store.dispatch('refreshCollections', { vm: this }).then(function () { self.loadedBookmarks = true })
    }
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
.nothing-found-alert, .now-searching-alert {
  margin-top: 1rem;
}
.pagination {
  margin-top: 1rem;
}
.results-annotation {
  margin-top: 1rem;
}

</style>
