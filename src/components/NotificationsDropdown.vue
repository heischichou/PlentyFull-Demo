<template>
  <div class="dropdown">
    <button
      class="btn dropdown-toggle text-white"
      type="button"
      data-bs-toggle="dropdown"
      data-bs-auto-close="false"
      aria-expanded="false"
    >
      <em class="bi bi-bell h5"></em>
    </button>
    <div
      class="dropdown-menu dropdown-menu-end bg-secondary border-0 shadow me-n5"
      :style="{ width: windowWidth > 576 ? '400px' : '300px' }"
    >
      <li class="dropdown-header">
        <p class="fs-6 fw-semibold text-white m-0">Notifications</p>
      </li>
      <li class="dropdown-header">
        <button
          type="button"
          class="btn rounded-pill"
          :class="{
            'btn-white': filterByRead === false,
            'btn-outline-white': filterByRead === true,
          }"
          @click="$emit('updateFilter', false)"
        >
          All
        </button>
        <button
          type="button"
          class="btn rounded-pill ms-2"
          :class="{
            'btn-white': filterByRead === true,
            'btn-outline-white': filterByRead === false,
          }"
          @click="$emit('updateFilter', true)"
        >
          Unread
        </button>
      </li>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotificationsDropdown",
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  props: {
    filterByRead: {
      type: Boolean,
      default: false,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
});
</script>

<style scoped lang="scss">
.dropdown-toggler {
  transition: all 1s ease-in-out;
}
</style>
