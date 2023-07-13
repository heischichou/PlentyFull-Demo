<template>
  <div class="card bg-transparent border border-green">
    <div class="card-body p-4">
      <h1 class="card-title text-start text-white fs-3">
        {{ request.requestName }}
      </h1>
      <h5 class="card-subtitle text-start text-white fs-6 fw-light mb-2">
        {{ request.organizationType }}
      </h5>
      <h6 class="card-subtitle text-start text-white fs-6 fw-lighter">
        {{ dateDuration }}
      </h6>
      <p class="text-white text-start mt-3">
        {{ request.description }}
      </p>

      <div class="d-flex flex-column text-start">
        <div class="d-flex mb-2">
          <i class="bi bi-geo-alt text-white fs-5"></i>
          <p class="align-self-center text-white ps-2 m-0">
            {{ request.location }}
          </p>
        </div>
        <div class="d-flex mb-2">
          <i class="bi bi-envelope text-white fs-5"></i>
          <p class="align-self-center text-white ps-2 m-0">
            {{ request.email }}
          </p>
        </div>
        <div class="d-flex mb-2">
          <i class="bi bi-telephone text-white fs-5"></i>
          <p class="align-self-center text-white ps-2 m-0">
            {{ request.phone }}
          </p>
        </div>
        <a
          class="link-white link-opacity-75-hover d-flex mb-2"
          :href="request.proof"
          target="_blank"
        >
          <span class="bi bi-patch-check fs-5"></span>
          <span class="align-self-center ps-2 m-0"
            >View Proof of Authenticity</span
          >
        </a>
        <div class="d-grid gap-3 d-md-flex justify-content-md-end">
          <button
            type="button"
            class="btn btn-primary text-white fw-medium rounded-0 py-2 px-3"
          >
            Accept
          </button>
          <button
            type="button"
            class="btn btn-outline-danger fw-medium rounded-0 py-2 px-3"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SignUpRequest",
  props: {
    request: {
      type: Object,
      required: true,
    },
    dateDuration: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped></style>
