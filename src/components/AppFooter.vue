<template>
  <footer class="bg-dark" id="footer" data-bs-theme="light">
    <div class="container text-md-left">
      <div class="row d-flex align-items-center flex-wrap border-bottom pb-3">
        <!-- Contact Section -->
        <div class="col-md-3 mt-5" id="contact-section">
          <h5 class="text-uppercase font-weight-bold text-white mb-3">
            Contact
          </h5>
          <ul class="nav flex-column text-white opacity-75">
            <li class="nav-item">
              <p>City: Cebu City</p>
            </li>
            <li class="nav-item">
              <p>Zip Code: 6000</p>
            </li>
            <li class="nav-item">
              <p>Phone Number: (032)3333333</p>
            </li>
            <li class="nav-item">
              <p>Mobile Number: 09916588874</p>
            </li>
          </ul>
        </div>
        <!-- Menu Section -->
        <div class="col-md-3 mt-5" id="menu-section">
          <h5 class="text-uppercase font-weight-bold text-white">Menu</h5>
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/"
                :class="{
                  'link-white': $route.path !== '/',
                  'opacity-75': $route.path !== '/',
                  active: $route.path === '/',
                }"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/about"
                :class="{
                  'link-white': $route.path !== '/about',
                  'opacity-75': $route.path !== '/about',
                  active: $route.path === '/about',
                }"
                >About</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/register"
                :class="{
                  'link-white': $route.path !== '/register',
                  'opacity-75': $route.path !== '/register',
                  active: $route.path === '/register',
                }"
                >Register</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/login"
                :class="{
                  'link-white': $route.path !== '/login',
                  'opacity-75': $route.path !== '/login',
                  active: $route.path === '/login',
                }"
                >Login</router-link
              >
            </li>
          </ul>
        </div>
        <!-- Text Section -->
        <div class="col-md-5 mt-5" id="text-section">
          <p class="text-white opacity-75">
            Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum. At nam minimum ponderum. Est audiam animal
            molestiae te. Ex duo eripuit mentitum.
          </p>
        </div>
      </div>
      <!-- Bottom Footer -->
      <div
        class="d-flex justify-content-center text-white py-4"
        id="bottom-footer"
      >
        <p>© PlentyFull. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppFooter",
});
</script>

<style scoped lang="scss"></style>
