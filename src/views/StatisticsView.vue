<template>
  <div class="container-fluid bg-primary">
    <div class="container">
      <div class="row flex-column flex-lg-row align-items-center py-5">
        <div class="col col-lg-6">
          <img class="img-fluid" src="@/assets/images/Statistics/Header.svg" />
        </div>
        <div class="col col-lg-6 mt-5 mt-lg-0">
          <div class="text-start">
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
                  <button type="button" class="dropdown-item">
                    <em class="bi bi-filetype-csv me-2"></em>CSV
                  </button>
                </li>
                <li>
                  <button type="button" class="dropdown-item">
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
  <div class="container-fluid">
    <div class="container">
      <TotalVolume
        :basis="basis"
        :totalSurplusVolume="totalSurplusVolume"
        :commonFoodType="commonFoodType"
        :successRate="successRate"
        :chartData="foodSurplusVolumeChartData"
        @updateBasis="(basis) => (this.basis = basis)"
      />
      <DonationCount
        class="border-2 border-bottom"
        :governmentLevel="governmentLevel"
        :chartData="donationCountChartData"
        @updateGovernmentLevel="(level) => (this.governmentLevel = level)"
      />
      <TransactionSuccessRates :chartData="successRatesChartData" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TotalVolume from "@/components/StatisticsView/TotalVolume.vue";
import DonationCount from "@/components/StatisticsView/DonationCount.vue";
import TransactionSuccessRates from "@/components/StatisticsView/TransactionSuccessRates.vue";
// import FrequentDonationDays from "@/components/StatisticsView/FrequentDonationDays.vue";

export default defineComponent({
  name: "StatisticsView",
  components: {
    TotalVolume,
    DonationCount,
    TransactionSuccessRates,
    // FrequentDonationDays,
  },
  data() {
    const colors = ["#113333", "#45bf5D", "#56f576", "#6ef997"];
    return {
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
            backgroundColor: colors,
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
            backgroundColor: colors,
          },
        ],
      },
      successRatesChartData: {
        labels: ["Successful", "Cancelled", "Aborted"],
        datasets: [
          {
            label: "Rate of Successful Transactions",
            data: [86, 10, 4],
            backgroundColor: colors.slice(1),
            rotation: -45,
          },
        ],
      },
    };
  },
});
</script>

<style lang="scss">
.pill {
  width: 10px;
  height: 10px;
}
</style>
