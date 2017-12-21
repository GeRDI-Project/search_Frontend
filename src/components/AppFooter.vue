<template>
  <footer class="bg-secondary footer">
    <a href="">Contact Us</a>
    <a href="">Terms and Conditions</a>
    <a href="">Privacy Policy</a>
  </footer>
</template>

<script>
export default {
  name: 'app-footer'
}
</script>

<style>
.footer {
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.footer a {
  border-left-style: solid;
  border-width: 1px;
  padding-left: 4px;
  color: rgba(255, 255, 255, 0.5);
}

.footer a:first-child {
  border-left-style: none;
}
</style>
