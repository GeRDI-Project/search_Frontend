<template>
<div>
<b-button-group size = "sm">
    <b-button disabled variant="outline-primary" class = "text-uppercase">More information</b-button>
    <b-button disabled variant="outline-primary" class = "text-uppercase">Share</b-button>
    <b-button @click="showModal" variant="outline-primary" class = "text-uppercase">{{bookmarkBtn}}</b-button>
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

<div>
    <b-modal ref="myModalRef" hide-footer title="Saving the colliction">
      <div class="d-block text-center">
        <b-form-input type="text"
                      placeholder="Enter the name of your collection"
                      v-model="collectionName"></b-form-input>
      </div>
      <b-btn class="mt-3" variant="outline-success" block @click="hideModal (); addBookmark(); showBookmarkAlert(); setAsBookmarked ()">Ok</b-btn>
    </b-modal>
  </div>
</div>
</template>

<script>
import axios from 'axios'
/* eslint-disable */
export default {
  name: 'search-result-entry-menue',
  props: ['results'],
  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
      bookmarkBtn: 'Add Bookmark',
      collectionName: ' '
      
    }
  },
  methods: {
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
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
      var docID = this.results._id
      axios.post('/api/v1/collections/nastja', {
        name: this.collectionName,
        docs: [docID]
      },
      {
        headers: {
        'Content-Type': 'application/json'
        }
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
