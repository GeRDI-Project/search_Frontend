<template>
<div class="hello">
  <h1>{{ msg }}</h1>

  <!-- Semantic UI test -->
  <div class="ui centered card">
    <div class="image">
      <!-- <img src="./src/assets/logo.png"> -->
    </div>
    <div class="content">
      <a class="header">Kristy</a>
      <div class="meta">
        <span class="date">Joined in 2013</span>
      </div>
      <div class="description">
        Kristy is an art director living in New York.
      </div>
    </div>
    <div class="extra content">
      <a>
  	      <i class="user icon"></i>
  	      22 Friends
  	    </a>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'TestComponent',
  data () {
    return {
      msg: 'Test Component for the search frontend of GeRDI'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
