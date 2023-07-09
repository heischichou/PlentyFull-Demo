<template>
  <div
    class="modal fade bg-white"
    id="donationQueue"
    tabindex="-1"
    data-bs-keyboard="false"
    aria-hidden="false"
  >
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content d-flex flex-row">
        <div
          class="d-none d-md-block position-relative bg-primary"
          style="width: 4.5rem"
        >
          <button
            type="button"
            class="btn btn-primary back d-flex position-absolute end-0 rounded-circle border-white"
            data-bs-dismiss="modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="#000000"
              class="bi bi-chevron-left align-self-center"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>
          <div class="mb-auto"></div>
        </div>
        <div class="container-fluid">
          <div class="pb-5 pt-0 px-3 px-md-5">
            <h1
              class="d-flex align-items-center text-start fw-bold pt-5 pb-4 border-0 border-3 border-bottom border-dark"
            >
              <button
                type="button"
                class="btn d-flex d-md-none p-0 me-3"
                data-bs-dismiss="modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="56"
                  height="56"
                  fill="currentColor"
                  class="bi bi-arrow-left-short"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                  />
                </svg></button
              >Donation Queue
            </h1>
            <div
              class="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-end gap-3"
              style="margin-top: 2rem !important"
            >
              <div class="dropdown">
                <button
                  type="button"
                  class="btn dropdown-toggle text-black fs-6"
                  :class="{ 'w-100 border border-black': windowWidth <= 576 }"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Filter by: {{ filterBy }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      type="button"
                      class="dropdown-item"
                      @click="setFilterBy('Name')"
                    >
                      Name
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="dropdown-item"
                      @click="setFilterBy('Priority Number')"
                    >
                      Priority Number
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="dropdown-item"
                      @click="setFilterBy('Queue Time')"
                    >
                      Queue Time
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="dropdown-item"
                      @click="setFilterBy('Distance')"
                    >
                      Distance
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="dropdown-item"
                      @click="setFilterBy('Donations Received')"
                    >
                      Donations Received
                    </button>
                  </li>
                </ul>
              </div>
              <div class="dropdown">
                <button
                  type="button"
                  class="btn dropdown-toggle text-black fs-6"
                  :class="{ 'w-100 border border-black': windowWidth <= 576 }"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort by: {{ sortBy }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      type="button"
                      class="dropdown-item"
                      @click="setSortBy('Ascending')"
                    >
                      Ascending
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="dropdown-item"
                      @click="setSortBy('Descending')"
                    >
                      Descending
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="accordion"
              id="queue"
              style="margin-top: 2rem !important"
            >
              <div
                class="accordion-item queuer rounded-0"
                v-for="(queuer, index) in filteredQueue"
                :key="queuer.queuerId"
                :index="index"
              >
                <div class="accordion-header">
                  <button
                    class="accordion-button bg-transparent rounded-0 collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#queuer-${index}`"
                    aria-expanded="false"
                    :aria-controls="`queuer-${index}`"
                  >
                    <div
                      class="d-flex flex-row align-items-center text-black py-2"
                    >
                      <div
                        class="avatar bg-secondary rounded-circle me-3"
                      ></div>
                      <div class="text-start">
                        <h6 class="text-truncate fw-semibold m-0">
                          {{ truncateText(queuer.name) }}
                        </h6>
                        <small
                          ><strong class="fw-medium">{{
                            getOrdinalSuffix(queuer.queuePos)
                          }}</strong>
                          • {{ queuer.distance / 1000 }}km away</small
                        >
                      </div>
                    </div>
                  </button>
                </div>
                <div
                  :id="`queuer-${index}`"
                  class="accordion-collapse collapse"
                  data-bs-parent="#queue"
                >
                  <div class="accordion-body">
                    <div class="row m-3 text-start">
                      <div class="col-12 col-sm-6 mt-2">
                        <small class="fw-semibold">Name</small>
                        <p>{{ queuer.name }}</p>
                      </div>
                      <div class="col-12 col-sm-6 mt-2">
                        <small class="fw-semibold">Priority Number</small>
                        <p>{{ getOrdinalSuffix(queuer.queuePos) }}</p>
                      </div>
                      <div class="col-12 col-sm-6 mt-2">
                        <small class="fw-semibold">Queue Time</small>
                        <p>
                          {{ getTime(queuer.createdAt) }}
                        </p>
                      </div>
                      <div class="col-12 col-sm-6 mt-2">
                        <small class="fw-semibold">Distance</small>
                        <p>{{ queuer.distance / 1000 }}km away</p>
                      </div>
                      <div class="col-12 mt-2">
                        <small class="fw-semibold">Donations Received</small>
                        <p>{{ queuer.donationsReceived }}/3 received today</p>
                      </div>
                    </div>
                    <div
                      class="d-flex flex-column flex-md-row gap-2 justify-content-end mx-3 mb-4"
                    >
                      <button
                        type="submit"
                        class="btn btn-secondary text-white rounded-0 flex-fill flex-md-grow-0 p-2"
                        data-bs-dismiss="modal"
                        @click="confirmQueuer(queuer)"
                      >
                        Confirm
                      </button>
                      <button
                        v-if="index === 0"
                        type="reset"
                        class="btn btn-outline-dark rounded-0 flex-fill flex-md-grow-0 p-2"
                        data-bs-dismiss="modal"
                        @click="declineQueuer(queuer)"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

declare interface Queuer {
  queuerId: string;
  charityId: string;
  name: string;
  status: string;
  queuePos: number;
  queueWeight: number;
  distance: number;
  donationsReceived: number;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: "DonationQueue",
  data() {
    return {
      filterBy: "Priority Number",
      sortBy: "Ascending",
    };
  },
  props: {
    windowWidth: {
      type: Number,
      required: true,
    },
    queuers: {
      type: Array as () => Queuer[],
      required: true,
    },
  },
  methods: {
    setFilterBy(filterBy: string) {
      this.filterBy = filterBy;

      switch (filterBy) {
        case "Name":
          this.filteredQueue.sort((a, b) => {
            return this.sortBy === "Ascending"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          });
          break;
        case "Priority Number":
          this.filteredQueue.sort((a, b) => {
            return this.sortBy === "Ascending"
              ? a.queuePos - b.queuePos
              : b.queuePos - a.queuePos;
          });
          break;
        case "Queue Time":
          if (this.sortBy === "Ascending") {
            this.filteredQueue.sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return dateA < dateB ? dateA.getDate() : dateB.getDate();
            });
          } else {
            this.filteredQueue.sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return dateA > dateB ? dateA.getDate() : dateB.getDate();
            });
          }
          break;
        case "Distance":
          this.filteredQueue.sort((a, b) => {
            return this.sortBy === "Ascending"
              ? a.distance - b.distance
              : b.distance - a.distance;
          });
          break;
        case "Donations Received":
          this.filteredQueue.sort((a, b) => {
            return this.sortBy === "Ascending"
              ? a.donationsReceived - b.donationsReceived
              : b.donationsReceived - a.donationsReceived;
          });
          break;
        default:
          this.filteredQueue.sort((a, b) => {
            return this.sortBy === "Ascending"
              ? a.queuePos - b.queuePos
              : b.queuePos - a.queuePos;
          });
          break;
      }
    },
    setSortBy(sortBy: string) {
      this.sortBy = sortBy;

      switch (this.filterBy) {
        case "Name":
          this.filteredQueue.sort((a, b) => {
            return sortBy === "Ascending"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          });
          break;
        case "Priority Number":
          this.filteredQueue.sort((a, b) => {
            return sortBy === "Ascending"
              ? a.queuePos - b.queuePos
              : b.queuePos - a.queuePos;
          });
          break;
        case "Queue Time":
          if (sortBy === "Ascending") {
            this.filteredQueue.sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return dateA < dateB ? dateA.getDate() : dateB.getDate();
            });
          } else {
            this.filteredQueue.sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return dateA > dateB ? dateA.getDate() : dateB.getDate();
            });
          }
          break;
        case "Distance":
          this.filteredQueue.sort((a, b) => {
            return sortBy === "Ascending"
              ? a.distance - b.distance
              : b.distance - a.distance;
          });
          break;
        case "Donations Received":
          this.filteredQueue.sort((a, b) => {
            return sortBy === "Ascending"
              ? a.donationsReceived - b.donationsReceived
              : b.donationsReceived - a.donationsReceived;
          });
          break;
        default:
          this.filteredQueue.sort((a, b) => {
            return sortBy === "Ascending"
              ? a.queuePos - b.queuePos
              : b.queuePos - a.queuePos;
          });
          break;
      }
    },
    truncateText(text: string) {
      const truncated = text.length > 6 ? text.substring(0, 6) + "..." : text;
      return this.windowWidth > 576 ? text : truncated;
    },
    getOrdinalSuffix(number: number) {
      const suffix = ["th", "st", "nd", "rd"],
        v = number % 100;
      return number + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
    },
    getTime(dateString: string) {
      const date = new Date(dateString);
      const hours = date.getHours() % 12;
      const minutes =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      const meridiem = date.getHours() < 12 ? "AM" : "PM";
      return `${hours}:${minutes} ${meridiem}`;
    },
    confirmQueuer(queuer: Queuer) {
      console.log("Confirmed transaction with", queuer.name);
    },
    declineQueuer(queuer: Queuer) {
      console.log("Declined transaction with", queuer.name);
    },
  },
  computed: {
    filteredQueue(): Queuer[] {
      return this.queuers.map((queuer) => {
        return {
          ...queuer,
        };
      });
    },
  },
});
</script>

<style scoped lang="scss">
.queuer :deep(.avatar) {
  width: 48px;
  height: 48px;
}

.back {
  top: 20px;
  margin-right: -1.9rem !important;
  border-width: 7px !important;
  width: 60px;
  height: 60px;
}
</style>
