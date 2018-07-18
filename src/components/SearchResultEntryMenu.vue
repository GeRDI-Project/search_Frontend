<template>
<div>
  <b-button-group size="sm">
   <b-button disabled variant="primary-gerdi" >More information</b-button>
    <b-button disabled variant="primary-gerdi" >Share</b-button>
    <b-button v-b-modal.modal @click="showModal" variant="primary-gerdi" class="text-uppercase">{{bookmarkBtn}}</b-button>
    <b-button disabled variant="primary-gerdi">Preprocess</b-button>
    <b-button disabled variant="primary-gerdi" >Store</b-button>
  </b-button-group>
  <b-alert :show="dismissCountDown" dismissible variant="success" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
    The bookmark is successfully set!
  </b-alert>
  <div>
    <b-modal id="modal-center" centered ref="bookmarkingModal" hide-footer title="Saving data set to collection">
        <b-tabs>
          <b-tab title="Save to a new collection" active>
            <br>
            <b-form-input v-model="collectionName" type="text" placeholder="Enter the name of your collection"></b-form-input>
            <br>
            <hr>
            <b-button class="float-right btn btn-space" variant="primary-gerdi" @click="hideModal ()">Cancel</b-button>
            <b-button class="float-right btn btn-space" variant="primary-gerdi" @click="hideModal (); addBookmark(); showBookmarkAlert(); setAsBookmarked ()">Save</b-button>
            <br>
          </b-tab>
          <b-tab title="Save to an existing collection">
            <br>
            <b-form-select v-model="collectionID" :options="collectionList" class="mb-3">
              <template slot="first">
                <!-- this slot appears above the options from 'options' prop -->
                <option :value="null">Please select a collection name </option>
              </template>
            </b-form-select>
            <br>
            <hr>
            <b-button class="float-right  btn-space" variant="primary-gerdi" @click="hideModal ()" >Cancel</b-button>
            <b-button class="float-right  btn-space" variant="primary-gerdi" @click="hideModal (); addBookmarkToExistingCollection(); showBookmarkAlert(); setAsBookmarked ()">Save</b-button>
          </b-tab>
        </b-tabs>
      
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
      collectionList: [],
      collectionID: null
    }
  },
   created() {
    this.getCollectionList()
  },
  methods: {
    showModal () {
      this.$refs.bookmarkingModal.show()
    },
    hideModal () {
      this.$refs.bookmarkingModal.hide()
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
    getCollectionList() {
      const self = this
      self.collectionList = [ ]
      axios.get('/api/v1/collections/' + usercookie.getUsername())
        .then(function(response) {
          response.data
          .forEach(function(elem) {
            self.collectionList.push(elem.name)
          });
        })
        .catch(function(error) {
          self.errMsg = error.response;
          console.log(error)
        });

    },
    addBookmark() {
      const docID = this.results._id
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
          console.log(response)
          console.log(response.status)
          console.log(response.statusText)
          console.log(response.headers)
          console.log(response.config)
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    addBookmarkToExistingCollection() {
      const self = this;
      const docID = this.results._id
      axios.put('/api/v1/collections/' + usercookie.getUsername() + '/' + this.collectionID, {
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
.tab{
  color: #43a59f;
}
.btn-primary-gerdi:focus, .btn-primary-gerdi:active:focus, .btn-primary-gerdi.active:focus {
  outline: 0 none;
}

.btn-primary-gerdi {
padding: 10px 10px;
  border: 0 none;
  font-weight: 700;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  outline: 0 none;
  background: transparent;
  color: #083f64;
}
.btn-primary-gerdi:hover, .btn-primary-gerdi:focus, .btn-primary-gerdi:active, .btn-primary-gerdi.active, .open > .dropdown-toggle.btn-primary-gerdi {
  background: #77d7d0;
  box-shadow: none;
}
.btn-primary-gerdi:active, .btn-primary-gerdi.active {
  background: #007299;
  box-shadow: none;
}

.btn-space {
    margin-right: 5px;
}


</style>
