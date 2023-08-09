<template>
  <div class="registry container-fluid bg-admin p-0">
    <div class="row">
      <div class="col-xl-auto sticky-top pe-0 shadow-sm">
        <div
          class="navbar d-flex flex-row flex-xl-column flex-nowrap bg-admin border-end border-green border-2 h-100 sticky-top p-0"
          role="navigation"
          id="sideBar"
        >
          <button
            class="navbar-toggler align-self-start d-none d-xl-block border-0 my-3 mx-3"
            type="button"
            aria-label="Toggle Sidebar"
            @click="toggleSidebar"
            ref="sidebarToggle"
          >
            <em class="bi bi-list text-white fs-3"></em>
          </button>
          <ul
            class="nav nav-pills nav-flush flex-row flex-xl-column flex-nowrap justify-content-around align-items-center w-100 mb-auto"
          >
            <li class="nav-item h-100 w-100" :class="show ? 'text-start' : ''">
              <a
                @click="switchTab('Registration')"
                id="registrationTab"
                class="nav-link link-white py-3 px-4 w-100 rounded-0"
                :class="activeTab === 'Registration' ? 'active' : ''"
                role="button"
              >
                <div class="d-inline-flex align-items-center">
                  <i
                    class="bi bi-hourglass text-white fs-2"
                    :class="show ? 'me-3' : ''"
                  ></i>
                  <p class="m-0" v-if="show">Sign Up Requests</p>
                </div>
              </a>
            </li>
            <li class="nav-item h-100 w-100" :class="show ? 'text-start' : ''">
              <a
                @click="switchTab('Members')"
                id="membersTab"
                class="nav-link link-white py-3 px-4 w-100 rounded-0"
                :class="activeTab === 'Members' ? 'active' : ''"
                role="button"
              >
                <div class="d-inline-flex align-items-center">
                  <i
                    class="bi bi-clipboard-check text-white fs-2"
                    :class="show ? 'me-3' : ''"
                  ></i>
                  <p class="m-0" v-if="show">Manage Users</p>
                </div>
              </a>
            </li>
            <li class="nav-item h-100 w-100" :class="show ? 'text-start' : ''">
              <a
                @click="switchTab('Reports')"
                id="reportsTab"
                class="nav-link link-white py-3 px-4 w-100 rounded-0"
                :class="activeTab === 'Reports' ? 'active' : ''"
                role="button"
              >
                <div class="d-inline-flex align-items-center">
                  <i
                    class="bi bi-slash-circle text-white fs-2"
                    :class="show ? 'me-3' : ''"
                  ></i>
                  <p class="m-0" v-if="show">Reports</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md p-5 min-vh-100">
        <h1 class="text-start text-white fw-bold pb-4">{{ activeTab }}</h1>

        <Registration v-if="activeTab === 'Registration'" />
        <ManageUsers v-if="activeTab === 'Members'" />
        <UserReports v-if="activeTab === 'Reports'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Registration from "@/components/Admin/RegistryView/UserRegistration/UserRegistration.vue";
import UserReports from "@/components/Admin/RegistryView/UserReports/UserReports.vue";
import ManageUsers from "@/components/Admin/RegistryView/ManageUsers/ManageUsers.vue";

export default defineComponent({
  name: "RegistryView",
  components: {
    Registration,
    UserReports,
    ManageUsers,
  },
  data() {
    return {
      activeTab: "Registration",
      show: true,
    };
  },
  methods: {
    switchTab(tab: string) {
      this.activeTab = tab;
    },
    toggleSidebar() {
      this.show = !this.show;
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.show = window.innerWidth > 768;
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", () => {
      this.show = window.innerWidth > 768;
    });
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

.registry :deep(.search-bar ::placeholder) {
  color: #f8f9fa !important;
}

.registry :deep(.pagination .page-link) {
  color: #fff;
  background-color: transparent;
  border: 1px solid #6ef997;
}

.registry :deep(.pagination .page-link:hover) {
  z-index: 2;
  background-color: #57cd7a2e;
  cursor: pointer;
}

.registry :deep(.pagination .page-link.disabled) {
  color: #afafaf;
  pointer-events: none;
  background-color: #57cd7a2e;
  border-color: #57cd7a2e;
}

.registry :deep(.pagination .disabled > .page-link) {
  color: #afafaf;
  pointer-events: none;
  background-color: #57cd7a2e;
  border-color: #57cd7a2e;
}

.registry :deep(.pagination .page-item.active .page-link) {
  color: #000000;
  background-color: #57cd7a;
  border-color: #57cd7a;
}
</style>
