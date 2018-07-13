<template>

<div>
  <b-btn  v-b-toggle="'bookmarks-'+collection._id" size="sm" v-on:click="getBookmarkList(collection._id)"  variant="link" class="text-uppercase">Show data sets</b-btn>
  <b-collapse  v-bind:id="'bookmarks-'+collection._id" class="mt-2" accordion="bookmarks">
    <b-card v-if="bookmarksForCollection !=='processing'">
      <div v-if="bookmarksForCollection.length === 0">
        No results
      </div>
      <div v-else >
        <div class="m-2" v-for="bookmark  in bookmarksForCollection" :key="bookmark._id"  v-bind:id="'bookmark-'+bookmark._id">
          Here should be shown a card with data set
          <pre>
                {{bookmark._id}}
                {{bookmark._source.researchDisciplines}}
              </pre>
          <br>
          <b-button-group>
            <b-button disabled variant="link">More information</b-button>
            <b-button disabled variant="link">Remove</b-button>
          </b-button-group>
        </div>
      </div>
    </b-card>
    <b-card v-else >
      loading
    </b-card>
  </b-collapse>

</div>
</template>

<script>

/* eslint-disable */
import usercookie from '../util/usercookie.js'
import axios from 'axios'
export default {
  name: 'bookmark-list',
  props: ['collections','collection'],
  data() {
    return {
      bookmarks: [],
      filteredBookmarks: [],
      bookmarksForCollection: []
    }
  },
  created() {
    axios.defaults.timeout = 10000;
    //this.getBookmarkList()

  },
  methods: {
    getBookmarkList: function(collectionID) {
      const self = this
      if (self.lastcollectionID && self.lastcollectionID === collectionID) {
        // this block is to ignore the api call when the bookmark option is click 2nd time
        self.lastcollectionID = null
      } else {
        self.lastcollectionID = collectionID
        self.bookmarksForCollection = "processing"
        console.log('/api/v1/collections/' + usercookie.getUsername() + '/' + collectionID)
        axios.get('/api/v1/collections/' + usercookie.getUsername() + '/' + collectionID)
          .then(function (response) {
            self.bookmarksForCollection = []
            self.bookmarksForCollection = response.data
            console.log(response)
          })
          .catch(function (error) {
            self.bookmarksForCollection = []
            self.errMsg = error.response;
            console.log(error)
          });
      }
      /*self.collections.forEach(function (elem){
          axios.get('/api/v1/collections/'.concat(usercookie.getUsername()).concat('/').concat(elem._id))
            .then(function(response) {
            self.bookmarks.push(response.data)
        })
        .catch(function(error) {
          self.errMsg = error.response;
          console.log(error)
        });
      });*/
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

  }
}
</script>

<style scoped>

</style>
