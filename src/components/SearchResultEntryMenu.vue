<template>
<div>
<b-button-group>
    <b-button disabled variant="outline-primary" class = "uppercased">More information</b-button>
    <b-button disabled variant="outline-primary" class = "uppercased">Share</b-button>
    <b-button @click="showBookmarkAlert(); addBookmark(); setAsBookmarked();" variant="outline-primary" class = "uppercased">{{bookmarkBtn}}</b-button>
    <b-button disabled variant="outline-primary" class = "uppercased">Preprocess</b-button>
    <b-button disabled variant="outline-primary" class = "uppercased">Store</b-button>
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
      axios.post('/api/v1/collections/tobias')
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          self.errMsg = error.response;
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