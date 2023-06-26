<template>
  <div class="card shadow">
    <div class="card-body accordion">
      <div class="d-flex flex-row align-items-center justify-content-between">
        <div class="d-flex flew-row align-items-center">
          <img
            v-if="isURL(userProfile) === false"
            :src="require('../assets/images/Shared/' + userProfile)"
            :alt="userName"
            class="component-img rounded-circle text-white bg-dark d-none d-sm-block"
          />
          <img
            v-else
            :src="userProfile"
            :alt="userName"
            class="component-img rounded-circle text-white bg-dark d-none d-sm-block"
          />

          <div class="text-start ms-3">
            <h5 class="card-title fw-semibold fs-5" v-text="userName"></h5>
            <div class="d-flex flex-wrap gap-1 align-items-center">
              <h6 class="card-subtitle text-black-50 fs-6">
                {{ transItem.transactionDate }}
              </h6>
              <h6 class="card-subtitle text-black-50 fs-6">•</h6>
              <h6 class="card-subtitle text-black-50 fs-6">
                {{ transItem.distance }}
              </h6>
            </div>
          </div>
        </div>

        <div class="d-flex flex-row align-items-center">
          <a class="link-body-emphasis" id="location-btn"
            ><i class="bi bi-geo-alt fs-2"></i
          ></a>
          <a
            class="accordion-button collapsed"
            role="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#' + transItem.transactionID"
            aria-expanded="false"
            :aria-controls="transItem.transactionID"
          ></a>
        </div>
      </div>

      <div
        class="accordion-collapse collapse accordion-body border-top border-black-50 border-2 mt-3 pb-0"
        :id="transItem.transactionID"
      >
        <h6 class="text-start fw-semibold fs-5 m-0">Donation Details</h6>
        <div class="row pt-3">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6 align-items-start">
                <p class="text-start">
                  <b class="fw-semibold">{{ displayName }} Name:</b>
                  {{ userName }}
                </p>
                <p class="text-start">
                  <b class="fw-semibold">Delivery Mode:</b>
                  {{ transItem.deliveryMode }}
                </p>
              </div>
              <div class="col-md-6 align-items-start">
                <p class="text-start">
                  <b class="fw-semibold">Request Time:</b>
                  {{ transItem.requestTime }}
                </p>
                <p class="text-start">
                  <b class="fw-semibold">Status:</b> {{ transItem.status }}
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-12">
            <p class="text-start">
              <b class="fw-semibold">Delivery Notes:</b>
              {{ transItem.deliveryNotes }}
            </p>
          </div>

          <div class="col-md-12">
            <p class="text-start">
              <b class="fw-semibold">Optional Notes:</b>
              {{ transItem.optionalNotes }}
            </p>
          </div>
        </div>
        <div class="table-responsive-md">
          <DataTable
            class="table table-sm table-borderless border border-2"
            :options="tableOptions"
            :columns="tableColumns"
            :data="transItem.donateItemsList"
          >
            <thead class="table-primary">
              <tr>
                <th class="text-center">Food Item Name</th>
                <th class="text-center">Food Type</th>
                <th class="text-center">Life Cycle Stage</th>
                <th class="text-center">Quantity</th>
                <th class="text-center">Weight</th>
              </tr>
            </thead>
          </DataTable>
        </div>
        <div
          v-if="displayName !== 'Charity'"
          class="d-flex flex-row align-items-center justify-content-end"
        >
          <button type="button" class="btn btn-primary rounded-0">
            Receive
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";

DataTable.use(DataTablesCore);

export default defineComponent({
  name: "TransactionItem",
  components: {
    DataTable,
  },
  props: {
    transItem: Object,
    displayName: String,
    userName: String,
    userProfile: String,
  },
  data() {
    return {
      tableOptions: {
        searching: false,
        paging: false,
        info: false,
        lengthChange: false,
      },
      tableColumns: [
        { data: "itemName", title: "Food Item Name" },
        { data: "foodType", title: "Food Type" },
        { data: "lifeCycleStage", title: "Life Cycle Stage" },
        { data: "itemQuantity", title: "Quantity" },
        { data: "itemWeight", title: "Weight" },
      ],
    };
  },
  methods: {
    isURL(image: string) {
      const urlcheck = /^(ftp|http|https):\/\/[^ "]+$/;
      if (RegExp(urlcheck).exec(image)) {
        return true;
      } else {
        return false;
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import "datatables.net-bs5";

.component-img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.accordion-button:not(.collapsed) {
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>
