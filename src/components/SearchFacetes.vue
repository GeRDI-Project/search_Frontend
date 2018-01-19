<template>
<b-card title="Filters">
  <b-nav vertical>
    <b-nav-item v-b-toggle.collapse1>Research Field</b-nav-item>
    <b-collapse id="collapse1" class="mt-2">
      <p class="card-text">{{ text }}</p>
    </b-collapse>

    <b-nav-item v-b-toggle.collapse2>Location</b-nav-item>
    <b-collapse id="collapse2" class="mt-2">
      <p class="card-text">{{ text }}</p>
    </b-collapse>

    <b-nav-item v-b-toggle.collapse3>Data Provider</b-nav-item>
    <b-collapse visible id="collapse3" class="mt-2">
      <b-form>
        <b-form-checkbox-group stacked :options="options" />
        <b-button type="submit" variant="primary" size="sm">Apply</b-button>
      </b-form>
    </b-collapse>

    <b-nav-item v-b-toggle.collapse4>Language</b-nav-item>
    <b-collapse id="collapse4" class="mt-2">
      <p class="card-text">{{ text }}</p>
    </b-collapse>

    <b-nav-item v-b-toggle.collapse5>Data Collection Period</b-nav-item>
    <b-collapse id="collapse5" class="mt-2">
      <p class="card-text">{{ text }}</p>
    </b-collapse>

    <b-nav-item v-b-toggle.collapse6>Publication Year</b-nav-item>
    <b-collapse id="collapse6" class="mt-2">
      <p class="card-text">{{ text }}</p>
    </b-collapse>

    <b-nav-item v-b-toggle.collapse7>Access</b-nav-item>
    <b-collapse id="collapse7" class="mt-2">
      <p class="card-text">{{ text }}</p>
    </b-collapse>

    <b-nav-item v-b-toggle.collapse8>Terms of Reuse</b-nav-item>
    <b-collapse id="collapse8" class="mt-2">
      <p class="card-text">{{ text }}</p>
    </b-collapse>
  </b-nav>
</b-card>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      showCollapse: true,
      text: 'This is a super fancy placeholder',
      options: [{
          text: 'FAOStat',
          value: '1'
        },
        {
          text: 'SOEP',
          value: '2'
        },
        {
          text: 'Pangaea',
          value: '3'
        },
        {
          text: 'GIS',
          value: '4'
        }
      ]
    }
  }
}
</script>
