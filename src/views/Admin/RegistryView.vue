<template>
  <div class="container-fluid bg-registry p-0">
    <div class="row">
      <div class="col-sm-auto sticky-top pe-0 shadow-sm">
        <div
          class="navbar d-flex flex-sm-column flex-row flex-nowrap bg-registry border-end border-green border-2 h-100 sticky-top p-0"
          role="navigation"
          id="sideBar"
        >
          <button
            class="navbar-toggler align-self-start d-none d-sm-block border-0 my-3 mx-3"
            type="button"
            aria-label="Toggle Sidebar"
            @click="toggleSidebar"
            ref="sidebarToggle"
          >
            <em class="bi bi-list text-white fs-3"></em>
          </button>
          <ul
            class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap justify-content-around align-items-center w-100 mb-auto"
          >
            <li class="nav-item h-100 w-100" :class="show ? 'text-start' : ''">
              <a
                @click="switchTab('Registration')"
                class="nav-link link-white py-3 px-4 w-100 rounded-0"
                :class="activeTab === 'Registration' ? 'active' : ''"
                role="button"
                ref="registration"
              >
                <div class="d-inline-flex align-items-center">
                  <i
                    class="bi bi-hourglass text-white fs-2"
                    :class="show ? 'me-3' : ''"
                  ></i>
                  <p class="m-0" v-show="show">Sign Up Requests</p>
                </div>
              </a>
            </li>
            <li class="nav-item h-100 w-100" :class="show ? 'text-start' : ''">
              <a
                @click="switchTab('Members')"
                class="nav-link link-white py-3 px-4 w-100 rounded-0"
                :class="activeTab === 'Members' ? 'active' : ''"
                role="button"
                ref="members"
              >
                <div class="d-inline-flex align-items-center">
                  <i
                    class="bi bi-clipboard-check text-white fs-2"
                    :class="show ? 'me-3' : ''"
                  ></i>
                  <p class="m-0" v-show="show">Manage Users</p>
                </div>
              </a>
            </li>
            <li class="nav-item h-100 w-100" :class="show ? 'text-start' : ''">
              <a
                @click="switchTab('Reports')"
                class="nav-link link-white py-3 px-4 w-100 rounded-0"
                :class="activeTab === 'Reports' ? 'active' : ''"
                role="button"
                ref="reports"
              >
                <div class="d-inline-flex align-items-center">
                  <i
                    class="bi bi-slash-circle text-white fs-2"
                    :class="show ? 'me-3' : ''"
                  ></i>
                  <p class="m-0" v-show="show">Reports</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-sm p-5 min-vh-100">
        <h1 class="text-start text-white fw-bold pb-4">{{ activeTab }}</h1>
        <div v-show="activeTab === 'Registration'">
          <div id="requestsSection" v-if="requests.length > 0">
            <div v-if="sortedRequests.length > 0">
              <SignUpRequest
                v-for="request in sortedRequests.slice(
                  (currentPage - 1) * perPage,
                  currentPage * perPage
                )"
                class="mb-3"
                :key="request.id"
                :request="request"
                :dateDuration="
                  convertToDuration(request.createdAt, new Date().toISOString())
                "
              />
              <RequestsPagination
                :maxVisibleButtons="visibleButtons"
                :totalRequests="totalRequests"
                :perPage="perPage"
                :currentPage="currentPage"
                @pageChanged="onPageChange"
              />
            </div>
          </div>

          <div v-else>
            <h3 class="text-white">No requests found.</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uuid } from "vue-uuid";
import { DateTime } from "luxon";
import SignUpRequest from "@/components/Admin/SignUpRequest.vue";
import RequestsPagination from "@/components/Admin/RequestsPagination.vue";

declare interface Request {
  id: string;
  requestName: string;
  organizationType: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  proof: string;
  createdAt: string;
}

