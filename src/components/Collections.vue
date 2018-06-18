<template>
<div>
<br>
<b-tabs>
  <b-tab title="Collections" active>

  <br>
  <b-card class="mb-3" v-for="collection in collections" :collection="collections" :key="collection._id"
   :title = "collection.name"
            :sub-title=collection._id>
        <p>
        </p>
          <b-button-group>
            <b-button disabled variant="link">Show bookmarks</b-button>
            <b-button disabled variant="link">Edit name</b-button>
          <b-button disabled variant="link">Remove collection</b-button>
        </b-button-group>
    </b-card>
  </b-tab>
  <b-tab title="Bookmarks" >

  <bookmark-list-entry v-if="collections.length > 0" :collections="collections"></bookmark-list-entry>
  </b-tab>
</b-tabs>



</div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
export default {
  name: 'collections',
  props: ['results'],
  data() {
    return {
      collections: []
    }
  },

  created() {
    axios.defaults.timeout = 10000;
    this.getCollections()
  },

  methods: {
    getCookie(cname) {
      var name = cname + '=';
      if (document.cookie == "") return ""
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
    },
    makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },
    getUsername() {
      var username = this.getCookie('username')
      if (username == "") {
        username = this.makeid()
        document.cookie = 'username=' + username
      }
      return username
    },
    getCollections() {
      const self = this
      self.collections = [ ]
      axios.get('/api/v1/collections/' + this.getUsername())
        .then(function(response) {
          self.collections = response.data
        })

        .catch(function(error) {
          self.errMsg = error.response;
          console.log(error)
        });
    }
  }
}
</script>

<style scoped>
.mask {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.results {
  margin-top: 1rem;
}
.nothing-found-alert {
  margin-top: 1rem;
}
.pagination {
  margin-top: 1rem;
}
.results-annotation {
  margin-top: 1rem;
}
</style>
