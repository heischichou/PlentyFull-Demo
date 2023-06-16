<template>
  <div class="profile bg-header">
    <div class="container text-white text-start pt-5 ps-5 pb-3">
      <h1 class="fw-bold ps-3">Settings</h1>
    </div>
    <div class="container-md">
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div
            class="col-auto col-lg-3 border-bottom border-2 border-lightgreen pb-3"
          >
            <ul class="nav nav-pills flex-column mt-4">
              <li class="nav-item">
                <a href="#" class="nav-link text-white text-start active">
                  <em class="bi bi-person-circle fs-5"></em
                  ><span
                    class="fs-5 d-md-block d-md-none d-sm-none d-lg-inline ms-3"
                    >Profile</span
                  >
                </a>
              </li>
              <li class="nav-item pt-3">
                <a href="#" class="nav-link text-white text-start">
                  <em class="bi bi-shield-check fs-5"></em
                  ><span
                    class="fs-5 d-md-block d-md-none d-sm-none d-lg-inline ms-3"
                    >Security</span
                  >
                </a>
              </li>
            </ul>
          </div>

          <div class="col col-lg-7 py-5 px-0 px-lg-5 text-white text-start">
            <div class="border-bottom border-2 border-lightgreen pb-3">
              <h4 class="pt-3">Personal Profile</h4>
            </div>
            <div class="pt-5">
              <form>
                <div class="mb-4">
                  <label for="NameInput" class="form-label">Name</label>
                  <input
                    type="text"
                    class="form-control border-lightgreen bg-header"
                    id="NameInput"
                    aria-describedby="nameHelp"
                  />
                  <div id="nameHelp" class="form-text text-white opacity-50">
                    We'll never share your email with anyone else.
                  </div>
                </div>

                <div class="mb-4">
                  <label for="EmailInput" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control border-lightgreen bg-header"
                    id="EmailInput"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" class="form-text text-white opacity-50">
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
                    id="ContactInput"
                    aria-describedby="contactHelp"
                  />
                  <div id="contactHelp" class="form-text text-white opacity-50">
                    Your contact number may be used as a source of contact for
                    other organizations
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

                <div class="border-bottom border-2 border-lightgreen pb-3 pt-5">
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
                  <label for="BarangayInput" class="form-label">Barangay</label>
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

                <div class="mb-4">
                  <label for="ProvinceInput" class="form-label">Province</label>
                  <input
                    type="text"
                    class="form-control border-lightgreen bg-header"
                    id="ProvinceInput"
                  />
                </div>
              </form>
            </div>
          </div>

          <div class="col col-sm-2 text-white text-start ps-5">
            <em class="bi bi-person-circle fs-1"></em>
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
});
</script>

<style lang="scss">
// div {
//   outline-width: 2px;
//   outline-style: solid;
//   outline-color: white;
// }

.nav-pills li a:hover {
  background-color: rgba($color: lightgreen, $alpha: 0.4);
}
</style>
