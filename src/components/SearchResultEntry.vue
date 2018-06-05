<template>
<b-card>
  <b-media right-align vertical-align="top">
    <b-img class="providerLogo" v-if="hasProviderLogo(result._source.webLinks)" slot="aside" alt="Provider Logo" :src="getProviderLogo(result._source.webLinks)" />
    <h5><a :href='filterForViewURI(result._source.webLinks)'>{{ result._source.titles[0].value }}</a></h5>
    <br>
    <div class="publisher" v-if="result._source.publisher">
      <i>{{ showPublisher(result._source.publisher) }}</i>
    </div>
    <br>
    <div class="creator" v-if="result._source.creators">
      {{ result._source.creators[0].creatorName.value }}
    </div>
    <br>
    <div class="year" v-if="result._source.publicationYear">
      <i>{{ showPublicationYear(result._source.publicationYear) }}</i>
    </div>
    <br>
    <div class="discription" v-if="result._source.descriptions">
      {{ showDescription(result._source.descriptions[0].value) }}
    </div>
  </b-media>
</b-card>
</template>

<script>
/* eslint-disable */
export default {
  name: 'search-result-entry',
  props: ['result'], 
  data() {
    return { }
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
    },
    showCreator(creator) {
      return creator
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
