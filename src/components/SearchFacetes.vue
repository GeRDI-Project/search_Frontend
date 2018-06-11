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
<div role="tablist">
   <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-btn block href="#" v-b-toggle.accordion1 variant="info">Publisher</b-btn>
    </b-card-header>
    <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <p class="card-text">
          <b-form-group>
            <b-form-checkbox-group stacked v-model="facetsModel.selectedPublishers" name="publisherFacets" :options="limitArray(this.aggs.Publisher.buckets.map(it => it.key + ' (' + it.doc_count + ')' ))"></b-form-checkbox-group>
           <!-- <br>
              <span>Checked: {{ selectedPublishers }}</span>    -->
          </b-form-group>
        </p>
      </b-card-body>
    </b-collapse>
  </b-card>
  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-btn block href="#" v-b-toggle.accordion2 variant="info"> Author </b-btn>
    </b-card-header>
    <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <p class="card-text">
<b-form-group>
            <b-form-checkbox-group stacked v-model="facetsModel.selectedAuthors" name="authorFacets" :options="limitArray(this.aggs.Creator.buckets.map(it => it.key + ' (' + it.doc_count + ')' ))"></b-form-checkbox-group>
          </b-form-group>
        </p>
      </b-card-body>
    </b-collapse>
  </b-card>
  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-btn block href="#" v-b-toggle.accordion3 variant="info">Publication year</b-btn>
    </b-card-header>
    <b-collapse id="accordion3" visisble accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <p class="card-text">
          <b-form-group>
            <b-form-checkbox-group stacked v-model="facetsModel.selectedYears" name="pubYearFacets" :options="limitArray(this.aggs.PublicationYear.buckets.map(it => transformToYear(it.key) + ' (' + it.doc_count + ')' ))"></b-form-checkbox-group>
          </b-form-group>
        </p>
      </b-card-body>
    </b-collapse>
  </b-card>
  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-btn block href="#" v-b-toggle.accordion4 variant="info">Language</b-btn>
    </b-card-header>
    <b-collapse id="accordion4" accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <p class="card-text">
          <b-form-group>
            <b-form-checkbox-group stacked v-model="facetsModel.selectedLanguages" name="LanguageFacets" :options="limitArray(this.aggs.Language.buckets.map(it => it.key + ' (' + it.doc_count + ')' ))"></b-form-checkbox-group>
          </b-form-group>
        </p>
      </b-card-body>
    </b-collapse>
  </b-card>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'search-facetes',
  data() {
    return {
      facetsModel: {
        selectedPublishers: [],
        selectedYears: [],
        selectedAuthors: [],
        selectedLanguages: []}
    }
  },

  computed: {
    aggs: function() {
      return this.$store.getters.getAggregations
    }
  },

  methods: {
    transformToYear(num){
      return new Date(num).getYear() + 1900
    },
    limitArray(arr){
      if (arr.length >= 10) {
        arr.length = 10;
      }
      return arr
    }
  }
}

</script>

<style scoped>
.card {
  margin-top: 1rem;
}

.providerLogo {
  max-height: 100px;
  width: auto;
}
</style>
