<template>
  <div class="pt-5">
    <form action="" id="securityAndLogin">
      <div class="mb-4">
        <label for="oldPassword" class="form-label">Old Password</label>
        <input
          type="password"
          class="form-control border-lightgreen bg-header"
          id="oldPassword"
          aria-describedby="oldPasswordHelp"
        />
        <div id="oldPasswordHelp" class="form-text text-white opacity-50">
          Please enter your old password.
        </div>
      </div>

      <div class="mb-4">
        <label for="newPassword" class="form-label">New Password</label>
        <input
          type="password"
          class="form-control border-lightgreen bg-header"
          id="newPassword"
          aria-describedby="newPasswordHelp"
        />
        <div id="newPasswordHelp" class="form-text text-white opacity-50">
          Your new passwrod must contains at least 8 characters including a
          number and a special character.
        </div>
      </div>

      <div class="mb-4">
        <label for="confirmPassword" class="form-label"
          >Confirm New Password</label
        >
        <input
          type="password"
          class="form-control border-lightgreen bg-header"
          id="confirmPassword"
          aria-describedby="confirmPasswordHelp"
        />
        <div id="confirmPasswordHelp" class="form-text text-white opacity-50">
          Re-enter your New Password
        </div>
      </div>
      <div class="d-grid gap-3 d-md-flex justify-content-md-start py-3">
        <button type="submit" class="btn btn-primary rounded-0 py-2 px-4">
          Update Password
        </button>
        <button type="submit" class="btn btn-outline-white rounded-0 py-2 px-4">
          Cancel
        </button>
      </div>

      <div class="border-bottom border-2 border-lightgreen pb-3 pt-5">
        <h4 class="pt-3">Login</h4>
      </div>
      <div class="form-check form-switch form-check-reverse pt-5">
        <input
          class="form-check-input px-4 bg-header"
          type="checkbox"
          role="switch"
          id="saveLogin"
          checked
        />
        <label
          class="form-check-label d-flex justify-content-start"
          for="saveLogin"
          >Save your Login information</label
        >
      </div>

      <div class="border-bottom border-2 border-lightgreen pb-3 pt-5">
        <h4 class="pt-3">Delete My Account</h4>
      </div>
      <p class="pt-5 pb-3">
        Deleting your account removes your access to this account and all of its
        information. Are you sure?
      </p>
      <div class="d-grid gap-3 d-md-flex justify-content-md-start py-3">
        <button
          type="button"
          class="btn btn-danger d-grid gap-3 d-md-flex text-white rounded-0 py-2 px-4"
          id="deleteAccount"
          data-bs-toggle="modal"
          data-bs-target="#confirmDeletion"
        >
          Delete My Account
        </button>
      </div>

      <div
        class="modal fade"
        id="confirmDeletion"
        tabindex="-1"
        aria-labelledby="confirmDeletionlLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content text-black rounded-2">
            <div class="modal-header">
              <h1 class="modal-title fs-5 ps-3" id="confirmDeletionLabel">
                Delete Account
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-4 p-3">
                <label for="confimation" class="form-label"
                  >Please enter your password to confirm this action.</label
                >
                <input
                  type="password"
                  class="form-control border-dark"
                  id="confirmation"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-dark rounded-0"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="submit" class="btn btn-danger text-white rounded-0">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SecurityAndLogin",
});
</script>

<style scoped lang="scss"></style>
