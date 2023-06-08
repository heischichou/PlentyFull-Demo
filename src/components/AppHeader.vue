<template>
  <nav id="nav" class="navbar navbar-expand-md bg-dark" data-bs-theme="light">
    <div
      class="container-fluid container-lg d-flex flex-row justify-content-end justify-content-md-between bg-transparent"
    >
      <Notifications v-if="role.length > 0" class="d-block d-md-none" />
      <button
        class="navbar-toggler border-primary my-2 me-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <em class="bi bi-list text-primary d-flex fs-3"></em>
      </button>
      <div
        class="flex-row align-items-center collapse navbar-collapse text-center bg-transparent m-3"
        id="navbarNav"
      >
        <div class="d-none d-md-block">
          <h4 class="text-primary m-0">PLENTYFULL</h4>
        </div>
        <ul class="w-100 navbar-nav justify-content-center">
          <template v-if="role.length === 0">
            <li class="nav-item px-2 px-lg-4">
              <router-link
                class="nav-link"
                to="/"
                :class="{ active: $route.path === '/' }"
                >Home</router-link
              >
            </li>
            <li class="nav-item px-2 px-lg-4">
              <router-link
                class="nav-link"
                to="/about"
                :class="{ active: $route.path === '/about' }"
                >About</router-link
              >
            </li>
            <li class="nav-item px-2 px-lg-4">
              <router-link
                class="nav-link"
                to="/register"
                :class="{ active: $route.path === '/register' }"
                >Register</router-link
              >
            </li>
            <li class="nav-item px-2 px-lg-4">
              <router-link
                class="nav-link"
                to="/login"
                :class="{ active: $route.path === '/login' }"
                >Login</router-link
              >
            </li>
          </template>

          <template v-else>
            <template v-if="role === 'Donor' || role === 'Charity'">
              <template v-if="role === 'Donor'">
                <li class="nav-item px-2 px-lg-4">
                  <router-link
                    class="nav-link"
                    to="/donate"
                    :class="{ active: $route.path === '/donate' }"
                    >Donate</router-link
                  >
                </li>
              </template>

              <template v-else>
                <li class="nav-item px-2 px-lg-4">
                  <router-link
                    class="nav-link"
                    to="/receive"
                    :class="{ active: $route.path === '/receive' }"
                    >Receive</router-link
                  >
                </li>
              </template>

              <li class="nav-item px-2 px-lg-4">
                <router-link class="nav-link" to="/find">Find</router-link>
              </li>
              <li class="nav-item px-2 px-lg-4">
                <router-link
                  class="nav-link"
                  to="/transactions"
                  :class="{ active: $route.path === '/transactions' }"
                  >Transactions</router-link
                >
              </li>
              <li class="nav-item px-2 px-lg-4">
                <router-link
                  class="nav-link"
                  to="/statistics"
                  :class="{ active: $route.path === '/statistics' }"
                  >Statistics</router-link
                >
              </li>
            </template>

            <template v-else>
              <li class="nav-item px-2 px-lg-4">
                <router-link
                  class="nav-link"
                  to="/statistics"
                  :class="{ active: $route.path === '/statistics' }"
                  >Statistics</router-link
                >
              </li>
              <li class="nav-item px-2 px-lg-4">
                <router-link
                  class="nav-link"
                  to="/registry"
                  :class="{ active: $route.path === '/registry' }"
                  >Registry</router-link
                >
              </li>
            </template>

            <li class="nav-item d-block d-md-none px-2 px-lg-4">
              <router-link
                class="nav-link"
                to="/profile"
                :class="{ active: $route.path === '/profile' }"
                >Profile</router-link
              >
            </li>
            <li class="nav-item d-block d-md-none px-2 px-lg-4">
              <router-link class="nav-link" to="/">Log Out</router-link>
            </li>
          </template>
        </ul>
        <Notifications v-if="role.length > 0" class="d-none d-md-block" />
        <div class="dropdown d-none d-md-block" v-if="role.length !== 0">
          <button
            class="btn dropdown-toggle"
            :class="{
              'text-primary': $route.path === '/profile',
              'text-white': $route.path !== '/profile',
            }"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <em class="bi bi-person-circle h5"></em>
          </button>
          <div class="dropdown-menu dropdown-menu-end">
            <router-link class="dropdown-item" to="/profile"
              >Profile</router-link
            >
            <router-link class="dropdown-item" to="/">Log Out</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Notifications from "./NotificationsDropdown.vue";

export default defineComponent({
  name: "AppHeader",
  data() {
    return {
      role: "",
    };
  },
  components: {
    Notifications,
  },
});
</script>

<style scoped lang="scss"></style>
