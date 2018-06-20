<template>
<div>
   <br>
<b-card class="mb-3" v-for="bookmark in bookmarks"  :key="bookmark._id">
   <h5><a :href='filterForViewURI(bookmark[0]._source.webLinks)'>{{ bookmark[0]._source.titles[0].value }}</a></h5>
   <h6>{{bookmark[0]._source.publisher}}</h6>

        <p>
         {{bookmark[0]._source.publicationYear}}
         <br>
        {{bookmark[0]._source.descriptions[0].value}}

        </p>
          <b-button-group>
            <b-button disabled variant="link">More information</b-button>
            <b-button disabled variant="link">Remove</b-button>
        </b-button-group>
    </b-card>
</div>

</template>

<script>

/* eslint-disable */
import usercookie from '../util/usercookie.js'
import axios from 'axios'
export default {
  name: 'bookmark-list-entry',
  props: ['collections'],
  data() {
    return {
      bookmarks: []
    }
  },
  created() {
    axios.defaults.timeout = 10000;
    this.getBookmarkList()

  },
  methods: {
    getBookmarkList() {
      const self = this
      self.collections.forEach(function (elem){
          axios.get('/api/v1/collections/'.concat(usercookie.getUsername()).concat('/').concat(elem._id))
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
    } 
  }
}
</script>

<style scoped>

</style>
