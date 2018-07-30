<template>
<div>
  <b-card>
    <b-media right-align vertical-align="top">
      <b-img class="providerLogo" v-if="hasProviderLogo(result._source.webLinks)" slot="aside" alt="Provider Logo" :src="getProviderLogo(result._source.webLinks)"
      />
      <h4>
        <a :href='filterForViewURI(result._source.webLinks)'><span v-if="result._source.titles">{{ result._source.titles[0].value }}</span></a>
      </h4>
      <br>
      <div class="publisher" v-if="result._source.publisher">
        <h5>{{ showPublisher(result._source.publisher) }}</h5>
      </div>
      <br>
      <div class="creators" v-if="result._source.creators">
        <h6> {{ result._source.creators[0].creatorName.value }} </h6>
      </div>
      <div class="description" v-if="result._source.descriptions">
        {{ showDescription(result._source.descriptions[0].value) }}
      </div>
    </b-media>

    <br>
    <div>
      <slot name="footer">
        <search-result-entry-menu :results="this.result"></search-result-entry-menu>
      </slot>
    </div>
  </b-card>
</div>
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
a {
  color: #43a59f;
}
</style>
