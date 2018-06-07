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
            <b-form-checkbox-group stacked v-model="selectedPublishers" name="publisherFacets" :options="publishers"></b-form-checkbox-group>
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
            <b-form-checkbox-group stacked v-model="selectedAuthors" name="authorFacets" :options="authors"></b-form-checkbox-group>
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
            <b-form-checkbox-group stacked v-model="selectedYears" name="pubYearFacets" :options="years"></b-form-checkbox-group>
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
            <b-form-checkbox-group stacked v-model="selectedLanguages" name="LanguageFacets" :options="languages"></b-form-checkbox-group>
          </b-form-group>
        </p>
      </b-card-body>
    </b-collapse>
  </b-card>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
  name: 'search-facetes',
  props: ['results'],
  data() {
    return {
      fetchedFacets: [],
      selectedPublishers: [],
      selectedYears: [],
      selectedAuthors: [],
      selectedLanguages: [],
      publishers: [],
      years: [],
      authors: [],
      languages: []
    }
  },
  created() {
    this.fetchFacets()
  },

  methods: {

    fetchFacets() {
      const self = this
      self.fetchedFacets = []
      self.publishers = []
      self.languages = []
      self.years = []
      self.authors = []

      self.results.forEach(function (search_hit) {
          if (self.publishers.indexOf(search_hit._source.publisher) == -1) {
            self.publishers.push(search_hit._source.publisher)
          }
          if (self.languages.indexOf(search_hit._source.language) == -1) {
            self.languages.push(search_hit._source.language)
          }
          for (var i = 0; i < search_hit._source.creators.length; i++) {
            if (self.authors.indexOf(search_hit._source.creators[i].creatorName.value) == -1) {
              self.authors.push(search_hit._source.creators[i].creatorName.value)
            }
          }
           if (self.years.indexOf(search_hit._source.publicationYear) == -1) {
            self.years.push(search_hit._source.publicationYear)
          }

        });
      self.publishers.sort()
      self.authors.sort()
      self.years.sort()
      self.languages.sort()
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
