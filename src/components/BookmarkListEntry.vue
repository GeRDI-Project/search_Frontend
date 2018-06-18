<template>
  <div>
     <br>
      <h3>Bookmarks</h3>
      <b-card class="mb-3" v-for="bookmark in bookmarks"  :key="bookmark._id">
         <h5><a :href='filterForViewURI(bookmark[0]._source.webLinks)'>{{ bookmark[0]._source.titles[0].value }}</a></h5>
         <h6>{{bookmark[0]._source.publisher}}</h6>

              <p>
               {{bookmark[0]._source.publicationYear}}
               <!-- description could not be shown due some error, need discussion  -->
              </p>
                <b-button-group>
                  <b-button disabled variant="link">More information</b-button>
                  <b-button disabled variant="link">Store</b-button>
                <b-button disabled variant="link">Preprocess</b-button>
                <b-button disabled variant="link">Analyse</b-button>
              </b-button-group>
          </b-card>
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
