<template>
  <b-navbar toggleable="md" variant="faded" type="light" >

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#"><img src="../assets/GeRDI-Logo.svg" id="logo" width = "100px" class="d-inline-block align-top" alt="BV">
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item :to ="'/'" class = "text-uppercase">Search</b-nav-item>
        <b-nav-item :to="'/bookmark'" class = "text-uppercase">Bookmark</b-nav-item>
        <b-nav-item href="#" disabled class = "text-uppercase">Store</b-nav-item>
        <b-nav-item href="#" disabled class = "text-uppercase">Preprocess</b-nav-item>
        <b-nav-item href="#" disabled class = "text-uppercase">Analyze</b-nav-item>
        <b-nav-item href="#" disabled class = "text-uppercase">Publish</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item href="#" v-b-modal.modal1><i class="material-icons">account_circle</i></b-nav-item>
        <b-modal id="modal1" title="Set username" @ok="saveUsername">
          <b-form-input v-model="username"
                  type="text"
                  placeholder="Enter your username"></b-form-input>
          </b-modal>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import usercookie from '../util/usercookie.js'
export default {
  name: 'nav-menu',
  data() {
    return {
      val: ""
    }
  },
  computed: {
    username: {
      get: function() {
        return usercookie.getUsername()
      },
      set: function(val) {
        this.val = val
      }
    },
  },

  methods: {
    saveUsername(evt) {
      if(this.val != ""){
        document.cookie = 'username=' + this.val
      }
    }
  }
}
</script>

<style scoped>
</style>
