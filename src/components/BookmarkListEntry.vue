<template>
<b-card>
  <b-media right-align vertical-align="top">
     <div class="bookmark" v-if="bookmark._source">
      <i>{{ showBookmarks(bookmark._source) }}</i>
    </div>
  </b-media>
  
</b-card>
</template>

<script>
/* eslint-disable */
export default {
  name: 'bookmark-list-entry',
  props: ['bookmark'],
  data() {
    return {}
  },
  methods: {
    showBookmarks(bookmark) {
    return bookmarks
    }
  }
}
</script>

<style scoped>

</style>