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
            <b-form-checkbox-group stacked v-model="selectedPublishers" name="publisherFacets" :options="limitArray(this.aggs.Publisher.buckets.map(it => it.key + ' (' + it.doc_count + ')' ))"></b-form-checkbox-group>
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
            <b-form-checkbox-group stacked v-model="selectedAuthors" name="authorFacets" :options="limitArray(this.aggs.Creator.buckets.map(it => it.key + ' (' + it.doc_count + ')' ))"></b-form-checkbox-group>
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
            <b-form-checkbox-group stacked v-model="selectedYears" name="pubYearFacets" :options="limitArray(this.aggs.PublicationYear.buckets.map(it => transformToYear(it.key) + ' (' + it.doc_count + ')' ))"></b-form-checkbox-group>
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
            <b-form-checkbox-group stacked v-model="selectedLanguages" name="LanguageFacets" :options="limitArray(this.aggs.Language.buckets.map(it => it.key + ' (' + it.doc_count + ')' ))"></b-form-checkbox-group>
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
      selectedPublishers: [],
      selectedYears: [],
      selectedAuthors: [],
      selectedLanguages: []
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
