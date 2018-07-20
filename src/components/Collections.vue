<template>
<div>
<br>
  <b-tabs>

    <b-tab title="Collections">

      <br>
      <b-list-group v-for="collection in this.$store.state.collections.collectionList" :key="collection.id" :value="collection.id">
        <b-list-group-item >
          {{collection.name}} <br> {{collection.id}} <br>
        </b-list-group-item>
      </b-list-group>

    </b-tab>

    <b-tab title="Bookmarks" >
      <br>
      <b-list-group v-if="this.$store.state.collections.collectionList.length > 0" :collections="this.$store.state.collections.collectionList"></b-list-group>
    </b-tab>
  </b-tabs>
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

</style>
