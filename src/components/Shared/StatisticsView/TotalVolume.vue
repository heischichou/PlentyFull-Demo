<template>
  <div
    id="totalVolume"
    class="container-fluid"
    :class="{
      'bg-white text-black': role === 'Donor' || role === 'Charity',
      'bg-dark text-white': role === 'Administrator',
    }"
  >
    <div
      class="container"
      :class="{
        'border-2 border-bottom': role === 'Donor' || role === 'Charity',
      }"
    >
      <div class="row flex-column flex-xl-row py-3">
        <div class="col align-self-center mt-5 mb-0 mb-xl-5">
          <h2 class="figure-title mb-4 text-start fw-semibold">
            Food Surplus Volume
          </h2>
          <p class="figure-description my-2 text-justify opacity-75">
            Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum. At nam minimum ponderum. Est audiam animal
            molestiae te. Ex duo eripuit mentitum.
          </p>
          <div class="row my-4">
            <div
              v-for="(item, index) in chartData.labels"
              class="chart-legend col-6 col-xxl my-2 my-xxl-0 d-flex"
              :key="index"
              :index="index"
            >
              <div
                class="pill rounded-pill me-3 mt-2"
                :style="{
                  backgroundColor: chartData.datasets
                    .at(0)
                    .backgroundColor.at(index),
                }"
              ></div>
              <div class="flex-grow-1 align-self-stretch text-start">
                <small class="text-capitalize">{{ item.toLowerCase() }}</small>
                <p class="m-0 fw-bold">
                  {{ chartData.datasets.at(0).data.at(index) }}kg
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col mt-3 mt-xl-5 mb-5">
          <div class="d-flex flex-column">
            <div class="dropdown align-self-end mb-4">
              <button
                type="button"
                class="btn dropdown-toggle fs-6"
                :class="`text-${
                  role === 'Donor' || role === 'Charity' ? 'black' : 'white'
                }`"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Per basis: {{ basis }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li v-for="basis in bases" :key="basis">
                  <button
                    type="button"
                    class="dropdown-item"
                    @click="$emit('updateBasis', basis)"
                  >
                    {{ basis }}
                  </button>
                </li>
              </ul>
            </div>
            <Doughnut
              class="align-self-center"
              id="totalSurplusVolume"
              :options="chartOptions"
              :data="chartData"
            />
          </div>
        </div>
      </div>
      <div class="row pb-5">
        <div class="col pb-2">
          <h2 class="fw-bold">{{ totalSurplusVolume / 1000 }}K+</h2>
          <p>Total weight in food surplus volume</p>
        </div>
        <div class="col pb-2">
          <h2 class="fw-bold">{{ commonFoodType.type }}</h2>
          <p>
            Comprise {{ commonFoodType.percent }}% of most frequently donated
            food items
          </p>
        </div>
        <div class="col pb-2">
          <h2 class="fw-bold">{{ successRate }}%</h2>
          <p>Success rate of transactions</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, ArcElement);

export default defineComponent({
  name: "TotalVolume",
  components: { Doughnut },
  data() {
    return {
      bases: ["Weekly", "Monthly", "Yearly"] as string[],
      chartOptions: {
        responsive: false,
        aspectRatio: 1,
        cutout: 82.5,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
  props: {
    role: {
      type: String,
      required: true,
    },
    basis: {
      type: String,
      required: true,
    },
    totalSurplusVolume: {
      type: Number,
      required: true,
    },
    commonFoodType: {
      type: Object,
      required: true,
    },
    successRate: {
      type: Number,
      required: true,
    },
    chartData: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss"></style>
