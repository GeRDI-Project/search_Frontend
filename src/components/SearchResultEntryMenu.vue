/**
 * Copyright 2018 Alvaro Aguilera, Nelson Tavares de Sousa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 <template>
<div>
  <b-button-group size="sm">
    <b-button disabled variant="primary-gerdi" >More information</b-button>
    <b-button disabled variant="primary-gerdi" >Share</b-button>
    <b-button v-b-modal.modal @click="showModal" variant="primary-gerdi" class="text-uppercase">{{bookmarkBtn}}</b-button>
    <b-button disabled variant="primary-gerdi">Preprocess</b-button>
    <b-button disabled variant="primary-gerdi" >Store</b-button>
  </b-button-group>
  <b-alert :show="dismissCountDown"
             dismissible
             variant="success"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
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
            <b-form-select v-model="collectionID" class="mb-3">
              <!-- <b-form-select v-model="selectedCollectionName" class="mb-3"> -->
              <template slot="first">
                <!-- this slot appears above the options from 'options' prop -->
                <option :value="null" disabled>Please select a collection name </option>
              </template>
              <option v-for="collection in this.$store.state.collections.collectionList" :key="collection.id" :value="collection.id">
                {{ collection.name }}
              </option>
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
      collectionName: '',
      collectionID: null
    }
  },
  computed: {
    bookmarkBtn: function () {
      if (this.$store.getters.isBookmarked(this.results._id) === true) {
        return 'Bookmarked'
      } else {
        return 'Add Bookmark'
      }
    }
  },
  created() {
    //this.$store.commit('refreshCollections')
  },
  methods: {
    showModal() {
      this.$refs.bookmarkingModal.show()
    },
    hideModal() {
      this.$refs.bookmarkingModal.hide()
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showBookmarkAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    setAsBookmarked() {
      this.bookmarkBtn = 'Bookmarked'
    },
    addBookmark() {
      this.$store.dispatch('createBookmark', {
        collectionName: this.collectionName,
        docID: this.results._id
      })
    },
    addBookmarkToExistingCollection() {
      const self = this
      if (self.collectionID != null) {
        self.$store.dispatch('updateCollection', {
          collectionID: self.collectionID,
          docID: self.results._id
        })
      } else {
         console.log("Empty collection ID");
      }
    }
  }
}
</script>





<style scoped>

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
