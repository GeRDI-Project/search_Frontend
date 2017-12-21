<template>
<div class="item">
  <div class="content">
    <div class="header">{{ title }}</div>
    <div class="meta">{{ category }}</div>
    <div class="description">{{ infoText }}</div>
    <div class="extra">
      <search-result-entry-menu/>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'searchResultEntry',
  data () {
    return {
      title: 'Brazil Nuts, with Shell',
      category: 'Crops (Production)',
      infoText: 'Crop statistics are recorded for 173 products, covering the following categories: Crops Primary, Fibre Crops Crop statistics are recorded for 173 products, covering the following categories: Crops Primary, Fibre Crops Primary, Cereals, Coarse Grain, Citrus Fruit, Fruit, Jute & Jute-like Fibres, Oilcakes Equivalent, Oil crops Primary, Pulses, Roots and Tubers, Treenuts and Vegetables and Melons. Data are expressed in terms of area harvested, production quantity, yield and seed quantity.'
    }
  }
}
</script>

<style scoped>
</style>
