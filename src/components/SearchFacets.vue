/**
 * Copyright 2018 Nelson Tavares de Sousa, Anastasia Kazakova, Ingo Thomsen
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
<div role="tablist">
  <facet-card v-for="facet in availableFacets" :facet="facet" :key="facet._id"/>
  <div class="all-facets-buttons" >
    <b-button block class="facets-button" variant="primary" @click="applyConstraints">
      Apply
    </b-button>
    <b-button block class="facets-button" variant="secondary" @click="clearAllFacets" :disabled="!anyConstraintsSelected">
      Clear All
    </b-button>
  </div>
</div>
</template>

<script>
/* eslint-disable */
export default {

  name: 'search-facets',
  computed: {
    availableFacets() {
      return this.$store.getters.getAvailableFacets
    },
    anyConstraintsSelected() {
      return this.$store.getters.areAnyConstraintsSelected
    },    
    onlySelectedConstraints() {
      return this.$store.getters.getOnlySelectedConstraints
    }
  },
  methods: {
    clearAllFacets() {
      this.availableFacets.forEach(facet => {        
        this.$store.commit('setConstraintsForAFacet', {
          facet: facet,
          arr: []
        })
      })
    },
    applyConstraints() {
      var newQuery = {
        q: this.$route.query.q
      }
      if (this.anyConstraintsSelected) {
        newQuery.s = encodeURIComponent(JSON.stringify(this.onlySelectedConstraints))
      } 
      if (this.$route.query.p) {
        newQuery.p = this.$route.query.p
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

.all-facets-buttons {
  display:flex;
  justify-content:space-around;
}

.facets-button {
  margin: 6px;
}

</style>
