<template>
  <div class="transaction card shadow-sm">
    <div class="card-body accordion">
      <div class="d-flex flex-row align-items-center justify-content-between">
        <button
          type="button"
          class="btn flex-fill d-flex flew-row align-items-center"
          role="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#' + transaction.transactionId"
          aria-expanded="false"
          :aria-controls="transaction.transactionId"
        >
          <div>
            <img
              :src="
                isURL(avatar)
                  ? avatar
                  : require('@/assets/images/Shared/' + avatar)
              "
              :alt="
                role === 'Charity'
                  ? transaction.donorName
                  : transaction.charityName
              "
              class="avatar d-none d-sm-block rounded-circle object-fit-cover text-white bg-dark me-3"
            />
          </div>

          <div class="text-start">
            <h5 class="card-title fw-semibold fs-5">
              {{
                role === "Charity"
                  ? truncateText(transaction.donorName)
                  : truncateText(transaction.charityName)
              }}
            </h5>
            <div class="d-flex flex-wrap gap-1 align-items-center">
              <h6 class="card-subtitle text-black-50 fs-6">
                {{ getDate(transaction.createdAt) }} •
                {{ transaction.distance / 1000 }}km away
              </h6>
            </div>
          </div>
        </button>

        <div class="d-flex flex-row align-items-center">
          <button
            type="button"
            class="btn location-pin px-1"
            :id="transaction.transactionId + '-map-btn'"
          >
            <em class="bi bi-geo-alt fs-2"></em>
          </button>
          <button
            type="button"
            class="accordion-button collapsed"
            role="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#' + transaction.transactionId"
            aria-expanded="false"
            :aria-controls="transaction.transactionId"
          ></button>
        </div>
      </div>

      <div
        class="accordion-collapse collapse accordion-body border-top border-black-50 border-2 mt-3 pb-0"
        :id="transaction.transactionId"
      >
        <h5 class="text-start fw-semibold fs-5 mt-2 mb-3">Donation Details</h5>
        <div class="row">
          <div class="col-12 col-md-6 mt-1 align-items-start">
            <p class="text-start">
              <b class="fw-semibold"
                >{{ role === "Charity" ? "Donor" : role }} Name:</b
              >
              {{
                role === "Charity"
                  ? transaction.donorName
                  : transaction.charityName
              }}
            </p>
          </div>
          <div class="col-12 col-md-6 mt-1 align-items-start">
            <p class="text-start m-0">
              <b class="fw-semibold">Request Time:</b>
              {{ getTime(transaction.createdAt) }}
            </p>
          </div>
          <div class="col-12 col-md-6 mt-1 align-items-start">
            <p class="text-start">
              <b class="fw-semibold">Delivery Mode:</b>
              {{ transaction.deliveryMode }}
            </p>
          </div>
          <div class="col-12 col-md-6 mt-1 align-items-start">
            <p class="text-start">
              <b class="fw-semibold">Status:</b> {{ transaction.status }}
            </p>
          </div>

          <div class="col-md-12 mt-1">
            <p class="text-start">
              <b class="fw-semibold">Delivery Notes:</b>
              {{ transaction.deliveryNotes }}
            </p>
          </div>

          <div class="col-md-12 mt-1">
            <p class="text-start">
              <b class="fw-semibold">Optional Notes:</b>
              {{ transaction.optionalNotes }}
            </p>
          </div>
        </div>

        <Donations :headers="headers" :donations="transaction.donations" />
        <div
          v-if="
            role === 'Charity' &&
            transaction.status !== 'Completed' &&
            transaction.status !== 'Cancelled'
          "
          class="d-flex flex-row align-items-center justify-content-end my-3"
        >
          <button
            type="button"
            class="btn btn-primary fw-medium rounded-0 py-2 px-3"
          >
            Receive
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Donations from "@/components/TransactionsView/DonationsTable.vue";

declare interface Header {
  key: string;
  label: string;
}

export default defineComponent({
  name: "TransactionItem",
  components: {
    Donations,
  },
  props: {
    role: {
      type: String,
      required: true,
    },
    windowWidth: {
      type: Number,
      required: true,
    },
    transaction: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        { key: "name", label: "Food Item Name" },
        { key: "type", label: "Food Type" },
        { key: "stage", label: "Life Cycle Stage" },
        { key: "quantity", label: "Quantity" },
        { key: "weight", label: "Weight" },
      ] as Header[],
    };
  },
  methods: {
    isURL(image: string) {
      const urlcheck = /^(ftp|http|https):\/\/[^ "]+$/;
      return RegExp(urlcheck).exec(image) ? true : false;
    },
    truncateText(text: string) {
      const truncated = text.length > 6 ? text.substring(0, 6) + "..." : text;
      return this.windowWidth > 576 ? text : truncated;
    },
    getDate(dateString: string) {
      const date = new Date(dateString);
      const month =
        this.windowWidth > 576
          ? date.toLocaleString("default", { month: "long" })
          : date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();
      return this.windowWidth > 576
        ? `${month} ${day}, ${year}`
        : `${month}/${day}/${year}`;
    },
    getTime(dateString: string) {
      const date = new Date(dateString);
      const hours = date.getHours() % 12;
      const minutes =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      const meridiem = date.getHours() < 12 ? "AM" : "PM";
      return `${hours}:${minutes} ${meridiem}`;
    },
  },
  computed: {
    avatar: function (): string {
      return this.role === "Charity"
        ? this.transaction.donorAvatar
        : this.transaction.charityAvatar;
    },
  },
});
</script>

<style scoped lang="scss">
.accordion-button:not(.collapsed) {
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>
