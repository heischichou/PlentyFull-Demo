<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-sm-auto sticky-top pe-0 shadow-sm">
        <div
          class="d-flex flex-sm-column flex-row flex-nowrap bg-lightgreen h-100 sticky-top"
          id="sideBar"
        >
          <ul
            class="nav nav-pills nav-flush w-100 flex-row flex-sm-column flex-nowrap text-center justify-content-around align-items-center"
          >
            <li
              class="nav-item h-100 flex-fill"
              :class="activeTab === 'Awaiting' ? 'bg-secondary' : 'bg-none'"
              v-if="role === 'Charity'"
            >
              <button
                type="button"
                class="nav-link w-100 py-3 px-4 rounded-0"
                @click="switchTab('Awaiting')"
                ref="awaitingTab"
              >
                <em
                  class="bi bi-hourglass fs-2"
                  :class="activeTab === 'Awaiting' ? 'text-white' : 'text-dark'"
                ></em>
              </button>
            </li>
            <li
              class="nav-item h-100 flex-fill"
              :class="activeTab === 'Completed' ? 'bg-secondary' : 'bg-none'"
            >
              <button
                type="button"
                class="nav-link w-100 py-3 px-4 rounded-0"
                @click="switchTab('Completed')"
                ref="completedTab"
              >
                <em
                  class="bi bi-clipboard-check fs-2"
                  :class="
                    activeTab === 'Completed' ? 'text-white' : 'text-dark'
                  "
                ></em>
              </button>
            </li>
            <li
              class="nav-item h-100 flex-fill"
              :class="activeTab === 'Cancelled' ? 'bg-secondary' : 'bg-none'"
            >
              <button
                type="button"
                class="nav-link w-100 py-3 px-4 rounded-0"
                @click="switchTab('Cancelled')"
                ref="cancelledTab"
              >
                <em
                  class="bi bi-slash-circle fs-2"
                  :class="
                    activeTab === 'Cancelled' ? 'text-white' : 'text-dark'
                  "
                ></em>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-sm p-5 min-vh-100">
        <h1 class="text-start fw-bold pb-3">{{ activeTab }} Transactions</h1>
        <hr class="border border-dark border-2 opacity-100" />

        <div id="transactionsSection" v-if="transactions.length > 0">
          <div v-if="filteredTransactions.length > 0">
            <TransactionItem
              v-for="(transaction, index) in filteredTransactions"
              :key="transaction.transactionId"
              :index="index"
              class="mb-3"
              :role="role"
              :windowWidth="windowWidth"
              :transaction="transaction"
            />
          </div>
          <div v-else class="m-5">
            <h3 class="text-center text-black-50">
              No {{ activeTab.toLowerCase() }} transactions.
            </h3>
          </div>
        </div>

        <div v-else class="m-5">
          <h3 class="text-center text-black-50">No transactions available.</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uuid } from "vue-uuid";
import TransactionItem from "@/components/Shared/TransactionsView/TransactionItem.vue";

declare interface FoodItem {
  itemId: string;
  name: string;
  type: string;
  stage: string;
  quantity: number;
  weight: number;
  createdAt: string;
}

