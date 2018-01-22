<template>
<b-card tag="li">
  <b-media right-align vertical-align="top">
    <b-img slot="aside" blank blank-color="#ccc" width="80" alt="placeholder" />
    <h6 class="text-muted">{{ category }}</h6>
    <br>
    <div class="publisher" v-if="result._source.publicationYear">
      {{ showPublicationYear(result._source.publicationYear) }}
    </div>
    <br>
    <div class="titels" v-if="result._source.descriptions">
          {{ showDescription(result._source.descriptions[0]) }}
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
    return {
      category: 'Crops (Production)',
    }
  },
  methods: {
    showPublicationYear(year) {
          return year
    },
    showDescription(description) {
      return description
    }
  }
}
</script>

<style scoped>
.card {
  margin-top: 1rem;
}
</style>
