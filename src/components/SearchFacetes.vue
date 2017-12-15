<template>
<div class="ui vertical accordion menu">
  <div class="item">
    <a class="title">
       <i class="dropdown icon"></i>
       <h5 class="ui header">Research Field</h5>
    </a>
  </div>
  <div class="item">
    <a class="title">
      <i class="dropdown icon"></i>
      <h5 class="ui header">Data Provider</h5>
    </a>
    <div class="active content">
      <div class="ui form">
        <div class="grouped fields">
          <div class="field">
            <div class="ui checkbox">
              <input type="checkbox" name="small">
              <label>FAOSTAT</label>
            </div>
          </div>
          <div class="field">
            <div class="ui checkbox">
              <input type="checkbox" name="medium">
              <label>SOEP</label>
            </div>
          </div>
          <div class="field">
            <div class="ui checkbox">
              <input type="checkbox" name="large">
              <label>PANGAEA</label>
            </div>
          </div>
          <div class="field">
            <div class="ui checkbox">
              <input type="checkbox" name="x-large">
              <label>GIS</label>
            </div>
          </div>
          <div class="field">
            <a class="item" href="search_results_filtered.html" target="">
              <button class="compact ui basic button">APPLY</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="item">
    <a class="title">
      <i class="dropdown icon"></i>
      <h5 class="ui header">Language</h5>
    </a>
  </div>
  <div class="item">
    <a class="title">
      <i class="dropdown icon"></i>
      <h5 class="ui header">Location</h5>
    </a>
  </div>
  <div class="item">
    <a class="title">
      <i class="dropdown icon"></i>
      <h5 class="ui header">Data Collection Period</h5>
    </a>
  </div>
  <div class="item">
    <a class="title">
      <i class="dropdown icon"></i>
      <h5 class="ui header">Publication Year</h5>
    </a>
  </div>
  <div class="item">
    <a class="title">
      <i class="dropdown icon"></i>
      <h5 class="ui header">Access</h5>
    </a>
  </div>
  <div class="item">
    <a class="title">
      <i class="dropdown icon"></i>
      <h5 class="ui header">Terms of Re-use</h5>
    </a>
  </div>
</div>
</template>
