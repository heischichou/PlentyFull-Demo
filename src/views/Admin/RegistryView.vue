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
          >
            <em class="bi bi-list text-white fs-3"></em>
          </button>
          <ul
            class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap justify-content-around align-items-center w-100 mb-auto"
          >
            <li class="nav-item h-100 w-100" :class="show ? 'text-start' : ''">
              <a
                @click="togglePages(true, false, false)"
                class="nav-link link-white py-3 px-4 w-100 rounded-0"
                :class="signUp ? 'active' : ''"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-title="Awaiting Transactions"
                aria-label="Awaiting Transactions"
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
                @click="togglePages(false, true, false)"
                class="nav-link link-white py-3 px-4 w-100 rounded-0"
                :class="manageUsers ? 'active' : ''"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-title="Completed Transactions"
                aria-label="Completed Transactions"
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
                @click="togglePages(false, false, true)"
                class="nav-link link-white py-3 px-4 w-100 rounded-0"
                :class="reports ? 'active' : ''"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-title="Cancelled Transactions"
                aria-label="Cancelled Transactions"
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
        <h1
          class="text-start text-white fw-bold pb-3"
          v-text="updateTitle()"
        ></h1>
        <p class="text-white">Insert content here</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RegistryView",
  data() {
    return {
      show: true,
      signUp: true,
      manageUsers: false,
      reports: false,
    };
  },
  methods: {
    updateTitle() {
      if (this.signUp) {
        return "Registration";
      } else if (this.manageUsers) {
        return "Members";
      } else if (this.reports) {
        return "Reports";
      } else {
        return "Title";
      }
    },
    toggleSidebar() {
      this.show = !this.show;
    },
    hideSideBarText() {
      const width = window.innerWidth;
      if (width < 576) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    togglePages(
      signUpdate: boolean,
      manageUsersUpdate: boolean,
      reportsUpdate: boolean
    ) {
      this.signUp = signUpdate;
      this.manageUsers = manageUsersUpdate;
      this.reports = reportsUpdate;
    },
  },
  mounted() {
    window.addEventListener("resize", this.hideSideBarText);
  },
});
</script>

<style lang="scss">
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
