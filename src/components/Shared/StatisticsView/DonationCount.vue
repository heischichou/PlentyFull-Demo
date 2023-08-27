<template>
  <div
    id="donationCount"
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
      <div class="row flex-column flex-xl-row py-5">
        <div class="col align-self-center pt-0 pt-xl-5 mt-5 mb-0 mb-xl-5">
          <h2 class="figure-title mb-4 text-start fw-semibold">
            Donations Per Location
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
                  {{ chartData.datasets.at(0).data.at(index) }} donations
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col align-self-center mt-3 mt-xl-5 mb-5">
          <div class="dropdown float-end mb-4">
            <button
              type="button"
              class="btn dropdown-toggle fs-6"
              :class="`text-${
                role === 'Donor' || role === 'Charity' ? 'black' : 'white'
              }`"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Government level: {{ governmentLevel }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li v-for="level in governmentLevels" :key="level">
                <button
                  type="button"
                  class="dropdown-item"
                  @click="$emit('updateGovernmentLevel', level)"
                >
                  {{ level }}
                </button>
              </li>
            </ul>
          </div>
          <Bar
            id="donationsPerLocation"
            :options="chartOptions"
            :data="chartData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: "DonationCount",
  components: { Bar },
  props: {
    role: {
      type: String,
      required: true,
    },
    governmentLevel: {
      type: String,
      required: true,
    },
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      governmentLevels: ["Barangay", "Municipality", "City"] as string[],
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      const canvas = document.getElementById(
        "donationsPerLocation"
      ) as HTMLCanvasElement;
      const windowWidth = window.innerWidth;

      let canvasWidth = 600;
      if (windowWidth < 576) {
        canvasWidth = 540;
      } else if (windowWidth >= 576 && windowWidth < 768) {
        canvasWidth = 624;
      } else if (windowWidth >= 768 && windowWidth <= 1200) {
        canvasWidth = 864;
      } else if (windowWidth > 1200 && windowWidth < 1400) {
        canvasWidth = 600;
      }
      canvas.style.width = canvasWidth.toString() + "px";
      canvas.style.height = (canvasWidth / 2).toString() + "px";
    });
  },
  computed: {
    chartOptions() {
      return {
        responsive: true,
        scales: {
          x: {
            grid: {
              color: this.role === "Administrator" ? "#56f576" : "#e5e5e5",
            },
            ticks: {
              color: this.role === "Administrator" ? "#ffffff" : "#666666",
            },
          },
          y: {
            grid: {
              color: this.role === "Administrator" ? "#56f576" : "#e5e5e5",
            },
            ticks: {
              color: this.role === "Administrator" ? "#ffffff" : "#666666",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: this.role === "Administrator" ? "#ffffff" : "#666666",
            },
          },
        },
      };
    },
  },
});
</script>

<style scoped lang="scss"></style>
