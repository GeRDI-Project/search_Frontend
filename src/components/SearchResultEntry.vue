<template>
<b-card tag="li">
  <b-media right-align vertical-align="top">
    <b-img slot="aside" blank blank-color="#ccc" width="80" alt="placeholder" />
    <h5 class="mt-0 mb-1">{{ title }}</h5>
    <h6 class="text-muted">{{ category }}</h6> {{ infoText }}
    </p>
    <b-nav type="dark">
      <b-nav-item>Active</b-nav-item>
      <b-nav-item>Link</b-nav-item>
      <b-nav-item>Another Link</b-nav-item>
      <b-nav-item>Disabled</b-nav-item>
    </b-nav>
  </b-media>
</b-card>
</template>

<script>
export default {
  name: 'searchResultEntry',
  data() {
    return {
      title: 'Brazil Nuts, with Shell',
      category: 'Crops (Production)',
      infoText: 'Crop statistics are recorded for 173 products, covering the following categories: Crops Primary, Fibre Crops Crop statistics are recorded for 173 products, covering the following categories: Crops Primary, Fibre Crops Primary, Cereals, Coarse Grain, Citrus Fruit, Fruit, Jute & Jute-like Fibres, Oilcakes Equivalent, Oil crops Primary, Pulses, Roots and Tubers, Treenuts and Vegetables and Melons. Data are expressed in terms of area harvested, production quantity, yield and seed quantity.'
    }
  }
}
</script>

<style scoped>
.card {
  margin-top: 1rem;
}
</style>
