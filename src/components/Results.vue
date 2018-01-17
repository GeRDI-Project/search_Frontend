<template>
<div>
  <div class="mask">
    <search-mask/>
  </div>
  <b-container>
    <b-row>
      <b-col cols="3"><search-facetes/></b-col>
      <b-col cols="9"><search-result-list/></b-col>
    </b-row>
  </b-container>
  <b-pagination align="center" size="md" :total-rows="100" v-model="currentPage" :per-page="10"/>
</div>
</template>

<script>
export default {
  name: 'results',
  data () {
    return {
      // loading: false,
      currentPage: 7,
    }
  }
}
</script>

<style scoped>
.mask {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
