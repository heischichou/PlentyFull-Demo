<template>
  <b-nav small align="center">
    <!-- Check if user is logged in -->
    <template v-if="role.length === 0">
      <b-nav-item active>
        <router-link to="/">Home</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/about">About</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/register">Register</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/login">Login</router-link>
      </b-nav-item>
    </template>
    <template v-else>
      <!-- Check if user is either a Donor or Charity -->
      <template v-if="role === 'Donor' || role === 'Charity'">
        <!-- Check if user is a Donor -->
        <template v-if="role === 'Donor'">
          <b-nav-item active>
            <router-link to="/donate">Donate</router-link>
          </b-nav-item>
        </template>
        <!-- Else, if user is a Charity -->
        <template v-else>
          <b-nav-item active>
            <router-link to="/receive">Receive</router-link>
          </b-nav-item>
        </template>
        <!-- Shared router links -->
        <b-nav-item>
          <router-link to="/find">Find</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/transactions">Transactions</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/statistics">Statistics</router-link>
        </b-nav-item>
      </template>
      <!-- Else, if user is an Admin -->
      <template v-else>
        <b-nav-item>
          <router-link to="/statistics">Statistics</router-link>
        </b-nav-item>
        <b-nav-item active>
          <router-link to="/registry">Registry</router-link>
        </b-nav-item>
      </template>
      <!-- Shared router links -->
      <b-nav-item>
        <router-link to="/profile">Profile</router-link>
      </b-nav-item>
    </template>
  </b-nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",
  data() {
    return {
      role: "",
    };
  },
});
</script>
