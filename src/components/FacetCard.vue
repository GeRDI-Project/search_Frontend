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
  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-btn block href="#" v-b-toggle="facet" variant="accordion-gerdi"> {{ $store.getters.getFacetTitle(facet) }}
        <span class="when-opened">
          <font-awesome-icon icon="chevron-up" />
        </span>
        <span class="when-closed">
          <font-awesome-icon icon="chevron-down" />
        </span>
      </b-btn>
    </b-card-header>
    <b-collapse :id="facet" visible role="tabpanel">
      <b-card-body>
          <b-button variant="link" :disabled="selectedConstraints.length == nonDisabledConstraints.length" @click="selectedConstraints = nonDisabledConstraints">
            Select all
          </b-button>
          <b-button class="clear-all" variant="link" :disabled="selectedConstraints.length == 0" @click="selectedConstraints = []">
            Clear all
          </b-button>
          <p class="card-text">
            <b-form-group>
              <b-form-checkbox-group stacked v-model="selectedConstraints" :name="facet" :options="clippedConstraintOptions" />
            </b-form-group>
          </p>
          <b-button variant="link" :disabled="constraintOptions.length <= numberOfConstraintsToShow" @click="numberOfConstraintsToShow += constraintsClippingStepSize">
            More
          </b-button>
          <b-button class="float-right" variant="link" :disabled="numberOfConstraintsToShow <= constraintsClippingStepSize" @click="numberOfConstraintsToShow -= constraintsClippingStepSize">
            Less
          </b-button>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
/* eslint-disable */
export default {
  name: 'facet-card',
  props: ['facet'],

  data() {
    return {
      constraintOptions: [],
      nonDisabledConstraints: [],
      numberOfConstraintsToShow: 5,
      constraintsClippingStepSize: 5
    }
  },

  mounted() {
    this.updateConstraintOptions()
  },

  watch: {
    constraintCounts: 'updateConstraintOptions'
  },

  computed: {
    clippedConstraintOptions() {
      return this.constraintOptions.slice(0, Math.min(this.numberOfConstraintsToShow, this.constraintOptions.length))
    },
    constraintCounts() {
      return this.$store.getters.getConstraintCounts(this.facet)
    },
    selectedConstraints: {
      get() {     
        return this.$store.getters.getSelectedConstraints(this.facet)
      },
      set(arr) {       
        this.$store.commit('setConstraintsForAFacet', {
          facet: this.facet,
          arr: arr
        })
      }
    }
  },

  methods: {
    updateConstraintOptions() {
      var allEnabledOptions = []
      var allDisabledOptions = []
      Object.entries(this.constraintCounts).forEach( constraintCount => {
        let value = constraintCount[0]
        let count = constraintCount[1]
        let option = {
          text: value + " - (" + count + ")",
          value: value,
        }
        if (count == 0) {
          option.disabled = true
          allDisabledOptions.push(option)
        } else {
          allEnabledOptions.push(option)
          this.nonDisabledConstraints.push(value)
        }
      })
      this.constraintOptions = [...allEnabledOptions, ...allDisabledOptions]
    }
  }
}
</script>

<style scoped>

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

</style>
