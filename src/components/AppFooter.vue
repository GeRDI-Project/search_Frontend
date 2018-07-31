<template>
<footer class="bg-primary footer">
  <p>GeRDI &copy; 2016-2018</p>
  <div class="footer-links">
    <a href="http://www.gerdi-project.de/contact/">Contact Us</a>
    <!--  <a href="">Terms and Conditions</a> -->
    <a href="https://www.lrz.de/datenschutzerklaerungen/datenschutzerklaerung_cloud/">Privacy Policy</a>
    <a href="http://www.gerdi-project.de/imprint/">Impressum</a>
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
  height: 90px;
  color: #fafafa;
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.footer a {
  border-left-style: solid;
  border-width: 1px;
  padding-left: 4px;
  padding-right: 2px;
  color: #fafafa;
font-size: 90%
}

.footer-links a {
}

.footer-links a:first-child {
  border-left-style: none;
}
</style>
