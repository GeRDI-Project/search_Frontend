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
  <b-button-group>
    <b-button disabled variant="link" >More information</b-button>
    <b-button disabled variant="link" >Share</b-button>
    <b-button v-b-modal.modal @click="showModal" variant="link">{{bookmarkBtn}}</b-button>
    <b-button disabled variant="link">Preprocess</b-button>
    <b-button disabled variant="link" >Store</b-button>
  </b-button-group>
  <b-alert :show="dismissCountDown" dismissible variant="success" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
    The bookmark is successfully set!
  </b-alert>
  <div>
    <b-modal id="modal-center" centered ref="bookmarkingModal" title="Save Document to a Collection" @ok="okClicked" :ok-disabled="collectionID === null" :ok-title="okBtn">
      Please select whether you want to store the selected document in a new or existing collection.
      <b-form-select v-model="collectionID" class="mt-3">
        <option :value="null" disabled>Please select an option</option>
        <option value="0">Create a new Collection</option>
        <optgroup label="Add to an existing Collection">
          <option v-for="collection in this.$store.state.collections.collectionList" :key="collection.id" :value="collection.id">
            {{ collection.name }}
          </option>
        </optgroup>
      </b-form-select>
    </b-modal>
  </div>

  <div>
    <b-modal id="modal-center" centered ref="createCollection" title="Create a new Collection" @ok="createNewCollection">
      <b-form-input v-model="collectionName" type="text" placeholder="Please enter a name for the new Collection"></b-form-input>
    </b-modal>
  </div>
</div>
</template>

<script>
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
    bookmarkBtn: {
      get: function () {
        if (this.$store.getters.isBookmarked(this.results._id) === true) {
          return 'Bookmarked'
        } else {
          return 'Add Bookmark'
        }
      },
      set: function(){
      }
    },
    okBtn: {
      get: function () {
        if (this.collectionID != 0) {
          return 'Save'
        } else {
          return 'Create'
        }
      },
      set: function () {
      }
    }
  },
  created() {
    //this.$store.commit('refreshCollections')
  },
  methods: {
    okClicked() {
      if (this.collectionID != 0) {
        this.addBookmarkToExistingCollection();
        this.showBookmarkAlert();
        this.setAsBookmarked ()
      } else {
        this.$refs.createCollection.show()
      }
    },
    createNewCollection() {
      this.addBookmark();
      this.showBookmarkAlert();
      this.setAsBookmarked ()
    },
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
