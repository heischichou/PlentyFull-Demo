<template>
  <div class="card shadow bg-white mb-4">
    <div class="card-body p-4">
      <div class="d-flex flex-row align-items-center justify-content-between">
        <div class="d-flex flex-row align-items-center">
          <img
            v-if="isURL(findResult.profileImage) === false"
            :src="require('../assets/images/Shared/' + findResult.profileImage)"
            :alt="findResult.username"
            class="component-img rounded-circle text-white bg-dark"
          />
          <img
            v-else
            :src="findResult.profileImage"
            :alt="findResult.username"
            class="component-img rounded-circle text-white bg-dark"
          />

          <div class="text-start ms-3">
            <h5 class="card-title fs-5">{{ findResult.username }}</h5>
            <h6 class="card-subtitle text-black-50 fs-6">
              {{ findResult.address }}
            </h6>
          </div>
        </div>

        <div class="d-flex gap-3">
          <a href="#"
            ><i class="bi bi-exclamation-triangle link-warning fs-2"></i
          ></a>
          <a href="#"><i class="bi bi-geo-alt fs-2"></i></a>
        </div>
      </div>
      <p class="text-start lh-sm pt-4">
        {{ findResult.description }}
      </p>
      <div class="d-flex flex-column text-start">
        <div class="d-flex mb-2">
          <i class="bi bi-geo-alt"></i>
          <p class="align-self-center ps-2 m-0">
            {{ findResult.address }}
          </p>
        </div>
        <div class="d-flex mb-2">
          <i class="bi bi-envelope"></i>
          <p class="align-self-center ps-2 m-0">{{ findResult.email }}</p>
        </div>
        <div class="d-flex mb-2">
          <i class="bi bi-telephone"></i>
          <p class="align-self-center ps-2 m-0">{{ findResult.contact }}</p>
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
    findResult: Object,
  },
  methods: {
    isURL(image: string) {
      const urlcheck = /^(ftp|http|https):\/\/[^ "]+$/;
      if (RegExp(urlcheck).exec(image)) {
        return true;
      } else {
        return false;
      }
    },
  },
});
</script>

<style scoped lang="scss">
.component-img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}
</style>
