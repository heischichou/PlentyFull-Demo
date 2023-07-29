<template>
  <div class="user card shadow-sm bg-white mb-5">
    <div class="card-body p-4">
      <div class="d-flex flex-row align-items-center justify-content-between">
        <div class="d-flex flex-row align-items-center">
          <div>
            <img
              :src="setURL(user.avatar)"
              :alt="user.username"
              class="avatar rounded-circle object-fit-cover text-white bg-dark"
            />
          </div>

          <div class="text-start ms-3">
            <h5 class="card-title fs-5">{{ user.username }}</h5>
            <h6 class="card-subtitle text-black-50 fs-6">
              {{ user.address }}
            </h6>
          </div>
        </div>

        <div class="d-flex gap-1">
          <button type="button" class="report-user btn py-0 px-1">
            <em class="bi bi-exclamation-triangle link-warning fs-2"></em>
          </button>
          <button type="button" class="geolocate btn py-0 px-1">
            <em class="bi bi-geo-alt fs-2 text-primary"></em>
          </button>
        </div>
      </div>
      <p class="bio text-justify lh-sm pt-4">
        {{ user.description }}
      </p>
      <div class="d-flex flex-column text-start">
        <div class="address d-flex mb-2">
          <em class="bi bi-geo-alt"></em>
          <p class="align-self-center ps-2 m-0">
            {{ user.address }}
          </p>
        </div>
        <div class="email d-flex mb-2">
          <em class="bi bi-envelope"></em>
          <a
            :href="`mailto:${user.email}`"
            class="align-self-center text-black ps-2 m-0"
            >{{ user.email }}</a
          >
        </div>
        <div class="contact d-flex mb-2">
          <em class="bi bi-telephone"></em>
          <p class="align-self-center ps-2 m-0">{{ user.contact }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FindComponent",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setURL(image: string): string {
      const urlcheck = /^(ftp|http|https):\/\/[^ "]+$/;
      return RegExp(urlcheck).exec(image)
        ? image
        : require("@/assets/images/Shared/" + image);
    },
  },
});
</script>

<style scoped lang="scss"></style>