export default defineComponent({
  name: "RegistryView",
  components: {
    SignUpRequest,
    RequestsPagination,
  },
  data() {
    return {
      role: "Admin",
      activeTab: "Registration",
      show: true,
      requests: [] as Array<Request>,
      sortedRequests: [] as Array<Request>,
      visibleButtons: 0,
      totalRequests: 0,
      perPage: 3,
      currentPage: 1,
    };
  },
  methods: {
    switchTab(tab: string) {
      this.activeTab = tab;
    },
    toggleSidebar() {
      this.show = !this.show;
    },
    hideSideBarText() {
      const width = window.innerWidth;
      if (width < 768) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    onPageChange(page: number) {
      this.currentPage = page;
    },
    sortRequests() {
      const sorted = this.requests
        .slice()
        .sort(
          (a, b) =>
            new Date(b["createdAt"]).getTime() -
            new Date(a["createdAt"]).getTime()
        );
      this.sortedRequests = Object.assign([], sorted);
    },
    convertToDuration(date: string, current: string) {
      date = new Date(date).toISOString();
      const createdAt = DateTime.fromISO(date);
      const currentDate = DateTime.fromISO(current);
      const duration = currentDate
        .diff(createdAt, [
          "years",
          "months",
          "weeks",
          "days",
          "hours",
          "minutes",
          "seconds",
          "milliseconds",
        ])
        .toObject();
      const units = [
        { value: duration.years ?? 0, unit: "year" },
        { value: duration.months ?? 0, unit: "month" },
        { value: duration.weeks ?? 0, unit: "week" },
        { value: duration.days ?? 0, unit: "day" },
        { value: duration.hours ?? 0, unit: "hour" },
        { value: duration.minutes ?? 0, unit: "minute" },
        { value: duration.seconds ?? 0, unit: "second" },
      ];

      for (const unit of units) {
        if (unit.value >= 1) {
          return `${unit.value} ${
            unit.value === 1 ? unit.unit : unit.unit + "s"
          } ago`;
        }
      }

      return "Just now";
    },
  },
  computed: {
    getTotalRequests: function (): number {
      return this.requests.length;
    },
    setVisibleButtons: function (): number {
      const pages = Math.ceil(this.totalRequests / this.perPage);
      if (this.totalRequests > 0 && pages >= 3) {
        return 3;
      } else {
        return pages;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.hideSideBarText);
    this.requests = [
      {
        id: uuid.v1(),
        requestName: "Cebu Food Bank",
        organizationType: "Charity",
        description:
          "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
        location: "CMG Bldg, M. C. Briones St, Tipolo, Mandaue City",
        email: "info@cebufoodbank.com",
        phone: "(32) 417 3322",
        proof: "https://my.alfred.edu/zoom/_images/foster-lake.jpg",
        createdAt: new Date().toString(),
      },
      {
        id: uuid.v1(),
        requestName: "JPIC-IDC Inc.",
        organizationType: "Charity",
        description:
          "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
        location: "CMG Bldg, M. C. Briones St, Tipolo, Mandaue City",
        email: "info@JPIC.com",
        phone: "(32) 417 3322",
        proof: "https://www.imagelighteditor.com/img/bg-after.jpg",
        createdAt: "7/13/2023 2:00:00 AM",
      },
      {
        id: uuid.v1(),
        requestName: "Hipodromo Barangay Hall",
        organizationType: "Charity",
        description:
          "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
        location: "CMG Bldg, M. C. Briones St, Tipolo, Mandaue City",
        email: "info@Hipodromo.com",
        phone: "(32) 417 3322",
        proof: "sampleImage.img",
        createdAt: "7/12/2023 1:50:00 AM",
      },
    ];
    this.totalRequests = this.getTotalRequests;
    this.visibleButtons = this.setVisibleButtons;
    this.sortRequests();
  },
});
</script>

<style lang="scss" scoped>
#sideBar > ul > li > .nav-link.active {
  background-color: rgba(#45bf5d, 0.53) !important;
  @media (max-width: 576px) {
    box-shadow: 0px -5px 0px #6ef997 inset !important;
  }
  @media (min-width: 576px) {
    box-shadow: -5px 0px 0px #6ef997 inset !important;
  }
}
</style>
