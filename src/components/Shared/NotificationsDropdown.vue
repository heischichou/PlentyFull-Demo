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
      class="dropdown-menu dropdown-menu-end border-0 shadow me-n5"
      :style="{ width: windowWidth > 576 ? '425px' : '300px' }"
    >
      <li class="dropdown-header">
        <p class="fs-6 fw-semibold text-white m-0">Notifications</p>
      </li>
      <li class="dropdown-header">
        <button
          type="button"
          class="btn rounded-pill"
          :class="filterByRead ? 'btn-outline-white' : 'btn-white'"
          @click="$emit('updateFilter', false)"
        >
          All
        </button>
        <button
          type="button"
          class="btn rounded-pill ms-2"
          :class="filterByRead ? 'btn-white' : 'btn-outline-white'"
          @click="$emit('updateFilter', true)"
        >
          Unread
        </button>
      </li>
      <div class="overflow-auto" style="max-height: 290px">
        <li
          class="dropdown-item notification d-flex align-items-start align-content-center py-3"
          v-for="(item, index) in filteredNotifications"
          :key="item.notificationId"
          :index="index"
        >
          <div>
            <div class="avatar bg-white rounded-pill me-3"></div>
          </div>
          <div class="flex-grow-1 align-self-stretch text-white">
            <p
              class="text-wrap m-0"
              :class="{ 'opacity-75': item.read === true }"
            >
              <b class="fw-medium">{{ item.senderName }}</b>
              {{ item.message }}
            </p>
            <small :class="item.read === true ? 'opacity-50' : 'opacity-75'">{{
              item.createdAt
            }}</small>
          </div>
          <div>
            <em
              class="bi text-white mt-3 ms-2 fs-3"
              :class="item.read === true ? 'bi-eye-fill' : 'bi-eye'"
            ></em>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Notification } from "@/types";
import { uuid } from "vue-uuid";

export default defineComponent({
  name: "NotificationsDropdown",
  data() {
    return {
      windowWidth: window.innerWidth,
      notifications: [
        {
          notificationId: uuid.v1(),
          senderId: uuid.v1(),
          senderName: "Cebu Food Bank",
          type: "Notification",
          message: "has accepted your donation reception.",
          createdAt: new Date().toDateString(),
          read: false,
        },
        {
          notificationId: uuid.v1(),
          senderId: uuid.v1(),
          senderName: "Anonymous",
          type: "Report",
          message: "has reported you.",
          createdAt: new Date().toDateString(),
          read: false,
          report: {
            reportId: uuid.v1(),
            reportType: "Other",
            anonymous: true,
            resolved: false,
          },
        },
        {
          notificationId: uuid.v1(),
          senderId: uuid.v1(),
          senderName: "JPIC-IDC Inc.",
          type: "Notification",
          message: "successfully received your donation.",
          createdAt: new Date().toDateString(),
          read: true,
        },
        {
          notificationId: uuid.v1(),
          senderId: uuid.v1(),
          senderName: "Hippodromo Barangay Hall",
          type: "Notification",
          message: "successfully received your donation.",
          createdAt: new Date().toDateString(),
          read: true,
        },
      ] as unknown as Notification[],
      filteredNotifications: [] as Notification[],
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
    onResize(): void {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.filteredNotifications = Object.assign([], this.notifications);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  watch: {
    filterByRead: function (data): void {
      if (data) {
        this.filteredNotifications = this.notifications.filter(
          (item: Notification) => item.read === false
        );
      } else {
        this.filteredNotifications = Object.assign([], this.notifications);
      }
    },
  },
});
</script>

<style scoped lang="scss">
.notification .avatar {
  width: 56px;
  height: 56px;
}

.dropdown-toggler {
  transition: all 1s ease-in-out;
}

.dropdown-menu {
  background-color: #25c446;
}

.dropdown-item:hover {
  background-color: #22b33f;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #4ad471;
  border-radius: 50rem !important;
}

::-webkit-scrollbar-thumb {
  background: #56f576;
  border-radius: 50rem !important;
}
</style>
