<template>
<b-card tag="li">
  <b-media right-align vertical-align="top">
    <b-img class="providerLogo" v-if="hasProviderLogo(result._source.webLinks)" slot="aside" alt="Provider Logo" :src="getProviderLogo(result._source.webLinks)" />
    <h5><a :href='filterForViewURI(result._source.webLinks)'>{{ result._source.titles[0].value }}</a></h5>
    <br>
    <div class="publisher" v-if="result._source.publisher">
      <i>{{ showPublisher(result._source.publisher) }}</i>
    </div>
    <br>
    <div class="titels" v-if="result._source.descriptions">
      {{ showDescription(result._source.descriptions[0].value) }}
    </div>
    <br>
    <div class="docID" v-if="result._id"> Doc ID: 
      {{ showDescription(result._id) }}
    </div>
  </b-media>
  <br>
  <search-result-entry-menu></search-result-entry-menu>
</b-card>
</template>

<script>
/* eslint-disable */
export default {
  name: 'search-result-entry',
  props: ['result'],
  data() {
    return {}
  },
  methods: {
    filterForViewURI(linksArray) {
      if(linksArray) {
        return linksArray.filter(elem => elem.webLinkType == 'ViewURL')[0].webLinkURI
      }
      return '#'
    },
    showPublicationYear(year) {
      return year
    },
    showPublisher(publisher) {
      return publisher
    },
    showDescription(description) {
      let result = description.replace(/(<([^>]+)>)/ig, '')
      let limit = 850
      if (result.length > limit) result = result.substr(0,limit) + ' [...]'
      return result
    },
    hasProviderLogo(linksArray) {
      if(linksArray) {
        let val = linksArray.filter(elem => elem.webLinkType == 'ProviderLogoURL')
        return val.length > 0
      }
      return false
    },
    getProviderLogo(linksArray) {
      let val = linksArray.filter(elem => elem.webLinkType == 'ProviderLogoURL')
      return val[0].webLinkURI
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
