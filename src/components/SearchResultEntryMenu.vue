<template>
<div>
<b-button-group size = "sm">
    <b-button disabled variant="outline-primary" class = "text-uppercase">More information</b-button>
    <b-button disabled variant="outline-primary" class = "text-uppercase">Share</b-button>
    <b-button @click="addBookmark()" variant="outline-primary" class = "text-uppercase">{{bookmarkBtn}}</b-button>
    <b-button disabled variant="outline-primary" class = "text-uppercase">Preprocess</b-button>
    <b-button disabled variant="outline-primary" class = "text-uppercase">Store</b-button>
  </b-button-group>
  <br>
  <br>
  <b-alert :show="dismissCountDown"
             dismissible
             variant="success"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
             The bookmark is succesfully set!
</b-alert>
</div>
</template>

<script>
import axios from 'axios'
/* eslint-disable */
export default {
  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
      bookmarkBtn: 'Add Bookmark'
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showBookmarkAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    setAsBookmarked () {
    this.bookmarkBtn = 'Bookmarked'
    },
    addBookmark() {
      const self = this;
      self.bookmarks = [];  
      axios.post('/api/v1/collections/tobias', {
      name:"TestCollection",
      docs:["b7ba880aac4387f455d1ed864902f322df3feacb"]
      })
        .then(function (response) {
          console.log(response)
          console.log(response.status)
          console.log(response.statusText)
          console.log(response.headers)
          console.log(response.config)
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  }
}

</script>





<style scoped>
.card {
  margin-top: 1rem;
}

.providerLogo {
  max-height: 100px;
  width: auto;
}

.uppercased {
  text-transform: uppercase;
}
</style>