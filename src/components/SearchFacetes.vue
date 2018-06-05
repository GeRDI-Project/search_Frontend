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
  
  


  
  name: 'search-facets',
  props: ['search', 'result'],
  data() {
    return {
      totalFoundDocs: 0,
      numDocsPerPage: 10,
      selectedPublishers: [], 
      selectedYears:[],
      selectedAuthors: [],
      selectedLanguages: [],
      publishers: [],
      years: [],
      authors: [],
      languages: []
    }
  },
  created() {
    this.fetchPublisherFacets(),
    this.fetchPubYearFacets(),
    this.fetchAuthors(),
    this.fetchLanguage()
  },
  methods: {
    fetchPublisherFacets() {
      const self = this
      self.publishers = []
      axios.get('/api/search?q='
          .concat(encodeURIComponent(this.$route.query.q))
          .concat("&from=0")
          .concat("&size=1000"))
          //.concat(this.numDocsPerPage))
        .then(function (response) {
          self.totalFoundDocs = response.data.hits.total;
          response.data.hits.hits

            .forEach(function (search_hit) {
              if (self.publishers.indexOf(search_hit._source.publisher) == -1) {
                self.publishers.push(search_hit._source.publisher)
              }
            });
        })
        .catch(function (error) {
          self.errMsg = error.response;
          console.log(error)
        });
      },
      fetchPubYearFacets() {
      const self = this
      self.years = []
      axios.get('/api/search?q='
          .concat(encodeURIComponent(this.$route.query.q))
          .concat("&from=0")
          .concat("&size=1000"))
          //.concat(this.numDocsPerPage))
        .then(function (response) {
          self.totalFoundDocs = response.data.hits.total;
          response.data.hits.hits
            .filter(function (search_hit) {
              return typeof search_hit._source.publicationYear != 'undefine' && search_hit._source.publicationYear != 0
            })
            .forEach(function (search_hit) {
              if (self.years.indexOf(search_hit._source.publicationYear) == -1) {
                self.years.push(search_hit._source.publicationYear)
              }
            });
            self.years.sort()
        })
        .catch(function (error) {
          self.errMsg = error.response;
          console.log(error)
        });
      },
    fetchAuthors() {
      const self = this
      self.authors = []
      axios.get('/api/search?q='
          .concat(encodeURIComponent(this.$route.query.q))
          .concat("&from=0")
          .concat("&size=1000"))
        //.concat(this.numDocsPerPage))
        .then(function (response) {
          response.data.hits.hits
            .forEach(function (search_hit) {
              for (var i = 0; i < search_hit._source.creators.length; i++) {
                if (self.authors.indexOf(search_hit._source.creators[i].creatorName.value) == -1) {
                  self.authors.push(search_hit._source.creators[i].creatorName.value)
                }
              }
            });
            self.authors.sort()
        })
        .catch(function (error) {
          self.errMsg = error.response;
          console.log(error)
        });
      },
fetchLanguage() {
      const self = this
      self.languages = []
      axios.get('/api/search?q='
          .concat(encodeURIComponent(this.$route.query.q))
          .concat("&from=0")
          .concat("&size=1000"))
          //.concat(this.numDocsPerPage))
        .then(function (response) {
          response.data.hits.hits

            .forEach(function (search_hit) {
              if (self.languages.indexOf(search_hit._source.language) == -1) {
                self.languages.push(search_hit._source.language)
              }
            });
        })
        .catch(function (error) {
          self.errMsg = error.response;
          console.log(error)
        });
      }

    }
  }
</script>




<style scoped>
.card {
  margin-top: 1rem;
}


</style>
