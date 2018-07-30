<template>
<div>
  <b-list-group>
    <b-list-group-item class="flex-column align-items-start" v-for="(collection) in collections" v-bind:key="collection._id"
      v-bind:id="'collection-'+collection._id">
      <div class="d-flex w-100 justify-content-between">
        <h4 class="mb-1">{{collection.name}}</h4>
      </div>
      <collection-entry :collection="collection"></collection-entry>
    </b-list-group-item>
  </b-list-group>
</div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import CollectionEntry from './CollectionEntry.vue'
import usercookie from '../util/usercookie.js'
export default {
  name: 'collections',
  props: ['datasets'],
  data() {
    return {
      collections: [],
    }
  },

  created() {
    this.getCollections()
  },

  methods: {
    getCollections() {
      const self = this
      self.collections = []
      axios.get('/api/v1/collections/' + usercookie.getUsername())
        .then(function (response) {
          self.collections = response.data
        })

        .catch(function (error) {
          self.errMsg = error.response;
          //console.log(error)
        });
    }
  },
  
}
</script>

<style scoped>
h4 {
  color: #43a59f;
}
.list-group{
  margin-top: 20px;
  margin-bottom: 20px
}
</style>
