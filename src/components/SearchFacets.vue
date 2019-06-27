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
  <!-- Facet Publisher -->
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
    <b-collapse id="accordion1" visible accordion="accordion1" role="tabpanel">
      <b-card-body>
        <div>
          <b-button variant="link" :disabled="selectedPublishers.length == Object.keys(countsOfAllPublishers).length" @click="gi.selectedPublishers = Object.keys(countsOfAllPublishers)">
            Select all
          </b-button>
          <b-button class="clear-all" variant="link" :disabled="selectedPublishers.length == 0" @click="facetsModel.selectedPublishers = []">
            Clear all
          </b-button>
        </div>
        <p class="card-text">
          <b-form-group>
            <b-form-checkbox-group stacked v-model="facetsModel.selectedPublishers" name="publishersFacets"
              :options="facetOptionsPublisher.slice(0,5)">
            </b-form-checkbox-group>
            <b-form-checkbox-group stacked v-model="facetsModel.selectedPublishers" name="publishersFacets"
              :options="displayValues(facetOptionsPublisher, valuesToShowPublisher)">
            </b-form-checkbox-group>
          </b-form-group>
          <b-button variant="link" :disabled="facetOptionsPublisher.length <= valuesToShowPublisher"
            @click="valuesToShowPublisher += 5">
            More
          </b-button>
          <b-button class="float-right" variant="link" :disabled="valuesToShowPublisher == 5" @click="valuesToShowPublisher -= 5">
            Less
          </b-button>
        </p>
      </b-card-body>
    </b-collapse>
  </b-card>
  <!-- Facet Author -->
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
    <b-collapse id="accordion2" visible accordion="accordion2" role="tabpanel">
      <b-card-body>
        <div>
          <b-button variant="link" :disabled="selectedAuthors.length == Object.keys(countsOfAllAuthors).length" @click="facetsModel.selectedAuthors = Object.keys(countsOfAllAuthors)">
            Select all
          </b-button>
            <b-button class="clear-all" variant="link" :disabled="selectedAuthors.length == 0"  @click="facetsModel.selectedAuthors = []">
            Clear all
          </b-button>
        </div>
        <p class="card-text">
          <b-form-group>
            <b-form-checkbox-group stacked v-model="facetsModel.selectedAuthors" name="authorFacets"
              :options="facetOptionsAuthor.slice(0,5)"></b-form-checkbox-group>
              <b-form-checkbox-group stacked v-model="facetsModel.selectedAuthors" name="authorsFacets"
                :options="displayValues(facetOptionsAuthor, valuesToShowAuthor)"></b-form-checkbox-group>
          </b-form-group>
           <b-button variant="link" :disabled="facetOptionsAuthor.length <= valuesToShowAuthor"
            @click="valuesToShowAuthor += 5">
            More
          </b-button>
          <b-button class="float-right" variant="link" :disabled="valuesToShowAuthor == 5" @click="valuesToShowAuthor -= 5">
            Less
          </b-button>
        </p>
      </b-card-body>
    </b-collapse>
  </b-card>
  <!-- Facet Year -->
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
    <b-collapse id="accordion3" visible accordion="accordion3" role="tabpanel">
      <b-card-body>
        <div>
          <b-button variant="link" :disabled="selectedYears.length == Object.keys(countsOfAllYears).length" @click="facetsModel.selectedYears = Object.keys(countsOfAllYears)">
            Select all
          </b-button>
            <b-button class="clear-all" variant="link" :disabled="selectedYears.length == 0"  @click="facetsModel.selectedYears = []">
            Clear all
          </b-button>
        </div>
        <p class="card-text">
          <b-form-group>
            <b-form-checkbox-group stacked v-model="facetsModel.selectedYears" name="pubYearFacets"
              :options="facetOptionsYear.slice(0,5)"></b-form-checkbox-group>
              <b-form-checkbox-group stacked v-model="facetsModel.selectedYears" name="yearsFacets"
                :options="displayValues(facetOptionsYear, valuesToShowYear)"></b-form-checkbox-group>
          </b-form-group>
          <b-button variant="link" :disabled="facetOptionsYear.length <= valuesToShowYear"
            @click="valuesToShowYear += 5">
            More
          </b-button>
          <b-button class="float-right" variant="link" :disabled="valuesToShowYear == 5" @click="valuesToShowYear -= 5">
            Less
          </b-button>
        </p>
      </b-card-body>
    </b-collapse>
  </b-card>
  <!-- Facet Languages -->
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
    <b-collapse id="accordion4" visible accordion="accordion4" role="tabpanel">
      <b-card-body>
        <div>
          <b-button variant="link" :disabled="selectedLanguages.length == Object.keys(countsOfAllLanguages).length" @click="facetsModel.selectedLanguages = Object.keys(countsOfAllLanguages)">
            Select all
          </b-button>
            <b-button class="clear-all" variant="link" :disabled="selectedLanguages.length == 0"  @click="facetsModel.selectedLanguages = []">
            Clear all
          </b-button>
        </div>
        <p class="card-text">
          <b-form-group>
            <b-form-checkbox-group stacked v-model="facetsModel.selectedLanguages" name="LanguageFacets"
              :options="facetOptionsLanguage.slice(0,5)"></b-form-checkbox-group>
              <b-form-checkbox-group stacked v-model="facetsModel.selectedLanguages" name="languagesFacets"
                :options="displayValues(facetOptionsLanguage, valuesToShowLanguage)"></b-form-checkbox-group>
          </b-form-group>
           <b-button variant="link" :disabled="facetOptionsLanguage.length <= valuesToShowLanguage"
            @click="valuesToShowLanguage += 5">
            More
          </b-button>
          <b-button class="float-right" variant="link" :disabled="valuesToShowLanguage == 5" @click="valuesToShowLanguage -= 5">
            Less
          </b-button>
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
  
  name: 'search-facets',
  data() {
    return {
      facetOptionsPublisher: [],
      facetOptionsAuthor: [],
      facetOptionsYear: [],
      facetOptionsLanguage: [],
      valuesToShowPublisher: 5,
      valuesToShowAuthor: 5,
      valuesToShowYear: 5,
      valuesToShowLanguage: 5
    }
  },

  created: function() {
    this.createAllFacetOptions()
  },

    aggs: function() {
      return this.$store.getters.getAggregations
    },

  computed: {

    facetsModel: {
      get: function () {
        return this.$store.getters.getFacetsModel
      },
      set: function (val) {
        this.$store.commit('updateFacetsModel', val)
      }
    },

    selectedPublishers: function() { return this.facetsModel.selectedPublishers },
    selectedAuthors: function() { return this.facetsModel.selectedAuthors },
    selectedYears: function() { return this.facetsModel.selectedYears },
    selectedLanguages: function() { return this.facetsModel.selectedLanguages },

    countsOfAllPublishers: function() { return this.facetsModel.countsOfAllPublishers },
    countsOfAllAuthors: function() { return this.facetsModel.countsOfAllAuthors },
    countsOfAllYears: function() { return this.facetsModel.countsOfAllYears },
    countsOfAllLanguages: function() { return this.facetsModel.countsOfAllLanguages }
  },

  methods: {
    clearAllFacets() {
      this.facetsModel.selectedPublishers = []
      this.facetsModel.selectedAuthors = []
      this.facetsModel.selectedYears = []
      this.facetsModel.selectedLanguages = []
    },

    createAllFacetOptions() {
      this.facetOptionsPublisher = this.createSortedOptionsForAFacet(this.countsOfAllPublishers, this.facetsModel.selectedPublishers)
      this.facetOptionsAuthor = this.createSortedOptionsForAFacet(this.countsOfAllAuthors, this.facetsModel.selectedAuthors)
      this.facetOptionsYear = this.createSortedOptionsForAFacet(this.countsOfAllYears, this.facetsModel.selectedYears)
      this.facetOptionsLanguage = this.createSortedOptionsForAFacet(this.countsOfAllLanguages, this.facetsModel.selectedLanguages)
    },

    createSortedOptionsForAFacet(allCounts, selectedEntries) {

      var allSelected = []
      var allUnselected = []
      var allDisabled = []

      Object.entries(allCounts).forEach( element => {
        let value = element[0]        
        let count = element[1]        
        let option = {
          text: value + " - (" + count + ")",
          value: value,
        }                
        if (count == 0) {
          option.disabled = true
          allDisabled.push(option)
        } else {
          (selectedEntries.includes(value) ? allSelected : allUnselected).push(option)
        }
      })
      return Array.concat(allSelected, allUnselected, allDisabled)
    },

    displayValues(arr, stepsValues) {
      if (arr.length != 0) {
        return arr.slice(5, stepsValues);
      } else {
        return arr;
      }
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

.clear-all {
  float: right ;
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
