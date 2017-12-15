<template>
<div class="ui container">
  <nav-menu/>
  <div class="mask">
    <search-mask/>
  </div>
  <div class="ui grid">
    <div class="four wide column">
      <search-facetes/>
    </div>
    <search-result-list/>
  </div>
</div>
</template>

<script>
export default {
  name: 'start'
}
</script>

<style scoped>
.mask {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
