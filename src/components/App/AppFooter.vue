<template>
  <footer class="bg-dark" id="footer" data-bs-theme="light">
    <div class="container text-md-left">
      <div class="row d-flex align-items-center flex-wrap border-bottom pb-3">
        <div class="col-md-3 mt-5" id="contact">
          <h5 class="text-uppercase font-weight-bold text-white mb-3">
            Contact
          </h5>
          <ul class="nav flex-column text-white opacity-75">
            <li v-for="item in items" :key="item" class="nav-item">
              <p>{{ item }}</p>
            </li>
          </ul>
        </div>

        <div class="col-md-3 mt-5" id="menu">
          <h5 class="text-uppercase font-weight-bold text-white">Menu</h5>
          <ul class="nav flex-column">
            <template v-if="role.length === 0">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  to="/"
                  :class="{
                    'link-white opacity-75': $route.path !== '/',
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
                    'link-white opacity-75': $route.path !== '/about',
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
                    'link-white opacity-75': $route.path !== '/register',
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
                    'link-white opacity-75': $route.path !== '/login',
                    active: $route.path === '/login',
                  }"
                  >Login</router-link
                >
              </li>
            </template>

            <template v-else>
              <template v-if="role === 'Donor' || role === 'Charity'">
                <template v-if="role === 'Donor'">
                  <li class="nav-item">
                    <router-link
                      class="nav-link"
                      to="/donate"
                      :class="{
                        'link-white opacity-75': $route.path !== '/donate',
                        active: $route.path === '/donate',
                      }"
                      >Donate</router-link
                    >
                  </li>
                </template>

                <template v-else>
                  <li class="nav-item">
                    <router-link
                      class="nav-link"
                      to="/receive"
                      :class="{
                        'link-white opacity-75': $route.path !== '/receive',
                        active: $route.path === '/receive',
                      }"
                      >Receive</router-link
                    >
                  </li>
                </template>

                <li class="nav-item">
                  <router-link
                    class="nav-link"
                    to="/find"
                    :class="{
                      'link-white opacity-75': $route.path !== '/find',
                      active: $route.path === '/find',
                    }"
                    >Find</router-link
                  >
                </li>
                <li v-if="role === 'Donor'" class="nav-item">
                  <router-link
                    class="nav-link"
                    to="/transactions"
                    :class="{
                      'link-white opacity-75': $route.path !== '/transactions',
                      active: $route.path === '/transactions',
                    }"
                    >Transactions</router-link
                  >
                </li>
                <li class="nav-item">
                  <router-link
                    class="nav-link"
                    to="/statistics"
                    :class="{
                      'link-white opacity-75': $route.path !== '/statistics',
                      active: $route.path === '/statistics',
                    }"
                    >Statistics</router-link
                  >
                </li>
              </template>

              <template v-else>
                <li class="nav-item">
                  <router-link
                    class="nav-link"
                    to="/statistics"
                    :class="{
                      'link-white opacity-75': $route.path !== '/statistics',
                      active: $route.path === '/statistics',
                    }"
                    >Statistics</router-link
                  >
                </li>
                <li class="nav-item">
                  <router-link
                    class="nav-link"
                    to="/registry"
                    :class="{
                      'link-white opacity-75': $route.path !== '/registry',
                      active: $route.path === '/registry',
                    }"
                    >Registry</router-link
                  >
                </li>
              </template>
            </template>
          </ul>
        </div>

        <div class="col-md-5 mt-5" id="textSection">
          <p class="text-white opacity-75">
            Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum. At nam minimum ponderum. Est audiam animal
            molestiae te. Ex duo eripuit mentitum.
          </p>
        </div>
      </div>

      <div
        class="d-flex justify-content-center text-white py-4"
        id="copyrights"
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
  data() {
    return {
      role: "Admin",
      items: [
        "City: Cebu City",
        "Zip Code: 6000",
        "Phone Number: (032)3333333",
        "Mobile Number: 09916588874",
      ] as string[],
    };
  },
});
</script>

<style scoped lang="scss"></style>
