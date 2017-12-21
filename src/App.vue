<template>
<div id="app">
  <nav-menu/>
  <div class="container content">
    <router-view />
  </div>
  <app-footer/>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.content {
  flex: 1;
}
</style>
