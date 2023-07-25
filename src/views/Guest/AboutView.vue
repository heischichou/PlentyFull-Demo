<template>
  <div class="about">
    <div class="container-fluid bg-header" id="header">
      <div class="container flex-column flex-md-row">
        <div
          class="row d-flex align-items-center g-5 py-3 order-last order-lg-first"
        >
          <div class="col-lg-5 text-start">
            <h2 class="text-white fw-bold display-5 mb-5">About Us</h2>
            <p class="text-white">
              Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad,
              nam no suscipit quaerendum. At nam minimum ponderum. Est audiam
              animal molestiae te. Ex duo eripuit mentitum.
            </p>
          </div>
          <div class="col-lg-7 order-first order-lg-last">
            <img
              class="img-fluid"
              src="@/assets/images/Guest/About/Header.svg"
              alt="Food Surplus Donations"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid o-bg py-5" id="aboutContent">
      <div
        class="row d-flex align-items-center order-last order-md-fist"
        id="coreValues"
      >
        <div class="col-lg-6 container text-center pt-3">
          <h3 class="fw-bold display-5 mb-5">Core Values</h3>
        </div>
      </div>
      <div class="container">
        <div
          class="row d-flex align-items-center order-last order-md-fist border-bottom border-3 border-black pb-5"
        >
          <div class="col-md-4 px-4 py-3 container text-center">
            <em class="bi bi-boxes fs-1"></em>
            <h4 class="pt-3">Auto Responder</h4>
            <p>
              Assum suavitate ea vel, vero erat doming cu cum. Zril ornatus sea
              cu. Pro ex integre pertinax. Cu cum harum paulo legendos, mei et
              quod enim mnesarchum.
            </p>
          </div>
          <div class="col-md-4 px-4 py-3 container text-center">
            <em class="bi bi-graph-up-arrow fs-1"></em>
            <h4 class="pt-3">Social Plugins</h4>
            <p>
              Eos tota dicunt democritum no. Has natum gubergren ne. Est viris
              soleat sadipscing cu. Legere epicuri insolens eu nec, dicit
              virtute urbanitas id nam, qui in habeo semper eligendi.
            </p>
          </div>
          <div class="col-md-4 px-4 py-3 container text-center">
            <em class="bi bi-database fs-1"></em>
            <h4 class="pt-3">Data Backup</h4>
            <p>
              Ne nam phaedrum consequat, adhuc aliquid ea pri, eum eligendi
              incorrupte referrentur in. Vix ad senserit salutandi argumentum.
              Ei eam definiebas reformidans, exerci persecuti no ius.
            </p>
          </div>
        </div>
        <div
          class="row d-flex align-items-center order-last order-md-fist mt-5"
          id="vision"
        >
          <div class="col-lg-7 pt-sm-3">
            <h3 class="fw-bold display-5 mb-5 text-start px-5 ms-5">
              Vision &amp; <br />
              Mission Statement
            </h3>

            <img
              class="img-fluid pt-2"
              src="@/assets/images/Guest/About/values-img.svg"
              alt="Food Surplus Donations"
            />
          </div>
          <div class="col-lg-5 pt-4 mt-sm-3">
            <div class="text-center">
              <h5>Food is Life</h5>
              <p>
                Eos tota dicunt democritum no. Has natum gubergren ne. Est viris
                soleat sadipscing cu. Legere epicuri insolens eu nec, dicit
                virtute urbanitas id nam, qui in habeo semper eligendi.
              </p>
              <h5 class="mt-5">One for all</h5>
              <p>
                Assum suavitate ea vel, vero erat doming cu cum. Zril ornatus
                sea cu. Pro ex integre pertinax. Cu cum harum paulo legendos,
                mei et quod enim mnesarchum.
              </p>
              <h5 class="mt-5">Truth shall prevail</h5>
              <p>
                Ne nam phaedrum consequat, adhuc aliquid ea pri, eum eligendi
                incorrupte referrentur in. Vix ad senserit salutandi argumentum.
                Ei eam definiebas reformidans, exerci persecuti no ius.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid o-ready pt-3" id="founders">
      <div class="container align-items-center pt-5">
        <h4>Founders</h4>
        <p class="pt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          dignissim justo eget velit congue, sed semper velit pulvinar.
        </p>
        <div
          class="col-lg-6 pb-5 pt-0 pt-sm-4 container order-first order-lg-last"
          id="foundersAvatars"
        >
          <div
            class="developers d-flex d-md-flex flex-row justify-content-between"
          >
            <div
              v-for="founder in 4"
              :key="founder"
              class="avatar rounded-circle"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutView",
});
</script>

<style scoped lang="scss">
.developers > .avatar {
  background-color: #f8f9fa !important;
  width: 65px;
  height: 65px;
}

.o-bg {
  background-color: rgba(#56f576, 0.2);
}

.o-ready {
  background-color: rgba(#45bf5d, 0.7);
}
</style>
