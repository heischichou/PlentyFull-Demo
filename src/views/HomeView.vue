<template>
  <div class="home">
    <div class="container-fluid bg-header" id="header">
      <div class="container flex-column flex-md-row">
        <div
          class="row d-flex align-items-center g-5 py-5 order-last order-md-fist"
        >
          <div class="col-lg-6 container text-start">
            <h2 class="text-white fw-bold display-5 mb-5">
              If you want to eliminate hunger, everybody has to be involved
            </h2>
            <p class="text-white">
              Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad,
              nam no suscipit quaerendum. At nam minimum ponderum. Est audiam
              animal molestiae te. Ex duo eripuit mentitum.
            </p>
            <div class="d-grid gap-3 d-md-flex justify-content-md-start mt-5">
              <button type="button" class="btn btn-primary rounded-0">
                Get Started
              </button>
              <button type="button" class="btn btn-outline-primary rounded-0">
                Learn More
              </button>
            </div>
          </div>
          <div class="col-lg-6 py-4 container order-first order-md-last">
            <img
              class="img-fluid"
              src="@/assets/images/HomeView/Header_Image.svg"
              alt="Header_Image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>
