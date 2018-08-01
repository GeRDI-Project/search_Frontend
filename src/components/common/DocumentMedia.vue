<template>
  <b-media right-align vertical-align="top">
    <b-img class="providerLogo" v-if="hasProviderLogo(doc._source.webLinks)" slot="aside" alt="Provider Logo" :src="getProviderLogo(doc._source.webLinks)"/>
    <h4>
      <a v-if="doc._source.webLinks && doc._source.webLinks.length > 0" :href='filterForViewURI(doc._source.webLinks)'><span>{{ getTitle() }}</span></a>
      <span v-else v-bind:class="{ deleted: !(this.doc._source.titles && this.doc._source.titles.length > 0)}">{{ getTitle() }}</span>
    </h4>
    <div class="publisher" v-if="doc._source.publisher">
      <h5>{{ showPublisher(doc._source.publisher) }}</h5>
    </div>
    <div class="creators" v-if="doc._source.creators">
      <h6> {{ doc._source.creators[0].creatorName.value }} </h6>
    </div>
    <div class="description" v-if="doc._source.descriptions">
      {{ showDescription(doc._source.descriptions[0].value) }}
    </div>
  </b-media>
</template>

<script>
/* eslint-disable */
export default {
  name: 'document-media',
  props: ['doc'],
  methods: {
    getTitle() {
      if (this.doc._source.titles && this.doc._source.titles.length > 0) {
        return this.doc._source.titles[0].value
      } else {
        return "We are sorry, but this document seems to be deleted."
      }
    },
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
.creators {
  margin-top: 20px;
}
.publisher {
  margin-top: 20px;
}
.descriptions {
  margin-top: 25px;
}

.deleted {
  color: #BBB;
}
</style>
