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
        <li v-for="option in searchByOptions" :key="option">
          <button
            class="dropdown-item"
            :value="option"
            @click="setSearchBy(option)"
          >
            {{ option }}
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
        <li v-for="option in sortByOptions" :key="option">
          <button
            class="dropdown-item"
            :value="option"
            @click="setSortBy(option)"
          >
            {{ option }}
          </button>
        </li>
      </ul>
    </div>

    <div v-if="filteredUsers.length > 0" id="users">
      <FindComponent
        v-for="user in filteredUsers"
        :key="user.id"
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
import { Account } from "@/types";
import FindComponent from "@/components/Shared/FindUsersView/FindComponent.vue";

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
      searchByOptions: ["Name", "Address"] as string[],
      sortBy: "Distance",
      sortByOptions: ["Distance", "A to Z", "Z to A"] as string[],
      users: [
        {
          id: uuid.v1(),
          name: "Cebu Food Bank",
          avatar: "default_profile.png",
          email: "info@cebufoodbank.com",
          contact: "(32) 417 3322",
          address: "Pacific Square Building, Ayala Access Road, Cebu City",
          bio: "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample bio. Text labels need to be distinct from other elements. If the text label isn’t capitalized, it should use a different color, style, or layout from other text.",
        },
        {
          id: uuid.v1(),
          name: "Hipodromo Barangay Hall",
          avatar:
            "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg",
          email: "info@hipodromoBarangayHall.com",
          contact: "(32) 233 1311",
          address: "664 Saint Joseph St., Barangay Hipodromo, Cebu City",
          bio: "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample bio. Text labels need to be distinct from other elements. If the text label isn’t capitalized, it should use a different color, style, or layout from other text.",
        },
        {
          id: uuid.v1(),
          name: "JPIC-IDC Inc.",
          avatar:
            "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
          email: "info@jpic-idc.org.ph",
          contact: "(32) 254 5254",
          address: "L. Jaime Street, Maguikay, Mandaue City",
          bio: "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample bio. Text labels need to be distinct from other elements. If the text label isn’t capitalized, it should use a different color, style, or layout from other text.",
        },
      ] as Account[],
      filteredUsers: [] as Account[],
    };
  },
  methods: {
    setSortBy(sortVal: string) {
      this.sortBy = sortVal;

      if (this.sortBy === "Distance") {
        this.filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        switch (this.searchBy) {
          case "Name":
            this.filteredUsers.sort((a, b) => {
              return this.sortBy === "A to Z"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
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
              return a.name.localeCompare(b.name);
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
            ? user.name.toLowerCase().includes(data.toLowerCase())
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
