<template>
<footer class="bg-secondary footer">
  <p>GeRDI &copy; 2016-2018</p>
  <div class="footer-links">
    <a href="">Contact Us</a>
    <a href="">Terms and Conditions</a>
    <a href="">Privacy Policy</a>
  </div>
</footer>
</template>

<script>
export default {
  name: 'app-footer'
}
</script>

<style>
.footer {
  color: rgba(255, 255, 255, 0.5);
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

.footer-links a:first-child {
  border-left-style: none;
}
</style>
