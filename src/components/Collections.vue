<template>
<div>
<br>
<b-card class="m-2" v-for="collection in collections" :key="collection.id">
      <h3>{{collection.name}}</h3>
      <h5>{{collection._id}}</h5>
      <br>
      <b-btn v-b-toggle.collapse1_inner size="sm" v-on:click="showBookmarks" variant="link" class="text-uppercase">Show data sets</b-btn>
      <b-collapse id=collapse1_inner class="mt-2">
        <b-card class="m-2" v-for="bookmark in bookmarksForCollection" :key="bookmark.id">   
          Here should be shown a card with data set
          <br>
          <b-button-group>
            <b-button disabled variant="link">More information</b-button>
            <b-button disabled variant="link">Remove</b-button>
          </b-button-group>
        </b-card>
      </b-collapse>
    </b-card>
</div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
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
    showBookmarks() {
      const self = this
      self.bookmarksForCollection = []
      const collectionID = self.collections._id
      console.log("CollectionID: " + collectionID)
      axios.get('/api/v1/collections/' + usercookie.getUsername() + '/' + '5b30ec0465e12d00013d008b')
        .then(function (response) {
          self.bookmarksForCollection = response.data
          console.log(self.bookmarksForCollection)
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
