<template>
  <div class="container">
    <h1 v-if="role === 'Donor'" class="text-start fw-bold pt-5 pb-3">
      Find Charities
    </h1>
    <h1 v-else-if="role === 'Charity'" class="text-start fw-bold pt-5 pb-3">
      Find Donors
    </h1>
    <h1 v-else class="text-start fw-bold pt-5 pb-3">Find</h1>

    <div class="input-group rounded-3 mb-5">
      <input
        type="text"
        class="form-control form-control-lg border-primary p-sm-3"
        aria-label="Text input with dropdown button"
        placeholder="Search here..."
        id="find-search-bar"
      />
      <button
        class="btn btn-outline-secondary dropdown-toggle"
        type="toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="searchBy-btn"
      >
        Search by: {{ searchByVal }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li>
          <button
            class="dropdown-item"
            value="Name"
            @click="SelectSearchBy('Name')"
          >
            Name
          </button>
        </li>
        <li>
          <button
            class="dropdown-item"
            value="Address"
            @click="SelectSearchBy('Address')"
          >
            Address
          </button>
        </li>
      </ul>
      <button
        class="btn btn-outline-secondary dropdown-toggle"
        type="toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="sortBy-btn"
      >
        Sort by: {{ sortByVal }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li>
          <button
            class="dropdown-item"
            value="Distance"
            @click="SelectSortBy('Distance')"
          >
            Distance
          </button>
        </li>
        <li>
          <button
            class="dropdown-item"
            value="A to Z"
            @click="SelectSortBy('A to Z')"
          >
            A to Z
          </button>
        </li>
        <li>
          <button
            class="dropdown-item"
            value="Z to A"
            @click="SelectSortBy('Z to A')"
          >
            Z to A
          </button>
        </li>
      </ul>
    </div>

    <div id="find-users-section" v-if="findResults.length > 0">
      <div
        v-for="findResult in findResults"
        :key="findResult.userID"
        class="mb-5"
      >
        <FindComponent :findResult="findResult" />
      </div>
    </div>
    <div v-else class="m-5">
      <h3 class="text-center text-black-50">No results found.</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FindComponent from "@/components/FindComponent.vue";

export default defineComponent({
  name: "FindUsersView",
  components: {
    FindComponent,
  },
  data() {
    return {
      role: "",
      searchByVal: "Name",
      sortByVal: "Distance",
      findResults: [] as Array<any>,
    };
  },
  methods: {
    SelectSearchBy(searchVal: string) {
      this.searchByVal = searchVal;
    },
    SelectSortBy(sortVal: string) {
      this.sortByVal = sortVal;
    },
  },
  created() {
    this.findResults = [
      {
        userID: 1,
        username: "Cebu Food Bank",
        address: "Pacific Square Building, Ayala Access Road, Cebu City",
        description:
          "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements. If the text label isn’t capitalized, it should use a different color, style, or layout from other text.",
        email: "info@cebufoodbank.com",
        contact: "(32) 417 3322",
        profileImage: "default_profile.png",
      },
      {
        userID: 2,
        username: "Hipodromo Barangay Hall",
        address: "664 Saint Joseph St., Barangay Hipodromo, Cebu City",
        description:
          "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements. If the text label isn’t capitalized, it should use a different color, style, or layout from other text.",
        email: "info@hipodromoBarangayHall.com",
        contact: "(32) 233 1311",
        profileImage:
          "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg",
      },
      {
        userID: 3,
        username: "JPIC-IDC Inc.",
        address: "L. Jaime Street, Maguikay, Mandaue City",
        description:
          "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements. If the text label isn’t capitalized, it should use a different color, style, or layout from other text.",
        email: "info@jpic-idc.org.ph",
        contact: "(32) 254 5254",
        profileImage:
          "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      },
    ];
  },
});
</script>

<style lang="scss">
.input-group > .form-control {
  font-size: 1rem !important;
  border-radius: 2rem 0rem 0rem 2rem !important;
}

.input-group > button:nth-last-of-type(1) {
  border-radius: 0rem 2rem 2rem 0rem !important;
}

@media (max-width: 576px) {
  .input-group {
    flex-direction: column !important;
  }

  .input-group > .form-control {
    width: 100% !important;
    border-radius: 2rem !important;
    margin-bottom: 0.5rem !important;
  }

  .input-group > button:nth-last-of-type(2) {
    width: 100% !important;
    border-radius: 2rem !important;
    margin-bottom: 0.5rem !important;
  }

  .input-group > button:nth-last-of-type(1) {
    width: 100% !important;
    border-radius: 2rem !important;
  }
}
</style>
