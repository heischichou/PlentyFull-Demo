<template>
  <div
    class="modal fade bg-secondary"
    id="searchingForCharities"
    tabindex="-1"
    data-bs-keyboard="false"
    aria-hidden="false"
  >
    <div class="modal-dialog modal-fullscreen text-white">
      <div
        class="modal-content container-fluid bg-transparent d-flex flex-column justify-content-center align-items-center"
      >
        <div
          class="align-self-center mb-4"
          :class="{
            'pb-4': foundQueuers === false,
            'mb-5': windowWidth > 768 && foundQueuers === false,
          }"
        >
          <svg
            v-if="foundQueuers"
            xmlns="http://www.w3.org/2000/svg"
            :width="windowWidth > 768 ? 250 : 150"
            :height="windowWidth > 768 ? 250 : 150"
            fill="currentColor"
            class="bi bi-check-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
            />
          </svg>
          <BreedingRhombusSpinner
            v-else
            :animation-duration="2000"
            :size="windowWidth > 768 ? 200 : 125"
            color="#ffffff"
          />
        </div>
        <p
          class="text-center fw-semibold mb-2"
          :class="windowWidth > 768 ? 'h2' : 'h3'"
        >
          {{ foundQueuers ? "Found Receivers" : "Searching..." }}
        </p>
        <p class="fw-normal" :class="windowWidth > 768 ? 'h6' : 'fs-6'">
          {{
            foundQueuers
              ? "You may proceed to the donation queue now."
              : "Looking for receivers."
          }}
        </p>
        <div class="d-flex flex-row fw-medium mt-0 mt-md-3 fs-5">
          <em class="bi bi-stopwatch"></em>
          <p class="ms-2 mb-0">Please wait.</p>
        </div>
        <div class="d-flex flex-column flex-md-row gap-3 mt-4">
          <button
            v-if="foundQueuers"
            type="button"
            class="btn btn-white p-3 rounded-0"
            data-bs-toggle="modal"
            data-bs-target="#donationQueue"
          >
            View Queue
          </button>
          <button
            v-else
            type="button"
            class="btn btn-white p-3 rounded-0"
            data-bs-dismiss="modal"
          >
            Go back
          </button>
          <button
            type="button"
            class="btn btn-outline-white p-3 rounded-0"
            data-bs-dismiss="modal"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BreedingRhombusSpinner } from "epic-spinners";

export default defineComponent({
  name: "SearchingFor",
  props: {
    windowWidth: {
      type: Number,
      required: true,
    },
    foundQueuers: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    BreedingRhombusSpinner,
  },
});
</script>

<style scoped lang="scss"></style>
