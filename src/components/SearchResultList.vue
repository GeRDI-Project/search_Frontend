<template>
<div>
  <br>
  <h6>{{ numResults }} results for "nuts production quantity" found</h6>
  <br>
  <ul class="list-unstyled">
    <search-result-entry v-for="result in results" :result="result" :key="result._id"></search-result-entry>
  </ul>
</div>
</template>

<script>
/*eslint-disable*/
export default {
  name: 'search-result-list',
  props: ['result'],
  data() {
    return {
      // loading: false,
      totalPages: 15,
      currentPage: 7,
      numResults: 205
    }
  }
}
</script>

<style scoped>
</style>
