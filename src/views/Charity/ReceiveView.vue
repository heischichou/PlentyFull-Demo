<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-sm-auto sticky-top pe-0 shadow-sm">
        <div
          class="d-flex flex-sm-column flex-row flex-nowrap bg-lightgreen h-100 sticky-top"
          id="sideBar"
        >
          <ul
            class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap text-center justify-content-around w-100 align-items-center"
          >
            <li class="nav-item h-100 w-100">
              <a
                href="#"
                class="nav-link py-3 px-4 rounded-0"
                @click="showTransactions(true, false, false)"
                :class="awaiting ? 'bg-secondary' : 'bg-none'"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-title="Awaiting Transactions"
                ><i
                  class="bi bi-hourglass fs-2"
                  :class="awaiting ? 'text-white' : 'text-dark'"
                ></i
              ></a>
            </li>
            <li class="nav-item h-100 w-100">
              <a
                href="#"
                class="nav-link py-3 px-4 rounded-0"
                @click="showTransactions(false, true, false)"
                :class="completed ? 'bg-secondary' : 'bg-none'"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-title="Completed Transactions"
                ><i
                  class="bi bi-clipboard-check fs-2"
                  :class="completed ? 'text-white' : 'text-dark'"
                ></i
              ></a>
            </li>
            <li class="nav-item h-100 w-100">
              <a
                href="#"
                class="nav-link py-3 px-4 rounded-0"
                @click="showTransactions(false, false, true)"
                :class="cancelled ? 'bg-secondary' : 'bg-none'"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-title="Cancelled Transactions"
                ><i
                  class="bi bi-slash-circle fs-2"
                  :class="cancelled ? 'text-white' : 'text-dark'"
                ></i
              ></a>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-sm p-5 min-vh-100">
        <h1 class="text-start fw-bold pb-3" v-text="updateTitle()"></h1>
        <hr class="border border-dark border-2 opacity-100" />

        <div v-show="awaiting">
          <div
            v-for="transItem in awaitingTransactions"
            :key="transItem.transactionID"
            class="mb-3"
          >
            <TransactionItem
              :transItem="transItem"
              :displayName="getDisplayName()"
              :userName="getTransactionUser(transItem)"
              :userProfile="getTransactionProfile(transItem)"
            />
          </div>
        </div>

        <div v-show="completed">
          <div
            v-for="transItem in completedTransactions"
            :key="transItem.transactionID"
            class="mb-3"
          >
            <TransactionItem
              :transItem="transItem"
              :displayName="getDisplayName()"
              :userName="getTransactionUser(transItem)"
              :userProfile="getTransactionProfile(transItem)"
            />
          </div>
        </div>

        <div v-show="cancelled">
          <div
            v-for="transItem in cancelledTransactions"
            :key="transItem.transactionID"
            class="mb-3"
          >
            <TransactionItem
              :transItem="transItem"
              :displayName="getDisplayName()"
              :userName="getTransactionUser(transItem)"
              :userProfile="getTransactionProfile(transItem)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TransactionItem from "@/components/TransactionItem.vue";

