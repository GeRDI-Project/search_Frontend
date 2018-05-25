<template>
<div>
<b-button-group>
    <b-button variant="outline-primary" class = "uppercased">More information</b-button>
    <b-button variant="outline-primary" class = "uppercased">Share</b-button>
    <b-button @click="showBookmarkAlert" variant="outline-primary" class = "uppercased">Bookmark</b-button>
    <b-button variant="outline-primary" class = "uppercased">Preprocess</b-button>
    <b-button variant="outline-primary" class = "uppercased">Store</b-button>
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
/* eslint-disable */
export default {
  data () {
    return {
      dismissSecs: 5,
      dismissCountDown: 0
    }
  },
  methods: {
     countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showBookmarkAlert () {
      this.dismissCountDown = this.dismissSecs
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