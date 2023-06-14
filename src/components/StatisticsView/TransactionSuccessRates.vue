<template>
  <div class="row flex-column flex-xl-row py-5">
    <div class="col align-self-center mt-5 mb-0 mb-xl-5">
      <h2 class="mb-4 text-start text-black fw-semibold">
        Rate of Successful Transactions
      </h2>
      <p class="my-2 text-justify text-muted">
        Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no
        suscipit quaerendum. At nam minimum ponderum. Est audiam animal
        molestiae te. Ex duo eripuit mentitum.
      </p>
      <div class="row my-4">
        <div
          v-for="(item, index) in chartData.labels"
          class="col my-2 my-xxl-0 d-flex"
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
              {{ chartData.datasets.at(0).data.at(index) }}%
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col align-self-center d-flex justify-content-center mt-3 mt-xl-5 mb-5"
    >
      <Doughnut
        id="transactionSuccessRates"
        :options="chartOptions"
        :data="chartData"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, ArcElement);

export default {
  name: "TransactionSuccessRates",
  components: { Doughnut },
  data() {
    return {
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
    chartData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss"></style>
