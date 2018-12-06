<template>
<div>
  <b-form @submit="search">
    <b-input-group>
      <b-input id="inlineFormInputGroupUsername2" v-model="inputvalue" :placeholder="placeholder" autofocus/>
      <b-input-group-append>
        <b-btn @click="search" variant="primary">Search</b-btn>
      </b-input-group-append>
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


<style scoped>

</style>
