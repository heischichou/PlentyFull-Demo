<template>
  <div class="find-users container">
    <h1 class="text-start fw-bold pt-5 pb-3">
      Find {{ role === "Donor" ? "Charities" : "Donors" }}
    </h1>

    <div class="search input-group flex-column flex-sm-row rounded-pill mb-5">
      <input
        type="text"
        class="form-control form-control-lg border-primary rounded-start-5 fs-6 mb-2 mb-sm-0 p-sm-3"
        aria-label="Search by"
        placeholder="Search here..."
        id="searchBar"
        :value="searchText"
        @change="setSearchText($event.target.value)"
      />
      <button
        class="btn btn-outline-secondary dropdown-toggle mb-2 mb-sm-0"
        type="toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="searchBy"
      >
        Search by: {{ searchBy }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end" id="searchByDropdown">
        <li>
          <button
            class="dropdown-item"
            value="Name"
            @click="setSearchBy('Name')"
          >
            Name
          </button>
        </li>
        <li>
          <button
            class="dropdown-item"
            value="Address"
            @click="setSearchBy('Address')"
          >
            Address
          </button>
        </li>
      </ul>
      <button
        class="btn btn-outline-secondary dropdown-toggle rounded-end-5"
        type="toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="sortBy"
      >
        Sort by: {{ sortBy }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end" id="sortByDropdown">
        <li>
          <button
            class="dropdown-item"
            value="Distance"
            @click="setSortBy('Distance')"
          >
            Distance
          </button>
        </li>
        <li>
          <button
            class="dropdown-item"
            value="A to Z"
            @click="setSortBy('A to Z')"
          >
            A to Z
          </button>
        </li>
        <li>
          <button
            class="dropdown-item"
            value="Z to A"
            @click="setSortBy('Z to A')"
          >
            Z to A
          </button>
        </li>
      </ul>
    </div>

    <div v-if="filteredUsers.length > 0" id="users">
      <FindComponent
        v-for="user in filteredUsers"
        :key="user.userId"
        :user="user"
      />
    </div>
    <div v-else class="m-5">
      <h3 class="text-center text-black-50">No users found.</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uuid } from "vue-uuid";
import FindComponent from "@/components/Shared/FindUsersView/FindComponent.vue";

declare interface User {
  userId: string;
  username: string;
  avatar: string;
  email: string;
  contact: string;
  address: string;
  description: string;
}

export default defineComponent({
  name: "FindUsersView",
  components: {
    FindComponent,
  },
  data() {
    return {
      role: "",
      searchText: "",
      searchBy: "Name",
      sortBy: "Distance",
      users: [
        {
          userId: uuid.v1(),
          username: "Cebu Food Bank",
          avatar: "default_profile.png",
          email: "info@cebufoodbank.com",
          contact: "(32) 417 3322",
          address: "Pacific Square Building, Ayala Access Road, Cebu City",
          description:
            "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements. If the text label isn’t capitalized, it should use a different color, style, or layout from other text.",
        },
        {
          userId: uuid.v1(),
          username: "Hipodromo Barangay Hall",
          avatar:
            "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg",
          email: "info@hipodromoBarangayHall.com",
          contact: "(32) 233 1311",
          address: "664 Saint Joseph St., Barangay Hipodromo, Cebu City",
          description:
            "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements. If the text label isn’t capitalized, it should use a different color, style, or layout from other text.",
        },
        {
          userId: uuid.v1(),
          username: "JPIC-IDC Inc.",
          avatar:
            "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
          email: "info@jpic-idc.org.ph",
          contact: "(32) 254 5254",
          address: "L. Jaime Street, Maguikay, Mandaue City",
          description:
            "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements. If the text label isn’t capitalized, it should use a different color, style, or layout from other text.",
        },
      ] as User[],
      filteredUsers: [] as User[],
    };
  },
  methods: {
    setSortBy(sortVal: string) {
      this.sortBy = sortVal;

      if (this.sortBy === "Distance") {
        this.filteredUsers.sort((a, b) => a.username.localeCompare(b.username));
      } else {
        switch (this.searchBy) {
          case "Name":
            this.filteredUsers.sort((a, b) => {
              return this.sortBy === "A to Z"
                ? a.username.localeCompare(b.username)
                : b.username.localeCompare(a.username);
            });
            break;
          case "Address":
            this.filteredUsers.sort((a, b) => {
              return this.sortBy === "A to Z"
                ? a.address.localeCompare(b.address)
                : b.address.localeCompare(a.address);
            });
            break;
          default:
            this.filteredUsers.sort((a, b) => {
              return a.username.localeCompare(b.username);
            });
            break;
        }
      }
    },
    setSearchBy(searchVal: string) {
      this.searchBy = searchVal;
      this.setSortBy(this.sortBy);
    },
    setSearchText(data: string) {
      this.searchText = data;
      if (data.length === 0) {
        this.filteredUsers = Object.assign([], this.users);
      } else {
        this.filteredUsers = this.users.filter((user) => {
          return this.searchBy === "Name"
            ? user.username.toLowerCase().includes(data.toLowerCase())
            : user.address.toLowerCase().includes(data.toLowerCase());
        });
      }
      this.setSortBy(this.sortBy);
    },
  },
  mounted() {
    this.filteredUsers = Object.assign([], this.users);
  },
});
</script>

<style scoped lang="scss">
.find-users :deep(.avatar) {
  width: 60px;
  height: 60px;
}

@media (max-width: 576px) {
  .search > .form-control,
  .search > button {
    width: 100% !important;
    border-radius: 2rem !important;
  }
}
</style>
