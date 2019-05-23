<template>
<div class="">
  <b-jumbotron>
  <!-- <img src="../assets/GeRDI-Logo.svg" id="logo" /> -->
  <search-mask/>
  </b-jumbotron>
</div>
</template>

<script>
export default {
  name: 'start',
  data () {
    return {
      loadedBookmarks: false
    }
  },
  computed: {
    isChecked: function () {
      return this.$gerdi.aai.isChecked()
    }
  },
  watch: {
    isChecked: function () {
      if (this.loadedBookmarks === true || this.$gerdi.aai.getUser() === null) return
      var self = this
      this.$store.dispatch('refreshCollections', { vm: this }).then(function () { self.loadedBookmarks = true })
    }
  }
}
</script>

<style scoped>
#logo {
  width: 90%;
  max-width: 450px;
  margin: 4rem auto 4rem auto;
  display: block;
}
.jumbotron {
  position: absolute;
  top:45%;
  left:50%;
  transform: translate(-50%,-50%);
  width: 80%;
  background-color: transparent
}
</style>
