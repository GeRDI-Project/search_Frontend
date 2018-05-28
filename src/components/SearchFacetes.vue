<template>
<div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">  
      
      <b-btn block href="#" v-b-toggle.accordion1 variant="info">Publischer</b-btn> 
  
       
      </b-card-header>
      <b-collapse id="accordion1" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <p class="card-text">
            
            <br>
            
          <p class="card-text">
                <b-form-group>
      <b-form-checkbox-group stacked v-model="selected" name="flavour2" :options="options">
      </b-form-checkbox-group>
    </b-form-group>
          </p>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion2 variant="info"> Author </b-btn>
      </b-card-header>
      <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <p class="card-text">
            
          </p>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion3 variant="info">Publication year</b-btn>
      </b-card-header>
      <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <p class="card-text">
          
          </p>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      selected: [], // Must be an array reference!
      options: [
        {text: 'Esri', value: ''},
        {text: 'PANGAEA', value: ''},
        {text: 'GIS', value: ''},
      ]
    }
  }
}
</script>
<style scoped>
.card {
  margin-top: 1rem;
}


</style>