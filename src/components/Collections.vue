<template>
<div>
<br>
  <b-card class="m-2" v-for="(collection, ckey, cindex) in collections" v-bind:key="collection._id" v-bind:id="'collection-'+collection._id">
      <h3>{{collection.name}}</h3>
      <h5>{{collection._id}}</h5>
      <br>
      <bookmark-list :collection="collection"></bookmark-list>
  </b-card>
</div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import BookmarkList from './BookmarkList.vue'
import usercookie from '../util/usercookie.js'
export default {
  name: 'collections',
  props: ['bookmarks'],
  data() {
    return {
      collections: [],
      bookmarksForCollection: []
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
          console.log(error)
        });
    },
    getBookmarkList() {
      const self = this
      self.collections.forEach(function (elem){
          axios.get('/api/v1/collections/'.concat(usercookie.getUsername()).concat('/').concat(elem._id))
          console.log(elem._id)
            .then(function(response) {
            self.bookmarks.push(response.data)
        })
        .catch(function(error) {
          self.errMsg = error.response;
          console.log(error)
        });
      });
    },
    filterForViewURI(linksArray) {
      if(linksArray) {
        return linksArray.filter(elem => elem.webLinkType == 'ViewURL')[0].webLinkURI
      }
      return '#'
    },
    showDescription(description) {
      let result = description.replace(/(<([^>]+)>)/ig, '')
      let limit = 850
      if (result.length > limit) result = result.substr(0,limit) + ' [...]'
      return result
    },
    filterForexistingBookmarks(bookmarksArray) {
      if(bookmarksArray) {
        return bookmarksArray.filter(elem => elem.webLinkType == 'ViewURL')[0].webLinkURI
      }
      return 'hallo'
    }
  }
}
</script>

<style scoped>

</style>
