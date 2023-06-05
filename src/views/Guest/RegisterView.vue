<template>
  <div class="container-fluid bg-header" id="header">
    <div class="row d-flex align-items-center g-5 py-5">
      <div class="col-lg-6 px-6">
        <h2 class="text-white fw-bold display-5 mb-5">
          Help us feed peeps all around Cebu!
        </h2>
        <p class="text-white">
          Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
          no suscipit quaerendum. At nam minimum ponderum. Est audiam animal
          molestiae te. Ex duo eripuit mentitum.
        </p>
        <div class="d-grid gap-3 d-md-flex justify-content-md-center mt-5">
          <button type="button" class="btn btn-primary rounded-0" id="get-started-btn">
            Get Started
          </button>
          <button type="button" class="btn btn-outline-primary rounded-0" id="learn-more-btn">
            Learn More
          </button>
        </div>
      </div>
      <div class="col-lg-6 container-fluid">
        <img
          class="img-fluid"
          src="../../assets/Register_Image.svg"
          alt="Register_Image"
        />
      </div>
    </div>
  </div>
  <div class="container bg-white border border-secondary border-2 my-5" id="register-form">
    <form>
      <div class="row">
        <div class="col-lg-6 bg-white p-5" id="general-info-section">
          <h3 class="text-secondary mb-5">General Information</h3>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter name here"
            />
            <label for="name">Name</label>
          </div>
          <div class="form-floating mb-3">
            <textarea
              type="text"
              class="form-control description-height"
              id="description"
              placeholder="Enter Description Here"
              style="height: 135px"
            />
            <label for="description">Description</label>
          </div>
          <div class="form-floating mb-3">
            <select
              type="text"
              class="form-select"
              id="organizationType"
              placeholder="Select Organization Type"
            >
              <option value="0" selected>Donor</option>
              <option value="1">Charity</option>
            </select>
            <label for="organizationtype">Organization Type</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter password here"
            />
            <label for="password">Password</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="password2"
              placeholder="Re-enter password here"
            />
            <label for="password2">Re-enter Password</label>
          </div>

          <div class="d-flex align-content-start">
            <label for="fileInput" class="mb-2">Proof of Verification</label>
          </div>
          <div class="input-group custom-file-button mb-3">
            <label
              class="input-group-text text-white bg-secondary"
              for="fileInput"
              >Browse</label
            >
            <input type="file" class="form-control" id="fileInput" />
          </div>
        </div>

        <div class="col-lg-6 transparent-input bg-secondary p-5" id="present-location-section">
          <h3 class="text-white mb-5">Present Location</h3>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control text-white"
              id="contact"
              placeholder="Enter contact number here"
            />
            <label for="contact" class="text-white">Contact Number</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control text-white"
              id="email"
              placeholder="Enter email here"
            />
            <label for="email" class="text-white">E-mail</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control text-white"
              id="streetAdd"
              placeholder="Enter street address here"
            />
            <label for="streetAdd" class="text-white">Street Address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control text-white"
              id="barangay"
              placeholder="Enter barangay here"
            />
            <label for="barangay" class="text-white">Barangay</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control text-white"
              id="municipality"
              placeholder="Enter municipality here"
            />
            <label for="municipality" class="text-white">Municipality</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control text-white"
              id="city"
              placeholder="Enter City here"
            />
            <label for="city" class="text-white">City</label>
          </div>
          <div class="form-floating mb-4">
            <input
              type="text"
              class="form-control text-white"
              id="province"
              placeholder="Enter province here"
            />
            <label for="province" class="text-white">Province</label>
          </div>
          <div class="form-check d-flex align-items-start gap-3 mb-4">
            <input
              type="checkbox"
              class="form-check-input"
              value=""
              id="checkBox"
            />
            <label for="checkBox" class="form-check-label text-white"
              >I accept the
              <a class="link-underline-white text-white" href="#"
                >Terms and Conditions</a
              >
              of PlentyFull</label
            >
          </div>
          <div class="d-flex align-content-start">
            <button type="submit" class="btn btn-lightgreen fw-bold rounded-1" id="register-btn">
              REGISTER
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RegisterView",
});
</script>

<style lang="scss">
.description-height {
  height: 135px;
}

.custom-file-button {
  input[type="file"] {
    margin-left: -2px !important;

    &::-webkit-file-upload-button {
      display: none;
    }
    &::file-selector-button {
      display: none;
    }
  }

  &:hover {
    label {
      background-color: #dde0e3;
      cursor: pointer;
    }
  }
}

.transparent-input {
  .form-floating {
    .form-control {
      background-color: transparent;
      border-color: white !important;
    }
    .form-control:focus {
      box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
    }
    .form-control:focus ~ label::after,
    .form-control:not(:placeholder-shown) ~ label::after {
      position: absolute;
      inset: 1rem 0.375rem;
      z-index: -1;
      height: 1.5em;
      content: "";
      background-color: rgba(#45bf5d, 0.75);
    }
  }
}
</style>
