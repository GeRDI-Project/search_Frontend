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
  <search-mask :query-value="queryString" />
  <b-container>
    <b-row>
      <b-col v-if="anyResults">
        <h6 class="results-annotation"><b>{{ numResults }}</b> results found for <b> {{ queryString }} </b></h6>
      </b-col>
      <b-col v-else-if="isSearching">
        <div class="text-center">
          <b-spinner class="m-4" variant="primary" label="Spinning" />
        </div>
      </b-col>
      <b-col v-else>
        <b-alert class="nothing-found-alert" show>
          No results
        </b-alert>
      </b-col>
    </b-row>
    <b-row v-if="anyResults || anyFacetFilteringApplied">
      <b-col cols="3">
        <search-facets/>
      </b-col>
      <b-col v-if="anyResults" cols="9">
        <search-result-entry id="result-list" v-for="result in results" :result="result" :key="result._id" />
      </b-col>
    </b-row>
    <b-row v-if="anyResults">
      <b-col>
        <b-pagination align="center" size="md" :total-rows="numResults" v-model="currentPage" :per-page="numDocsPerPage" @change="applyPagination"/>
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
      loadedBookmarks: false
    }
  },
  computed: {
    queryString() {
      return decodeURIComponent(this.$route.query.q)
    },
    isSearching() {
      return this.$store.getters.isSearching
    },
    anyFacetFilteringApplied() {
      return this.$store.getters.haveAnyConstraintsBeenApplied
    },
    anyResults() {
      return (this.$store.getters.getResultsAmount > 0)
    },
    isChecked() {
      return this.$gerdi.aai.isChecked()
    },
    currentPage() {
      if (isNaN(parseInt(this.$route.query.p))) {
        return 1
      }
      return parseInt(this.$route.query.p)
    },
    results() {
      return this.$store.getters.getResults
    },
    numResults() {
      return this.$store.getters.getResultsAmount
    },
    numDocsPerPage() {
      return this.$store.getters.getNumDocsPerPage
    },
    anyConstraintsSelected() {
      return this.$store.getters.areAnyConstraintsSelected
    },
    onlyFacetsWithSelectedConstraints() {
      return this.$store.getters.getOnlyFacetsWithSelectedConstraints
    }
  },
  created() {
    this.search()
  },
  watch: {
    '$route.query': 'search',
    isChecked() {
      if (this.loadedBookmarks === true || this.$gerdi.aai.getUser() === null) return
      var self = this
      this.$store.dispatch('refreshCollections', { vm: this }).then(function () { self.loadedBookmarks = true })
    }
  },
  methods: {
    search() {
      this.$store.dispatch('search', {
        queryString: this.queryString,
        currentPage: this.currentPage,
        selectedConstraints: this.$route.query.s ? JSON.parse(decodeURIComponent(this.$route.query.s)) : {}
      })
    },
    applyPagination(val) {
      var newQuery = {
        q: this.$route.query.q,
        p: val
      }
      if (this.anyConstraintsSelected) {
        newQuery.s = encodeURIComponent(JSON.stringify(this.onlyFacetsWithSelectedConstraints))
      }
      this.$router.push({
        name: 'results',
        query: newQuery
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
