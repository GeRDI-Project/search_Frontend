<template>
<div class="twelve wide column">
  <div class="ui basic segment">
    <h5 class="ui header">205 results for "nuts production quantity" found</h5>
  </div>
  <search-result-entry v-for="item in 3" />
  <pagination-bar v-if="totalPages > 1" :totalPages="totalPages" :currentPage="currentPage" />
</div>
</template>

<script>
export default {
  data() {
    return {
      // loading: false,
      totalPages: 15,
      currentPage: 7
    }
  }
}
</script>

<style scoped>
</style>
