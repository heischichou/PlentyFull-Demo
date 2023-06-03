<template>
  <div class="dropdown">
    <button
      class="btn dropdown-toggle"
      :class="isOpen ? 'text-primary' : 'text-white'"
      @click="toggleNotifications"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <em class="bi bi-bell h5"></em>
    </button>
    <div
      class="dropdown-menu dropdown-menu-end bg-secondary shadow"
      style="width: 375px"
    >
      <li class="dropdown-header">
        <p class="fs-6 fw-semibold text-white m-0">Notifications</p>
      </li>
      <li class="dropdown-header">
        <button type="button" class="btn btn-white rounded-pill">All</button>
        <button type="button" class="btn btn-outline-white rounded-pill ms-2">
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
      isOpen: false,
    };
  },
  methods: {
    toggleNotifications(event: Event) {
      if (event) {
        let toggler = event.target as HTMLElement;
        toggler = toggler.parentElement as HTMLElement;
        this.isOpen = toggler.classList.contains("show") ? true : false;
      }
    },
  },
});
</script>

<style scoped lang="scss">
// .dropdown-menu-center {
//   right: auto;
//   left: 50%;
//   -webkit-transform: translate(-50%, 0);
//   -o-transform: translate(-50%, 0);
//   transform: translate(-50%, 0);
// }
</style>
