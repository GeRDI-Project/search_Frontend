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
             The bookmark is successfully set!
</b-alert>

<div>
    <b-modal ref="myModalRef" hide-footer title="Saving data set to collection">
{{this.$store.state.search.collectionList}}
      <hr>
      <div class="d-block text-center">
        <h5>Save to a new collection</h5>
        <br>
        <b-form-input  v-model="collectionName"
        type="text"
                      placeholder="Enter the name of your collection">
                      </b-form-input>


<b-btn class="mt-3" variant="outline-success" block @click="hideModal (); addBookmark(); showBookmarkAlert(); setAsBookmarked ()">Ok</b-btn>
<br>
<h5>Select an existing collection</h5>
 <b-form-select v-model="collectionID" class="mb-3">
      <template slot="first">
        <!-- this slot appears above the options from 'options' prop -->
        <option :value="null">Please select a collection name </option>
      </template>
      <option v-for="collection in this.$store.state.search.collectionList" v-bind:value="collection.id">
      {{ collection.name }}
      </option>
    </b-form-select>


      </div>


      <b-btn class="mt-3" variant="outline-success" block @click="hideModal (); addBookmarkToExistingCollection(); showBookmarkAlert(); setAsBookmarked ()">Ok</b-btn>
    </b-modal>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import usercookie from '../util/usercookie.js'

/* eslint-disable */
export default {
  name: 'search-result-entry-menue',
  props: ['results'],
  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
      bookmarkBtn: 'Add Bookmark',
      collectionName: '',
      collectionID: null,
    }
  },
  created() {

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
      const self = this
      const docID = this.results._id;
      axios.post('/api/v1/collections/' + usercookie.getUsername(), {
        name: this.collectionName,
        docs: [docID]
      },
      {
        headers: {
        'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          self.$store.commit('refreshCollections');
          console.log("Adding bookmark to new collection named: "+self.collectionName)
//          console.log(response);
//          console.log(response.status);
//          console.log(response.statusText);
//          console.log(response.headers);
//          console.log(response.config)
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    addBookmarkToExistingCollection() {
      const self = this;
      const docID = this.results._id;
      if (this.collectionID != null) {
        axios.put('/api/v1/collections/' + usercookie.getUsername() + '/' + this.collectionID, {
          docs: [docID]
        },
        {
          headers: {
          'Content-Type': 'application/json'
          }
        })
          .then(function (response) {
            console.log("Adding bookmark to collection "+self.collectionName+" with ID: "+self.collectionID);
//            console.log(response);
//            console.log(response.status);
//            console.log(response.statusText);
//            console.log(response.headers);
//            console.log(response.config);
          })
          .catch(function (error) {
            console.log(error);
          });
        } else {
        console.log("Empty collection ID");
      }
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
