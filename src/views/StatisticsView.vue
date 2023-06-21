<template>
  <div
    class="container-fluid"
    :class="role === 'Administrator' ? 'bg-header' : 'bg-primary'"
  >
    <div class="container">
      <div
        class="row flex-column flex-lg-row align-items-center py-5"
        :class="role === 'Administrator' ? 'text-white' : 'text-black'"
      >
        <div class="col col-lg-6">
          <img
            v-if="role === 'Administrator'"
            class="img-fluid"
            src="@/assets/images/Statistics/Admin_Header.svg"
          />

          <img
            v-else
            class="img-fluid"
            src="@/assets/images/Statistics/Header.svg"
          />
        </div>
        <div class="col col-lg-6 mt-5 mt-lg-0">
          <div v-if="role === 'Administrator'" class="text-center">
            <h1 class="mb-5 fw-bold">Recent Updates</h1>
            <div class="row">
              <div class="col-12 col-md">
                <h2 class="fw-semibold mb-4">{{ donationsCount }}</h2>
                <h6 class="fw-semibold mb-3">Food Donation Count</h6>
                <small class="opacity-75">
                  This count shows the number of confirmed transactions made by
                  Food Donors through out the week.
                </small>
              </div>
              <div class="col-12 col-md mt-5 mt-md-0">
                <h2 class="fw-semibold mb-4">
                  {{ successfulTransactionsCount }}
                </h2>
                <h6 class="fw-semibold mb-3">Successful Transactions Count</h6>
                <small class="opacity-75">
                  This count shows the number of confirmed transactions of
                  Charity Organizations through out the week.
                </small>
              </div>
            </div>
          </div>

          <div v-else class="text-start">
            <h2 class="mb-3 fw-semibold">Your Statistics</h2>
            <p class="text-justify">
              Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad,
              nam no suscipit quaerendum. At nam minimum ponderum. Est audiam
              animal molestiae te. Ex duo eripuit mentitum.
            </p>
            <div class="dropdown-center">
              <button
                class="btn btn-lg btn-dark dropdown-toggle my-3 p-3 rounded-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <em class="bi bi-download me-3"></em>Export
              </button>
              <ul class="dropdown-menu">
                <li>
                  <button
                    type="button"
                    class="dropdown-item"
                    @click="exportAsCSV"
                  >
                    <em class="bi bi-filetype-csv me-2"></em>CSV
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="dropdown-item"
                    @click="exportAsExcel"
                  >
                    <em class="bi bi-filetype-xlsx me-2"></em>Excel
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TotalVolume
    :role="role"
    :basis="basis"
    :totalSurplusVolume="totalSurplusVolume"
    :commonFoodType="commonFoodType"
    :successRate="successRate"
    :chartData="foodSurplusVolumeChartData"
    @updateBasis="(basis) => (this.basis = basis)"
  />
  <DonationCount
    :role="role"
    :governmentLevel="governmentLevel"
    :chartData="donationCountChartData"
    @updateGovernmentLevel="(level) => (this.governmentLevel = level)"
  />
  <TransactionSuccessRates :role="role" :chartData="successRatesChartData" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TotalVolume from "@/components/StatisticsView/TotalVolume.vue";
import DonationCount from "@/components/StatisticsView/DonationCount.vue";
import TransactionSuccessRates from "@/components/StatisticsView/TransactionSuccessRates.vue";

export default defineComponent({
  name: "StatisticsView",
  components: {
    TotalVolume,
    DonationCount,
    TransactionSuccessRates,
  },
  data() {
    return {
      role: "Donor",
      basis: "Weekly",
      totalSurplusVolume: 1200,
      commonFoodType: {
        type: "Vegetables",
        percent: 48,
      },
      successRate: 86,
      governmentLevel: "Barangay",
      foodSurplusVolumeChartData: {
        labels: [
          "Vegetables",
          "Meat & Poultry",
          "Eggs & Dairy",
          "Fish & Seafood",
        ],
        datasets: [
          {
            label: "Food Surplus Volume",
            data: [47, 32, 15, 8],
            backgroundColor: [] as string[],
            borderColor: "",
            rotation: -45,
          },
        ],
      },
      donationCountChartData: {
        labels: ["TALAMBAN", "MABOLO", "MANDAUE", "LAHUG"],
        datasets: [
          {
            label: "Donations Per Location",
            data: [21, 14, 8, 6],
            backgroundColor: [] as string[],
            borderColor: "",
            color: "#ffffff",
          },
        ],
      },
      successRatesChartData: {
        labels: ["Successful", "Cancelled", "Aborted"],
        datasets: [
          {
            label: "Rate of Successful Transactions",
            data: [86, 10, 4],
            backgroundColor: [] as string[],
            borderColor: "",
            rotation: -45,
          },
        ],
      },
    };
  },
  methods: {
    exportAsCSV() {
      console.log("Exporting raw data as CSV now...");
    },
    exportAsExcel() {
      console.log("Exporting raw data as XLSX now...");
    },
  },
  computed: {
    figuresTheme(): string[] {
      return this.role !== "Administrator"
        ? ["#113333", "#45bf5D", "#56f576", "#6ef997"]
        : ["#ffffff", "#45bf5D", "#56f576", "#6ef997"];
    },
    donationsCount(): number | null {
      return this.role === "Administrator" ? 0 : null;
    },
    successfulTransactionsCount(): number | null {
      return this.role === "Administrator" ? 0 : null;
    },
  },
  created() {
    // Total Food Surplus Volume Figure Theming
    this.foodSurplusVolumeChartData.datasets[0].backgroundColor =
      this.figuresTheme;
    this.foodSurplusVolumeChartData.datasets[0].borderColor =
      this.role === "Donor" || this.role === "Charity" ? "#ffffff" : "#113333";
    // Donations Per Location Figure Theming
    this.donationCountChartData.datasets[0].backgroundColor = this.figuresTheme;
    // Rate of Successful Transactions Figure Theming
    this.successRatesChartData.datasets[0].backgroundColor =
      this.figuresTheme.slice(1);
    this.successRatesChartData.datasets[0].borderColor =
      this.role === "Donor" || this.role === "Charity" ? "#ffffff" : "#113333";
  },
});
</script>

<style lang="scss">
.pill {
  width: 10px;
  height: 10px;
}
</style>
