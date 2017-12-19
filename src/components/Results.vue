<template>
<div class="ui container">
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
  name: 'results'
}
</script>

<style scoped>
.mask {
  margin-top: 1rem;
  margin-bottom: 2rem;
}
</style>
