<template>
<div>
  <h6>{{ numResults }} results for "nuts production quantity" found</h6>
  <ul class="list-unstyled">
    <search-result-entry v-for="item in 10" />
  </ul>
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
