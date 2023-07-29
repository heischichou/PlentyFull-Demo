<template>
  <AppHeader />
  <router-view :key="$route.path" />
  <AppFooter />
</template>

<script lang="ts">
import AppHeader from "@/components/App/AppHeader.vue";
import AppFooter from "@/components/App/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
