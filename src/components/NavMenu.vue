<template>
  <b-navbar toggleable="md" type="dark" variant="secondary">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">GeRDI</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item :to ="'/'" class = "text-uppercase">Search</b-nav-item>
        <b-nav-item :to="'/bookmarks'" class = "text-uppercase">Bookmark</b-nav-item>
        <b-nav-item href="#" disabled class = "text-uppercase">Store</b-nav-item>
        <b-nav-item href="#" disabled class = "text-uppercase">Preprocess</b-nav-item>
        <b-nav-item href="#" disabled class = "text-uppercase">Analyze</b-nav-item>
        <b-nav-item href="#" disabled class = "text-uppercase">Publish</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item href="#" v-b-tooltip.hover title="Coming soon!"><i class="material-icons">account_circle</i></b-nav-item>

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<style scoped>
</style>
