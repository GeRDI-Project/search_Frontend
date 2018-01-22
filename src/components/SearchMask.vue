<template>
<div>
  <b-form @submit="search">
    <b-input-group>
      <b-input id="inlineFormInputGroupUsername2" v-model="inputvalue" :placeholder="placeholder" autofocus/>
      <b-input-group-button slot="right">
        <b-btn @clic="search" variant="primary">Search</b-btn>
      </b-input-group-button>
    </b-input-group>
  </b-form>
</div>
</template>

<script>
/*eslint-disable*/
export default {
  name: 'search-mask',
  props: ['loading'],
  data() {
    return {
      // loading: false,
      inputvalue: '',
      placeholder: 'Enter your search query here'
    }
  },
  created() {
    this.checkValue()
  },
  watch: {
    '$route.query.q': 'checkValue'
  },
  methods: {
    checkValue() {
      this.inputvalue = this.$route.query.q
    },
    search() {
      if (this.inputvalue != '')
        this.$router.push({
          name: 'results',
          query: {
            q: this.inputvalue
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
i {
  // background-color: #0000FF;
  color: #000;
}

a.form-control-feedback {
  text-decoration: none;
  cursor: pointer;
}

.ui.fluid.input input {}

.ui.fluid.input input:focus {
  box-shadow: 0 4px 7px 2px rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.1);
}

.ui.fluid.input input:hover {
  box-shadow: 0 4px 7px 2px rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.1);
}
</style>
