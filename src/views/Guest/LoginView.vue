<template>
  <div class="container-fluid bg-header" id="login">
    <div class="container">
      <div class="row flex-column flex-lg-row align-items-center p-5">
        <div class="col col-lg-6">
          <img class="img-fluid" src="@/assets/images/Guest/Login/Header.svg" />
        </div>
        <div class="col col-lg-6 py-5 px-0 px-lg-5 transparent-input">
          <div class="text-start mb-4">
            <h2 class="text-white">Login</h2>
            <p class="text-white">
              Not signed up yet?
              <router-link to="/register" class="text-lightgreen" id="register"
                >Register now!</router-link
              >
            </p>
          </div>
          <div>
            <form action="" id="login-form">
              <div class="form-floating mb-4">
                <input
                  type="email"
                  class="form-control text-white"
                  placeholder="Enter your email"
                  id="email"
                />
                <label for="email" class="text-white">Email Address</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control text-white"
                  placeholder="Enter your email"
                  id="password"
                />
                <label for="password" class="text-white">Password</label>
              </div>
              <div class="text-start">
                <a href="#" class="text-lightgreen" id="forgot-password"
                  >Forgot Password?</a
                >
              </div>
              <div class="form-check d-flex align-items-start gap-3 my-5">
                <input
                  type="checkbox"
                  class="form-check-input"
                  value=""
                  id="rememberbox"
                />
                <label for="rememberbox" class="form-check-label text-white"
                  >Remember me</label
                >
              </div>
              <div class="d-grid gap-3 d-md-flex justify-content-md-start">
                <button
                  type="submit"
                  class="btn btn-lightgreen text-black fw-bold px-5 py-2 rounded-1"
                  id="login-btn"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginView",
});
</script>

<style lang="scss">
a {
  text-decoration: none;
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
      background-color: rgba(#143d37, 0.75);
    }
  }
}
</style>
