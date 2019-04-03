<template>
<div class="">
  <b-jumbotron>
  <!-- <img src="../assets/GeRDI-Logo.svg" id="logo" /> -->
  <search-mask/>
  </b-jumbotron>
  <b-btn @click="test()">TEST ME</b-btn>
</div>
</template>

<script>
export default {
  name: 'start',
  methods: {
    test () {
      console.log('hello')
      console.log(this.$route.hash)
      console.log(this.$store)
      console.log('Is ' + this.$gerdi.aai.enabled)
    },
    test2 () {
      this.$route.hash = ''
      console.log(this.$route.hash)
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
