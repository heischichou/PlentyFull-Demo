<template>
  <div class="registrant card bg-transparent border border-green">
    <div class="card-body p-4">
      <h1 class="name card-title text-start text-white fs-3">
        {{ registrant.name }}
      </h1>
      <h5 class="type card-subtitle text-start text-white fs-6 fw-light mb-2">
        {{ registrant.type }}
      </h5>
      <h6
        class="dateDuration card-subtitle text-start text-white fs-6 fw-lighter"
      >
        {{ dateDuration }}
      </h6>
      <p class="bio text-white text-start mt-3">
        {{ registrant.bio }}
      </p>

      <div class="d-flex flex-column text-start">
        <div class="d-flex mb-2">
          <i class="bi bi-geo-alt text-white fs-5"></i>
          <p class="address align-self-center text-white ps-2 m-0">
            {{ registrant.address }}
          </p>
        </div>
        <a
          class="email link-white link-opacity-75-hover d-flex mb-2"
          :href="`mailto:${registrant.email}`"
          target="_blank"
        >
          <span class="bi bi-envelope fs-5"></span>
          <span class="align-self-center ps-2 m-0">{{ registrant.email }}</span>
        </a>
        <div class="d-flex mb-2">
          <i class="bi bi-telephone text-white fs-5"></i>
          <p class="contact align-self-center text-white ps-2 m-0">
            {{ registrant.contact }}
          </p>
        </div>
        <a
          class="proof link-white link-opacity-75-hover d-flex mb-2"
          :href="registrant.proof"
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
    registrant: {
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
