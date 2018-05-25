<template>
  <b-navbar toggleable="md" type="dark" variant="secondary">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">GeRDI</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item href="/" active class = "uppercased">Search</b-nav-item>
        <b-nav-item href="/bookmark" active class = "uppercased">Bookmark</b-nav-item>
        <b-nav-item href="#" disabled class = "uppercased">Store</b-nav-item>
        <b-nav-item href="#" disabled class = "uppercased">Preprocess</b-nav-item>
        <b-nav-item href="#" disabled class = "uppercased">Analyze</b-nav-item>
        <b-nav-item href="#" disabled class = "uppercased">Publish</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item href="#" v-b-tooltip.hover title="Coming soon!"><span class="glyphicon glyphicon-log-in" aria-hidden="true"></span>Log In</b-nav-item>

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<style scoped>
.uppercased {
  text-transform: uppercase;
}
</style>
