<template>
<div>
  <br>
  <h6>{{ numResults }} results for "nuts production quantity" found</h6>
  <br>
  <ul class="list-unstyled">
   <!--  <search-result-entry v-for="item in 5" v-bind:data="item" /> -->
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
