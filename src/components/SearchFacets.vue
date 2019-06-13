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
  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-btn block href="#" v-b-toggle.accordion1 variant="accordion-gerdi">Publisher
        <span class="when-opened">
          <font-awesome-icon icon="chevron-up" /></span>
        <span class="when-closed">
          <font-awesome-icon icon="chevron-down" />
        </span>
      </b-btn>
    </b-card-header>
    <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <p class="card-text">
          <b-form-group>
            <b-form-checkbox-group stacked v-model="facetsModel.selectedPublishers" name="publisherFacets" :options="facetOptions(facetsModel.countsOfAllPublishers)"></b-form-checkbox-group>
          </b-form-group>
        </p>
      </b-card-body>
    </b-collapse>
  </b-card>
  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-btn block href="#" v-b-toggle.accordion2 variant="accordion-gerdi">Author
        <span class="when-opened">
          <font-awesome-icon icon="chevron-up" /></span>
        <span class="when-closed">
          <font-awesome-icon icon="chevron-down" />
        </span>
      </b-btn>
    </b-card-header>
    <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <p class="card-text">
          <b-form-group>
            <b-form-checkbox-group stacked v-model="facetsModel.selectedAuthors" name="authorFacets" :options="facetOptions(facetsModel.countsOfAllAuthors)"></b-form-checkbox-group>
          </b-form-group>
        </p>
      </b-card-body>
    </b-collapse>
  </b-card>
  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-btn block href="#" v-b-toggle.accordion3 variant="accordion-gerdi">Publication year
        <span class="when-opened">
          <font-awesome-icon icon="chevron-up" /></span>
        <span class="when-closed">
          <font-awesome-icon icon="chevron-down" />
        </span>
      </b-btn>
    </b-card-header>
    <b-collapse id="accordion3" visisble accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <p class="card-text">
          <b-form-group>
            <b-form-checkbox-group stacked v-model="facetsModel.selectedYears" name="pubYearFacets" :options="facetOptions(facetsModel.countsOfAllYears)"></b-form-checkbox-group>
          </b-form-group>
        </p>
      </b-card-body>
    </b-collapse>
  </b-card>
  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-btn block href="#" v-b-toggle.accordion4 variant="accordion-gerdi">Language
        <span class="when-opened">
          <font-awesome-icon icon="chevron-up" /></span>
        <span class="when-closed">
          <font-awesome-icon icon="chevron-down" />
        </span>
      </b-btn>
    </b-card-header>
    <b-collapse id="accordion4" accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <p class="card-text">
          <b-form-group>
            <b-form-checkbox-group stacked v-model="facetsModel.selectedLanguages" name="LanguageFacets" :options="facetOptions(facetsModel.countsOfAllLanguages)"></b-form-checkbox-group>
          </b-form-group>
        </p>
      </b-card-body>
    </b-collapse>
  </b-card>
  <div class="all-facets-buttons" >
    <b-button block class="facets-button" variant="primary"   @click="doFilter">Apply</b-button>
    <b-button block class="facets-button" variant="secondary" @click="clearAllFacets" :disabled="! $store.getters.areAnyFacetValueSelected">Clear All</b-button>
  </div>
</div>
</template>

<script>

/* eslint-disable */
export default {

  name: 'search-facetes',
  data() {
    return {}
  },

  computed: {

    aggs: function() {
      return this.$store.getters.getAggregations
    },

    facetsModel: {
      get: function() {
        return this.$store.getters.getFacetsModel
      },
      set: function(val) {
        this.$store.commit('updateFacetsModel', val)
      }
    }
  },

  methods: {

    clearAllFacets() {
      this.facetsModel.selectedPublishers = [];
      this.facetsModel.selectedAuthors = [];
      this.facetsModel.selectedYears= [];
      this.facetsModel.selectedLanguages= [];
    },

    facetOptions(allCounts) {
      return Object.entries(allCounts).map( x => ({
        text: x[0] + " - (" + x[1] + ")",
        value: x[0],
        disabled: x[1] == 0
      }))
    },

    doFilter() {
      this.$store.dispatch('filter', this.facetsModel)
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

.btn-accordion-gerdi:focus,
.btn-accordion-gerdi:active:focus,
.btn-accordion-gerdi.active:focus {
  outline: 0 none;
}

.btn-accordion-gerdi {
  border: 0 none;
  font-weight: 700;
  letter-spacing: 0.1px;
  outline: 0 none;
  background: transparent;
  color: #083f64;
  text-align: left;
}

.btn-accordion-gerdi:hover,
.btn-accordion-gerdi:focus,
.btn-accordion-gerdi:active,
.btn-accordion-gerdi.active,
.open>.dropdown-toggle.btn-accordion-gerdi {
  box-shadow: none;
}

.btn-accordion-gerdi:active,
.btn-accordion-gerdi.active {
  box-shadow: none;
}

.card {
  margin-top: 1rem;
}

.collapsed>.when-opened,
:not(.collapsed)>.when-closed {
  display: none;
}

/* should be done in this way, cause of firefox*/
.when-closed,
.when-opened {
  float: none;
  position: absolute;
  right: 16px;
}

label {
  margin-top: 6px;
}

i {
  margin-top: 6px;
}

</style>