declare interface Transaction {
  transactionId: string;
  donorName: string;
  donorAvatar: string;
  charityName: string;
  charityAvatar: string;
  distance: number;
  deliveryMode: string;
  status: string;
  deliveryNotes: string;
  optionalNotes: string;
  donations: Array<FoodItem>;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: "TransactionsView",
  components: {
    TransactionItem,
  },
  data() {
    return {
      role: "Charity",
      windowWidth: window.innerWidth,
      transactions: [] as Array<Transaction>,
      filteredTransactions: [] as Array<Transaction>,
      activeTab: "Completed",
    };
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    filterTransactions() {
      this.filteredTransactions = Object.assign(
        [],
        this.transactions.filter((transaction) => {
          if (this.activeTab === "Awaiting") {
            return (
              transaction.status === "Pending" ||
              transaction.status === "Awaiting"
            );
          } else {
            return transaction.status === this.activeTab;
          }
        })
      );
    },
    switchTab(tab: string) {
      this.activeTab = tab;
      this.filterTransactions();
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.activeTab = this.setActiveTab;
    this.transactions = [
      {
        transactionId: uuid.v1(),
        donorName: "DonorName 1",
        donorAvatar: "default_profile.png",
        charityName: "Hippodromo Barangay Hall",
        charityAvatar: "default_profile.png",
        distance: 1200,
        deliveryMode: "Pick-up",
        status: "Pending",
        deliveryNotes: "Please deliver the goods to the barangay hall.",
        optionalNotes: "Please deliver the goods to the barangay hall.",
        donations: [
          {
            itemId: uuid.v1(),
            name: "Chicken Breast",
            type: "Meat and Poultry",
            stage: "In Storage",
            quantity: 2,
            weight: 1,
            createdAt: new Date().toString(),
          },
          {
            itemId: uuid.v1(),
            name: "Brussels Sprouts",
            type: "Fruits and Vegetables",
            stage: "Prepared",
            quantity: 1,
            weight: 3,
            createdAt: new Date().toString(),
          },
          {
            itemId: uuid.v1(),
            name: "Tuna Panga",
            type: "Fish and Seafood",
            stage: "In Storage",
            quantity: 2,
            weight: 0.25,
            createdAt: new Date().toString(),
          },
          {
            itemId: uuid.v1(),
            name: "Duck Eggs",
            type: "Eggs and Dairy",
            stage: "Prepared",
            quantity: 2,
            weight: 0.2,
            createdAt: new Date().toString(),
          },
        ],
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
      {
        transactionId: uuid.v1(),
        donorName: "DonorName 2",
        donorAvatar:
          "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg",
        charityName: "JPIC-IDC Inc.",
        charityAvatar:
          "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg",
        distance: 1500,
        deliveryMode: "Pick-up",
        status: "Cancelled",
        deliveryNotes: "Please deliver the goods",
        optionalNotes: "Please deliver the goods",
        donations: [
          {
            itemId: uuid.v1(),
            name: "Chicken Breast",
            type: "Meat and Poultry",
            stage: "In Storage",
            quantity: 2,
            weight: 1,
            createdAt: new Date().toString(),
          },
          {
            itemId: uuid.v1(),
            name: "Brussels Sprouts",
            type: "Fruits and Vegetables",
            stage: "Prepared",
            quantity: 1,
            weight: 3,
            createdAt: new Date().toString(),
          },
          {
            itemId: uuid.v1(),
            name: "Tuna Panga",
            type: "Fish and Seafood",
            stage: "In Storage",
            quantity: 2,
            weight: 0.25,
            createdAt: new Date().toString(),
          },
          {
            itemId: uuid.v1(),
            name: "Duck Eggs",
            type: "Eggs and Dairy",
            stage: "Prepared",
            quantity: 2,
            weight: 0.2,
            createdAt: new Date().toString(),
          },
        ],
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
      {
        transactionId: uuid.v1(),
        donorName: "DonorName 3",
        donorAvatar:
          "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        charityName: "Cebu Food Bank",
        charityAvatar:
          "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        distance: 2500,
        deliveryMode: "Pick-up",
        status: "Completed",
        deliveryNotes: "Please deliver the goods to the Food bank",
        optionalNotes: "Please deliver the goods to the Food bank",
        donations: [
          {
            itemId: uuid.v1(),
            name: "Chicken Breast",
            type: "Meat and Poultry",
            stage: "In Storage",
            quantity: 2,
            weight: 1,
            createdAt: new Date().toString(),
          },
          {
            itemId: uuid.v1(),
            name: "Brussels Sprouts",
            type: "Fruits and Vegetables",
            stage: "Prepared",
            quantity: 1,
            weight: 3,
            createdAt: new Date().toString(),
          },
          {
            itemId: uuid.v1(),
            name: "Tuna Panga",
            type: "Fish and Seafood",
            stage: "In Storage",
            quantity: 2,
            weight: 0.25,
            createdAt: new Date().toString(),
          },
          {
            itemId: uuid.v1(),
            name: "Duck Eggs",
            type: "Eggs and Dairy",
            stage: "Prepared",
            quantity: 2,
            weight: 0.2,
            createdAt: new Date().toString(),
          },
        ],
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
    ];
    this.filterTransactions();
  },
  computed: {
    setActiveTab: function (): string {
      return this.role === "Charity" ? "Awaiting" : "Completed";
    },
  },
});
</script>

<style scoped lang="scss">
.transaction :deep(.avatar) {
  width: 60px;
  height: 60px;
}

:deep(.donations-table)::-webkit-scrollbar {
  height: 6px;
}

:deep(.donations-table)::-webkit-scrollbar-track {
  background: #4ad471;
  border-radius: 50rem !important;
}

:deep(.donations-table)::-webkit-scrollbar-thumb {
  background: #56f576;
  border-radius: 50rem !important;
}
</style>
