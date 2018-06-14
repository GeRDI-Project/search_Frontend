<template>
<div>
<h3>Bookmark</h3>
  <b-list-group v-for="bookmark in bookmarks" :key="bookmark._id">
  <b-list-group-item>{{bookmark._id}}</b-list-group-item>
  <b-list-group-item>{{bookmark._source.titles[0].value}}</b-list-group-item>
  <b-list-group-item>{{bookmark._source.publisher}}</b-list-group-item>
  
</b-list-group>

</div>

</template>

<script>

/* eslint-disable */
import axios from 'axios'
export default {
  name: 'bookmark-list-entry',
  props: ['collections'],
  data() {
    return {
      bookmarks: [],
      collectionID: []
    }
  },
  created() {
    axios.defaults.timeout = 10000;
    //this.getBookmarks()
    this.getCollectionID()
   
  },
  methods: {
    getCollectionID() {
      const self = this
      self.collectionID =[]
      self.bookmarks = [] 
      console.log("Collections in Bookmark Liste")
      console.log(self.collections) 
      self.collections.forEach(function (elem){
          console.log(elem._id)
          axios.get('/api/v1/collections/nastja_2/'.concat(elem._id))
            .then(function(response) {
            self.bookmarks = response.data
        })
        .catch(function(error) {
          self.errMsg = error.response;
          console.log(error)
        });
        console.log(self.bookmarks)
      }); 
      
    },

 /*    getBookmarks() {
      const self = this
      self.bookmarks = [ ] 
      console.log("Collections in BookmarkList")
      console.log(self.collection)
      
      axios.get('/api/v1/collections/nastja_2/5b22785a5597d300018716af')
        .then(function(response) {
          self.bookmarks = response.data
        })
        .catch(function(error) {
          self.errMsg = error.response;
          console.log(error)
        });
    }     */ 
  }
}
</script>

<style scoped>

</style>