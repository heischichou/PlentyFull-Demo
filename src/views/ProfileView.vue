<template>
  <div class="profile bg-header">
    <div class="container text-white text-start pt-5 ps-5 pb-3" id="header">
      <h1 class="fw-bold ps-3">Settings</h1>
    </div>
    <div class="container-md">
      <div class="container-fluid">
        <div class="row d-flex">
          <div class="col col-auto order-first col-lg-3 pb-3 px-0" id="nav-bar">
            <ul class="nav nav-pills flex-column mt-4">
              <li
                class="nav-item"
                id="profile-button"
                v-on:click="profileView(true, false)"
                :class="profile ? 'nav-active' : ''"
              >
                <a
                  href="#"
                  class="nav-link nav-highlight text-white text-start"
                >
                  <em class="bi bi-person-circle fs-5"></em
                  ><span class="fs-5 d-none d-block d-lg-inline ms-3"
                    >Profile</span
                  >
                </a>
              </li>
              <li
                class="nav-item mt-3"
                id="security-button"
                v-on:click="profileView(false, true)"
                :class="security ? 'nav-active' : ''"
              >
                <a
                  href="#"
                  class="nav-link nav-highlight text-white text-start"
                >
                  <em class="bi bi-shield-check fs-5"></em
                  ><span class="fs-5 d-none d-block d-lg-inline ms-3"
                    >Security</span
                  >
                </a>
              </li>
              <li class="border-bottom border-2 border-lightgreen pt-3"></li>
            </ul>
          </div>

          <div class="col col-md-9 d-flex pb-3">
            <div class="row">
              <div
                class="col-3 col-lg-3 order-first order-md-last text-white text-start"
                id="profile-picture"
              >
                <div class="container">
                  <img
                    src="@/assets/images/Shared/random_profile.jpg"
                    class="be-round"
                  />
                  <div class="d-flex position-relative mt-n5 ng-pd">
                    <input type="file" id="selectedFile" />
                    <button
                      type="button"
                      class="btn p-3 bg-secondary rounded-circle d-flex justify-content-center align-items-center"
                      id="profile-pic-button"
                      style="width: 50px; height: 50px"
                      onclick="document.getElementById('selectedFile').click();"
                    >
                      <em class="bi bi-camera bg-secondary fs-4 m-0 p-0"></em>
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="col-auto col-md-9 text-white text-start py-lg-5 px-lg-5"
                id="view-profile"
                v-if="profile == true"
              >
                <div class="border-bottom border-2 border-lightgreen pb-3">
                  <h4 class="pt-3">Personal Profile</h4>
                </div>
                <div class="pt-5">
                  <form id="profile-form">
                    <div class="mb-4">
                      <label for="NameInput" class="form-label">Name</label>
                      <input
                        type="text"
                        class="form-control border-lightgreen bg-header"
                        id="NameInput"
                        aria-describedby="nameHelp"
                      />
                      <div
                        id="nameHelp"
                        class="form-text text-white opacity-50"
                      >
                        We'll never share your email with anyone else.
                      </div>
                    </div>

                    <div class="mb-4">
                      <label for="EmailInput" class="form-label">Email</label>
                      <input
                        type="email"
                        class="form-control border-lightgreen bg-header"
                        id="emailInput"
                        aria-describedby="emailHelp"
                      />
                      <div
                        id="emailHelp"
                        class="form-text text-white opacity-50"
                      >
                        Your email may be used as a source of contact for other
                        organizations
                      </div>
                    </div>

                    <div class="mb-4">
                      <label for="ContactInput" class="form-label"
                        >Contact Number</label
                      >
                      <input
                        type="email"
                        class="form-control border-lightgreen bg-header"
                        id="contactInput"
                        aria-describedby="contactHelp"
                      />
                      <div
                        id="contactHelp"
                        class="form-text text-white opacity-50"
                      >
                        Your contact number may be used as a source of contact
                        for other organizations
                      </div>
                    </div>

                    <div class="mb-5">
                      <label for="BioInput" class="form-label"
                        >Bio/Description</label
                      >
                      <textarea
                        class="form-control mb-5 border-lightgreen bg-header"
                        id="BioInput"
                        rows="3"
                      ></textarea>
                    </div>

                    <div
                      class="border-bottom border-2 border-lightgreen pb-3 pt-5"
                    >
                      <h4 class="pt-3">Present Location</h4>
                    </div>

                    <div class="mb-4 pt-5">
                      <label for="StreetAddress" class="form-label"
                        >Street Address</label
                      >
                      <input
                        type="text"
                        class="form-control border-lightgreen bg-header"
                        id="StreetAddress"
                      />
                    </div>

                    <div class="mb-4">
                      <label for="BarangayInput" class="form-label"
                        >Barangay</label
                      >
                      <input
                        type="text"
                        class="form-control border-lightgreen bg-header"
                        id="BarangayInput"
                      />
                    </div>

                    <div class="mb-4">
                      <label for="Municipality Input" class="form-label"
                        >Municipality</label
                      >
                      <input
                        type="text"
                        class="form-control border-lightgreen bg-header"
                        id="Municipality Input"
                      />
                    </div>

                    <div class="mb-4">
                      <label for="CityInput" class="form-label">City</label>
                      <input
                        type="text"
                        class="form-control border-lightgreen bg-header"
                        id="CityInput"
                      />
                    </div>

                    <div class="mb-5">
                      <label for="ProvinceInput" class="form-label"
                        >Province</label
                      >
                      <input
                        type="text"
                        class="form-control border-lightgreen bg-header"
                        id="ProvinceInput"
                      />
                    </div>

                    <div
                      class="d-grid gap-3 d-md-flex justify-content-md-start py-3"
                    >
                      <button
                        type="submit"
                        class="btn btn-primary rounded-0 py-2 px-4"
                      >
                        Save Changes
                      </button>
                      <button
                        type="submit"
                        class="btn btn-outline-white rounded-0 py-2 px-4"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div
                class="col-auto col-md-9 text-white text-start py-lg-5 px-lg-5"
                id="view-security"
                v-else-if="security == true"
              >
                <div class="border-bottom border-2 border-lightgreen pb-3">
                  <h4 class="pt-3">Security</h4>
                </div>
                <div class="pt-5">
                  <form id="security-form">
                    <div class="mb-4">
                      <label for="OldPass" class="form-label"
                        >Old Password</label
                      >
                      <input
                        type="password"
                        class="form-control border-lightgreen bg-header"
                        id="OldPass"
                        aria-describedby="oldPassHelp"
                      />
                      <div
                        id="oldPassHelp"
                        class="form-text text-white opacity-50"
                      >
                        Please enter your old password
                      </div>
                    </div>

                    <div class="mb-4">
                      <label for="NewPass" class="form-label"
                        >New Password</label
                      >
                      <input
                        type="password"
                        class="form-control border-lightgreen bg-header"
                        id="NewPass"
                        aria-describedby="newPassHelp"
                      />
                      <div
                        id="newPassHelp"
                        class="form-text text-white opacity-50"
                      >
                        Contains at least 8 characters including a number and a
                        special character.
                      </div>
                    </div>

                    <div class="mb-4">
                      <label for="ConfirmPass" class="form-label"
                        >Confirm New Password</label
                      >
                      <input
                        type="password"
                        class="form-control border-lightgreen bg-header"
                        id="ConfirmPass"
                        aria-describedby="confirmPassHelp"
                      />
                      <div
                        id="confirmPassHelp"
                        class="form-text text-white opacity-50"
                      >
                        Re-enter your New Password
                      </div>
                    </div>
                    <div
                      class="d-grid gap-3 d-md-flex justify-content-md-start py-3"
                    >
                      <button
                        type="submit"
                        class="btn btn-primary rounded-0 py-2 px-4"
                      >
                        Update Password
                      </button>
                      <button
                        type="submit"
                        class="btn btn-outline-white rounded-0 py-2 px-4"
                      >
                        Cancel
                      </button>
                    </div>

                    <div
                      class="border-bottom border-2 border-lightgreen pb-3 pt-5"
                    >
                      <h4 class="pt-3">Login</h4>
                    </div>
                    <div class="form-check form-switch form-check-reverse pt-5">
                      <input
                        class="form-check-input px-4 bg-header"
                        type="checkbox"
                        id="flexSwitchCheckReverse"
                      />
                      <label
                        class="form-check-label d-flex justify-content-start"
                        for="flexSwitchCheckReverse"
                        >Save your Login information</label
                      >
                    </div>

                    <div
                      class="border-bottom border-2 border-lightgreen pb-3 pt-5"
                    >
                      <h4 class="pt-3">Delete My Account</h4>
                    </div>
                    <p class="pt-5 pb-3">
                      Deleting your account removes your access to this account
                      and all of its information. Are you sure?
                    </p>
                    <div
                      class="d-grid gap-3 d-md-flex justify-content-md-start py-3"
                    >
                      <button
                        type="button"
                        class="btn d-grid gap-3 d-md-flex bg-danger text-white rounded-0 py-2 px-4"
                        id="modal-button"
                        data-bs-toggle="modal"
                        data-bs-target="#confirmModal"
                      >
                        Delete My Account
                      </button>
                    </div>

                    <div
                      class="modal fade"
                      id="confirmModal"
                      tabindex="-1"
                      aria-labelledby="confirmModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content text-black rounded-2">
                          <div class="modal-header">
                            <h1
                              class="modal-title fs-5 ps-3"
                              id="confirmModalLabel"
                            >
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
                                >Please enter your password to confirm this
                                action.</label
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
                            <button
                              type="submit"
                              class="btn bg-danger text-white rounded-0"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfileView",
  data() {
    return {
      profile: true,
      security: false,
    };
  },
  methods: {
    profileView(profile: boolean, security: boolean) {
      this.profile = profile;
      this.security = security;
    },
  },
});
</script>

<style lang="scss">
// div {
//   outline-width: 2px;
//   outline-style: solid;
//   outline-color: white;
// }

.nav-highlight {
  &:hover,
  &:active {
    background-color: rgba($color: lightgreen, $alpha: 0.4);
    border-radius: 0;

    &:active {
      border-right: 10px solid rgba($color: lightgreen, $alpha: 1);
    }
  }
}

.nav-active {
  background-color: rgba($color: #45bf5d, $alpha: 0.4);
  border-right: 10px solid rgba($color: lightgreen, $alpha: 1);
}

.be-round {
  border-radius: 50%;
  max-width: 140px;
  max-height: 140px;
}

#selectedFile {
  display: none;
}

.ng-pd {
  padding-left: 95px;
}
</style>
