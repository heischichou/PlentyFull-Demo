<template>
  <div class="pt-5">
    <form action="" id="editProfile">
      <div class="mb-4">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          class="form-control border-lightgreen bg-header"
          id="name"
          aria-describedby="nameHelp"
        />
        <div id="nameHelp" class="form-text text-white opacity-50">
          Please provide your organization's name.
        </div>
      </div>

      <div class="mb-4">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control border-lightgreen bg-header"
          id="email"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text text-white opacity-50">
          Your email may be used as a source of contact for other organizations,
          we'll never share it with anyone else.
        </div>
      </div>

      <div class="mb-4">
        <label for="contact" class="form-label">Contact Number</label>
        <input
          type="text"
          class="form-control border-lightgreen bg-header"
          id="contact"
          aria-describedby="contactHelp"
        />
        <div id="contactHelp" class="form-text text-white opacity-50">
          Your contact number may be used as a source of contact for other
          organizations.
        </div>
      </div>

      <div class="mb-5">
        <label for="bio" class="form-label">Bio / Description</label>
        <textarea
          class="form-control mb-5 border-lightgreen bg-header"
          id="bio"
          rows="3"
        ></textarea>
      </div>

      <div class="border-bottom border-2 border-lightgreen pb-3 pt-5">
        <h4 class="pt-3">Present Location</h4>
      </div>

      <div class="mb-4 pt-5">
        <label for="streetAddress" class="form-label">Street Address</label>
        <input
          type="text"
          class="form-control border-lightgreen bg-header"
          id="streetAddress"
        />
      </div>

      <div class="mb-4">
        <label for="barangay" class="form-label">Barangay</label>
        <input
          type="text"
          class="form-control border-lightgreen bg-header"
          id="barangay"
        />
      </div>

      <div class="mb-4">
        <label for="municipality" class="form-label">Municipality</label>
        <input
          type="text"
          class="form-control border-lightgreen bg-header"
          id="municipality"
        />
      </div>

      <div class="mb-4">
        <label for="city" class="form-label">City</label>
        <input
          type="text"
          class="form-control border-lightgreen bg-header"
          id="city"
        />
      </div>

      <div class="mb-5">
        <label for="province" class="form-label">Province</label>
        <input
          type="text"
          class="form-control border-lightgreen bg-header"
          id="province"
        />
      </div>

      <div class="d-grid gap-3 d-md-flex justify-content-md-start py-3">
        <button type="submit" class="btn btn-primary rounded-0 py-2 px-4">
          Save Changes
        </button>
        <button type="reset" class="btn btn-outline-white rounded-0 py-2 px-4">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EditProfile",
});
</script>

<style scoped lang="scss"></style>
