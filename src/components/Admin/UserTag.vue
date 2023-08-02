<template>
  <div
    :id="id"
    class="d-flex align-items-center rounded-pill border border-dark px-2 my-0"
  >
    <i class="bi bi-person-circle"></i>
    <span class="ms-2">{{ name }}</span>
    <button
      type="button"
      class="ms-2 btn-close"
      aria-label="Close"
      @click="removeSelected"
    ></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserTag",
  props: {
    id: {
      type: String,
    },
    userId: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  methods: {
    removeSelected() {
      this.$emit("removeSelected", this.userId);
    },
  },
});
</script>

<style lang="scss" scoped>
.btn-close {
  width: 0.25em;
  height: 0.25em;
}
</style>
