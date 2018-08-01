<template>
  <div class="ui borderless pagination menu" aria-label="Page navigation">
      <router-link class="item" v-if="currentPage > 1" :to="{ name: 'results', query: { 'q': $route.query.q, 'p': jumperMin(totalPages, currentPage) }}">
          &laquo;
      </router-link>
      <router-link class="item" v-for="pageNumber in totalPages" v-if="Math.abs(pageNumber - currentPage) < 3" v-bind:class="{ active: pageNumber == currentPage }" :to="{ name: 'results', query: { 'q': $route.query.q, 'p': pageNumber }}" :key="pageNumber">{{pageNumber}}</router-link>
      <router-link class="item" v-if="currentPage < totalPages" :to="{ name: 'results', query: { 'q': $route.query.q, 'p': jumperMax(totalPages, currentPage) }}">
          &raquo;
      </router-link>
    </div>
</template>

<script>
export default {
  name: 'paginationBar',
  props: [
    'totalPages',
    'currentPage'
  ],
  methods: {
    jumperMax (totalPages, currentPage) {
      if (totalPages < currentPage + 5) {
        return totalPages
      }
      return currentPage + 5
    },
    jumperMin (totalPages, currentPage) {
      if (currentPage - 5 < 1) {
        return 1
      }
      return currentPage - 5
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