export default defineComponent({
  name: "ReceiveView",
  components: {
    TransactionItem,
  },
  data() {
    return {
      role: "Charity",
      transactionList: [] as Array<any>,
      awaiting: true,
      completed: false,
      cancelled: false,
    };
  },
  methods: {
    showTransactions(
      awaiting: boolean,
      completed: boolean,
      cancelled: boolean
    ) {
      this.awaiting = awaiting;
      this.completed = completed;
      this.cancelled = cancelled;
    },
    updateTitle() {
      if (this.awaiting) {
        return "Awaiting Transactions";
      } else if (this.completed) {
        return "Completed Transactions";
      } else if (this.cancelled) {
        return "Cancelled Transactions";
      }
    },
    getDisplayName() {
      if (this.role === "Charity") {
        return "Donor";
      } else {
        return "Charity";
      }
    },
    getTransactionUser(transactionList: {
      donorName: string;
      charityName: string;
    }) {
      if (this.role === "Charity") {
        return transactionList.donorName;
      } else {
        return transactionList.charityName;
      }
    },
    getTransactionProfile(transactionList: {
      donorProfile: string;
      charityProfile: string;
    }) {
      if (this.role === "Charity") {
        return transactionList.donorProfile;
      } else {
        return transactionList.charityProfile;
      }
    },
  },
  created() {
    this.transactionList = [
      {
        transactionID: 1,
        donorName: "DonorName 1",
        donorProfile: "default_profile.png",
        charityName: "Hippodromo Barangay Hall",
        charityProfile: "default_profile.png",
        transactionDate: "May 1, 2022",
        distance: "1.2 km away",
        deliveryMode: "Pick-up",
        requestTime: "8 AM",
        status: "Pending",
        deliveryNotes: "Please deliver the goods to the barangay hall.",
        optionalNotes: "Please deliver the goods to the barangay hall.",
        donateItemsList: [
          {
            itemID: 1,
            itemName: "Chicken Breast",
            foodType: "Meat and Poultry",
            lifeCycleStage: "In Storage",
            itemQuantity: "2 pieces",
            itemWeight: "1 kilo",
          },
          {
            itemID: 2,
            itemName: "Brussels Sprouts",
            foodType: "Fruits and Vegetables",
            lifeCycleStage: "Prepared",
            itemQuantity: "1 piece",
            itemWeight: "3 kilos",
          },
          {
            itemID: 3,
            itemName: "Tuna Panga",
            foodType: "Fish and Seafood",
            lifeCycleStage: "In Storage",
            itemQuantity: "2 pieces",
            itemWeight: "0.25 kilos",
          },
          {
            itemID: 4,
            itemName: "Duck Eggs",
            foodType: "Eggs and Dairy",
            lifeCycleStage: "Prepared",
            itemQuantity: "2 pieces",
            itemWeight: "0.2 kilos",
          },
        ],
      },
      {
        transactionID: 2,
        donorName: "DonorName 2",
        donorProfile:
          "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg",
        charityName: "JPIC-IDC Inc.",
        charityProfile:
          "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg",
        transactionDate: "May 2, 2022",
        distance: "1.5 km away",
        deliveryMode: "Pick-up",
        requestTime: "10 AM",
        status: "Cancelled",
        deliveryNotes: "Please deliver the goods",
        optionalNotes: "Please deliver the goods",
        donateItemsList: [
          {
            itemID: 1,
            itemName: "Chicken Breast",
            foodType: "Meat and Poultry",
            lifeCycleStage: "In Storage",
            itemQuantity: "2 pieces",
            itemWeight: "1 kilo",
          },
          {
            itemID: 2,
            itemName: "Brussels Sprouts",
            foodType: "Fruits and Vegetables",
            lifeCycleStage: "Prepared",
            itemQuantity: "1 piece",
            itemWeight: "3 kilos",
          },
          {
            itemID: 3,
            itemName: "Tuna Panga",
            foodType: "Fish and Seafood",
            lifeCycleStage: "In Storage",
            itemQuantity: "2 pieces",
            itemWeight: "0.25 kilos",
          },
          {
            itemID: 4,
            itemName: "Duck Eggs",
            foodType: "Eggs and Dairy",
            lifeCycleStage: "Prepared",
            itemQuantity: "2 pieces",
            itemWeight: "0.2 kilos",
          },
        ],
      },
      {
        transactionID: 3,
        donorName: "DonorName 3",
        donorProfile:
          "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        charityName: "Cebu Food Bank",
        charityProfile:
          "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        transactionDate: "May 3, 2022",
        distance: "2.5 km away",
        deliveryMode: "Pick-up",
        requestTime: "9 AM",
        status: "Completed",
        deliveryNotes: "Please deliver the goods to the Food bank",
        optionalNotes: "Please deliver the goods to the Food bank",
        donateItemsList: [
          {
            itemID: 1,
            itemName: "Chicken Breast",
            foodType: "Meat and Poultry",
            lifeCycleStage: "In Storage",
            itemQuantity: "2 pieces",
            itemWeight: "1 kilo",
          },
          {
            itemID: 2,
            itemName: "Brussels Sprouts",
            foodType: "Fruits and Vegetables",
            lifeCycleStage: "Prepared",
            itemQuantity: "1 piece",
            itemWeight: "3 kilos",
          },
          {
            itemID: 3,
            itemName: "Tuna Panga",
            foodType: "Fish and Seafood",
            lifeCycleStage: "In Storage",
            itemQuantity: "2 pieces",
            itemWeight: "0.25 kilos",
          },
          {
            itemID: 4,
            itemName: "Duck Eggs",
            foodType: "Eggs and Dairy",
            lifeCycleStage: "Prepared",
            itemQuantity: "2 pieces",
            itemWeight: "0.2 kilos",
          },
        ],
      },
    ];
  },
  computed: {
    awaitingTransactions: function (): any[] {
      return this.transactionList.filter((transItem) => {
        return transItem.status.localeCompare("Pending") === 0;
      });
    },
    completedTransactions: function (): any[] {
      return this.transactionList.filter((transItem) => {
        return transItem.status.localeCompare("Completed") === 0;
      });
    },
    cancelledTransactions: function (): any[] {
      return this.transactionList.filter((transItem) => {
        return transItem.status.localeCompare("Cancelled") === 0;
      });
    },
  },
});
</script>

<style lang="scss">
.tooltip .tooltip-inner {
  --bs-tooltip-bg: #113333;
}
.tooltip .tooltip-arrow::before {
  --bs-tooltip-bg: #113333;
}
</style>
