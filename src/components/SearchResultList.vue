<template>
<div class="twelve wide column">
  <h5>{{ numResults }} results for "nuts production quantity" found</h5>
  <div class="ui divided items">
    <search-result-entry v-for="item in 10" />
    <pagination-bar v-if="totalPages > 1" :totalPages="totalPages" :currentPage="currentPage" />
  </div>
</div>
</template>

<script>
export default {
  data () {
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
