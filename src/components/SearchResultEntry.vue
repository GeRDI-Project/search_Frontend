<template>
<div class="ui segments">
  <div class="ui segment">
    <div class="ui twelve column grid">
      <div class="fourteen wide column">
        <h5 class="ui header">{{ entry }}</h5>
        <h6 class="ui header">{{ category }}</h6>
        <div>
          {{ infoText }}
        </div>
      </div>
      <div class="two wide right aligned column">
        <div class="ui small image">
          <img src="../assets/weizen_icon.png">
        </div>
      </div>
    </div>
  </div>
  <div class="ui secondary segment">
    <div class="ui buttons">
      <button class="compact ui basic button">More Information</button>
      <button class="compact ui basic button">Share</button>
      <button class="compact ui basic button">Select</button>
      <button class="compact ui basic button">Preprocess</button>
      <a class="item" href="store.html" target="">
        <button class="compact ui basic button">Store</button>
      </a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'searchResultEntry',
  data () {
    return {
      entry: 'Brazil Nuts, with Shell',
      category: 'Crops (Production)',
      infoText: 'Crop statistics are recorded for 173 products, covering the following categories: Crops Primary, Fibre Crops Crop statistics are recorded for 173 products, covering the following categories: Crops Primary, Fibre Crops Primary, Cereals, Coarse Grain, Citrus Fruit, Fruit, Jute & Jute-like Fibres, Oilcakes Equivalent, Oil crops Primary, Pulses, Roots and Tubers, Treenuts and Vegetables and Melons. Data are expressed in terms of area harvested, production quantity, yield and seed quantity.'
    }
  }
}
</script>

<style scoped>
</style>
