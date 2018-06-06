<template>
<div class="bookmark-list">
    <b-container>
    <b-row>

      <b-col cols="12">
     
      </b-col>
    </b-row>

  </b-container>
 
</div>

</template>

<script>
/* eslint-disable */

import axios from 'axios'
export default {
  name: 'bookmark-list',
  data() {
    return {
     
    }
  },
  computed: {
    
  },
  created() {
    axios.defaults.timeout = 10000;
    this.getBookmarks()
  },
  
  methods: {
   getBookmarks() {}
    }
  }

</script>

<style scoped>
.mask {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.results {
  margin-top: 1rem;
}
.nothing-found-alert {
  margin-top: 1rem;
}
.pagination {
  margin-top: 1rem;
}
.results-annotation {
  margin-top: 1rem;
}
</style>
