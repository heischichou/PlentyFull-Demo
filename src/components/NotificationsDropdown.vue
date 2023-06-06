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
      :style="{ width: windowWidth > 576 ? '425px' : '300px' }"
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
      <div class="overflow-auto" style="max-height: 290px">
        <li
          class="dropdown-item d-flex align-items-start align-content-center py-3"
          v-for="(item, index) in notifications"
          :key="item.notificationId"
          :index="index"
        >
          <div>
            <div
              class="bg-white rounded-pill me-3"
              style="height: 56px; width: 56px"
            ></div>
          </div>
          <div class="flex-grow-1 align-self-stretch text-white">
            <p
              class="text-wrap m-0"
              :class="{ 'opacity-75': item.read === true }"
            >
              <b class="fw-medium">{{ item.senderName }}</b>
              {{ item.message }}
            </p>
            <small
              :class="{
                'opacity-50': item.read === true,
                'opacity-75': item.read === false,
              }"
              >{{ item.createdAt }}</small
            >
          </div>
          <div>
            <!-- <div
              class="bg-white rounded-pill ms-3"
              style="height: 25px; width: 25px"
            ></div> -->
            <em
              class="bi text-white mt-3 ms-2 fs-3"
              :class="{
                'bi-eye-fill': item.read === true,
                'bi-eye': item.read === false,
              }"
            ></em>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
          report: {
            required: false,
            type: [Object, null],
            default: null,
          },
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
            required: false,
            type: [Object, null],
            default: {
              reportId: uuid.v1(),
              reportType: "Other",
              anonymous: true,
              resolved: false,
            },
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
          report: {
            required: false,
            type: [Object, null],
            default: null,
          },
        },
        {
          notificationId: uuid.v1(),
          senderId: uuid.v1(),
          senderName: "Hippodromo Barangay Hall",
          type: "Notification",
          message: "successfully received your donation.",
          createdAt: new Date().toDateString(),
          read: true,
          report: {
            required: false,
            type: [Object, null],
            default: null,
          },
        },
      ],
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

.dropdown-item:hover {
  background-color: #3eaf55;
}
</style>
