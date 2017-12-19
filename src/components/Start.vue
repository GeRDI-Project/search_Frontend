<template>
<div class="ui container">
  <img src="../assets/GeRDI-Logo.svg"/>
  <div class="mask">
    <search-mask/>
  </div>
</div>
</template>

<script>
export default {
  name: 'start'
}
</script>

<style scoped>
img {
  height: 200px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 70px;
  margin-bottom: 70px;
  display: block;
}

.container {
}

.mask {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
