<template>
    <form v-on:submit.prevent="search">
      <div class="ui icon fluid large input" v-bind:class="{ loading: loading }">
        <input type="text" v-model="inputvalue" :placeholder="placeholder" autofocus>
        <i v-if="!loading" class="circular search icon link" v-on:click="search"></i>
        <i v-if="loading" class="loading icon"></i>
      </div>
    </form>
</template>

<script>
/*
export default {
  name: 'searchmask',
  props: ['loading'],
  data () {
    return {
      // loading: false,
      inputvalue: '',
      placeholder: 'Enter your search query here'
    }
  },
  created () {
    this.checkValue()
  },
  watch: {
    '$route.query.q': 'checkValue'
  },
  methods: {
    checkValue () {
      this.inputvalue = this.$route.query.q
    },
    search () {
      if (this.inputvalue != '') this.$router.push({ name: 'Results', query: { q: this.inputvalue }})
    }
  }
} */
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.glyphicon-search {
  pointer-events: initial;
}
a.form-control-feedback {
  text-decoration: none;
  cursor: pointer;
}
.ui.fluid.input input {
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  border-color: rgba(0, 0, 0, 0.1);
}
.ui.fluid.input input:focus {
  box-shadow: 0 4px 7px 2px rgba(0, 0, 0, 0.2);
  border-color: rgba(0, 0, 0, 0.1);
}
.ui.fluid.input input:hover {
  box-shadow: 0 4px 7px 2px rgba(0, 0, 0, 0.2);
  border-color: rgba(0, 0, 0, 0.1);
}
</style>
