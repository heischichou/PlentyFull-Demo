<template>
  <div id="reports">
    <div class="d-flex">
      <input
        type="text"
        class="form-control bg-transparent text-white px-4 py-3 border-3 border-primary rounded-top-4"
        placeholder="Search here..."
        id="searchBar"
        @change="setSearchText($event.target.value)"
      />
    </div>
    <div class="reports-table table-responsive mt-2 mb-3">
      <table class="table table-hover table-admin overflow-hidden rounded-1">
        <thead class="table-registry border-3 border-primary">
          <tr class="align-middle">
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="sorting-column py-2"
              scope="col"
            >
              <div
                class="d-flex justify-content-center"
                v-if="header.key !== 'actions'"
              >
                <button
                  type="button"
                  class="btn w-100 d-flex flex-row align-items-center justify-content-center gap-3"
                  @click="setFilterBy(header.key)"
                  :ref="`sortBy${
                    header.key.charAt(0).toUpperCase() + header.key.slice(1)
                  }`"
                >
                  <p class="fw-bold m-0 text-white">
                    {{ header.label }}
                  </p>
                  <div class="d-flex flex-column">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      :fill="
                        filterBy === header.key && ascending
                          ? '#6ef997'
                          : '#adb5bd'
                      "
                      class="bi bi-caret-up-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      :fill="
                        filterBy === header.key && !ascending
                          ? '#6ef997'
                          : '#adb5bd'
                      "
                      class="bi bi-caret-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody
          class="overflow-hidden border-3 border-primary border-top-0 border-bottom-0 rounded-1"
        >
          <template v-if="filteredReports.length > 0">
            <tr
              v-for="report in filteredReports"
              :key="report.reportId"
              class="report align-middle border-3 border-start-0 border-end-0 border-primary"
            >
              <template v-for="(header, index) in headers">
                <template v-if="header.key === 'actions'">
                  <td :key="index" class="text-center py-2">
                    <button
                      type="button"
                      class="btn btn-outline-primary rounded-0 px-4 py-3"
                      data-bs-toggle="modal"
                      data-bs-target="#viewReport"
                      @click="setSelectedReport(report)"
                    >
                      View
                    </button>
                  </td>
                </template>

                <template v-else>
                  <td :key="index" class="text-center">
                    {{ report[header.key] }}
                  </td>
                </template>
              </template>
            </tr>
          </template>

          <template v-else>
            <tr
              class="align-middle border-3 border-start-0 border-end-0 border-primary"
            >
              <td class="py-3" :colspan="headers.length">No reports found.</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div
      class="modal fade"
      id="viewReport"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="viewReportLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-6 fw-semibold" id="viewReportLabel">
              Report Details
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row m-1 text-start">
              <div class="col-12 col-sm-4">
                <p class="fw-semibold">Report ID</p>
              </div>
              <div class="col-12 col-sm">
                <p class="text-start">{{ selectedReport.reportId }}</p>
              </div>
              <span></span>

              <div class="col-12 col-sm-4">
                <p class="fw-semibold">Violator Name</p>
              </div>
              <div class="col-12 col-sm">
                <p class="text-start">{{ selectedReport.violatorName }}</p>
              </div>
              <span></span>

              <div class="col-12 col-sm-4">
                <p class="fw-semibold">Reporter Name</p>
              </div>
              <div class="col-12 col-sm">
                <p class="text-start">{{ selectedReport.reporterName }}</p>
              </div>
              <span></span>

              <div class="col-12 col-sm-4">
                <p class="fw-semibold">Anonymous?</p>
              </div>
              <div class="col-12 col-sm">
                <p class="text-start">
                  {{ selectedReport.anonymous ? "Yes" : "No" }}
                </p>
              </div>
              <span></span>

              <div class="col-12 col-sm-4">
                <p class="fw-semibold">Report Type</p>
              </div>
              <div class="col-12 col-sm">
                <p class="text-start">{{ selectedReport.reportType }}</p>
              </div>
              <span></span>

              <div class="col-12 col-sm-4">
                <p class="fw-semibold">Report Subject</p>
              </div>
              <div class="col-12 col-sm">
                <p class="text-start">{{ selectedReport.subject }}</p>
              </div>
              <span></span>

              <div class="col-12 col-sm-4">
                <p class="fw-semibold">Description</p>
              </div>
              <div class="col-12 col-sm">
                <p class="text-justify">{{ selectedReport.message }}</p>
              </div>
            </div>
          </div>
          <div
            class="modal-footer d-flex flex-column flex-sm-row justify-content-end"
          >
            <button
              type="button"
              class="btn btn-outline-dark rounded-0 px-3 py-2"
              data-bs-dismiss="modal"
            >
              Manage User
            </button>
            <button type="button" class="btn btn-primary rounded-0 px-3 py-2">
              Mark Resolved
            </button>
            <button
              type="button"
              class="btn btn-outline-danger rounded-0 px-3 py-2"
              data-bs-dismiss="modal"
            >
              Delete Report
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

declare interface Header {
  key: string;
  label: string;
}

declare interface Report {
  notificationId: string;
  reportId: string;
  senderId: string;
  violatorId: string;
  type: string;
  subject: string;
  message: string;
  violatorName: string;
  reporterName: string;
  reportType: string;
  resolved: boolean;
  anonymous: boolean;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: "ReportsTable",
  props: {
    headers: {
      type: Array as () => Header[],
      required: true,
    },
    reports: {
      type: Array as () => Report[],
      required: true,
    },
  },
  data() {
    return {
      filterBy: "violatorName",
      ascending: true,
      filteredReports: [] as Report[],
      searchText: "",
      selectedReport: {} as Report,
    };
  },
  methods: {
    setSelectedReport(report: Report): void {
      this.selectedReport = report;
    },
    setSearchText(data: string): void {
      this.searchText = data;
      if (data.length === 0) {
        this.filteredReports = Object.assign([], this.reports);
      } else {
        this.filteredReports = this.reports.filter((report: Report) => {
          const key = report[this.filterBy as keyof Report] as string;
          return key.toLowerCase().includes(data.toLowerCase());
        });
      }
    },
    setFilterBy(filterBy: string): void {
      if (filterBy === this.filterBy) {
        this.ascending = !this.ascending;
      } else {
        this.filterBy = filterBy;
        this.ascending = true;
      }

      switch (filterBy) {
        case "violatorName":
          this.filteredReports.sort((a, b) => {
            return this.ascending
              ? a.violatorName.localeCompare(b.violatorName)
              : b.violatorName.localeCompare(a.violatorName);
          });
          break;
        case "reporterName":
          this.filteredReports.sort((a, b) => {
            return this.ascending
              ? a.reporterName.localeCompare(b.reporterName)
              : b.reporterName.localeCompare(a.reporterName);
          });
          break;
        case "reportType":
          this.filteredReports.sort((a, b) => {
            return this.ascending
              ? a.reportType.localeCompare(b.reportType)
              : b.reportType.localeCompare(a.reportType);
          });
          break;
        case "subject":
          this.filteredReports.sort((a, b) => {
            return this.ascending
              ? a.subject.localeCompare(b.subject)
              : b.subject.localeCompare(a.subject);
          });
          break;
        default:
          this.filteredReports.sort((a, b) => {
            return this.ascending
              ? a.violatorName.localeCompare(b.violatorName)
              : b.violatorName.localeCompare(a.violatorName);
          });
          break;
      }
    },
  },
  mounted() {
    this.filterBy = this.headers[0].key;
    this.filteredReports = Object.assign([], this.reports);
    this.setFilterBy(this.filterBy);
  },
  watch: {
    reports: function (data: Report[]) {
      this.filteredReports = Object.assign([], data);
      this.setFilterBy(this.filterBy);
    },
  },
});
</script>

<style scoped lang="scss">
::placeholder {
  color: #f8f9fa !important;
}
</style>
