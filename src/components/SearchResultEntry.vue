<template>
<div>
  <b-card>
    <document-media :doc="this.result"></document-media>
    <div slot="footer">
        <search-result-entry-menu :results="this.result"></search-result-entry-menu>
    </div>
  </b-card>
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'search-result-entry',
  props: ['result'],
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
</style>
