<template>
<div>
<br>
<b-list-group>
  <b-list-group-item class="flex-column align-items-start" v-for="collection in this.$store.state.collections.collectionList" :key="collection.id" :value="collection.id">
    <div class="d-flex w-100 justify-content-between">
      <h4 class="mb-1">{{collection.name}}</h4>
    </div>
    <br>
      <bookmark-entry :collection="collection"></bookmark-entry>
  </b-list-group-item>
</b-list-group>
<br>

</div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import BookmarkList from './BookmarkEntry.vue'
import usercookie from '../util/usercookie.js'

export default {
  name: 'collections',
  props: ['bookmarks'],
}
</script>

<style scoped>
h4 {
  color: #43a59f;
}
</style>
