<template>
  <div class="donations-table table-responsive-md mt-2 mb-3">
    <table class="table table-borderless">
      <thead class="table-primary">
        <tr class="align-middle">
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="sorting-column py-2"
            scope="col"
          >
            <div class="d-flex justify-content-center">
              <button
                type="button"
                class="btn w-100 d-flex flex-row align-items-center justify-content-center gap-3"
                @click="setFilterBy(header.key)"
                :ref="`sortBy${
                  header.key.charAt(0).toUpperCase() + header.key.slice(1)
                }`"
              >
                <p class="fw-bold m-0">
                  {{ header.label }}
                </p>
                <div class="d-flex flex-column">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    :fill="
                      filterBy === header.key && ascending
                        ? '#000000'
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
                        ? '#000000'
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
      <tbody>
        <tr
          v-for="donation in filteredDonations"
          :key="donation.itemId"
          class="donation align-middle"
        >
          <template v-for="(header, index) in headers">
            <template
              v-if="header.key !== 'quantity' && header.key !== 'weight'"
            >
              <td :key="index" class="text-center py-2">
                {{ donation[header.key] }}
              </td>
            </template>

            <template v-else-if="header.key === 'quantity'">
              <td :key="index" class="text-center py-2">
                {{
                  `${donation[header.key]} ${
                    donation[header.key] > 1 ? "pieces" : "piece"
                  }`
                }}
              </td>
            </template>

            <template v-else-if="header.key === 'weight'">
              <td :key="index" class="text-center py-2">
                {{
                  `${donation[header.key]} ${
                    donation[header.key] !== 1 ? "kilos" : "kilo"
                  }`
                }}
              </td>
            </template>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

declare interface Header {
  key: string;
  label: string;
}

declare interface FoodItem {
  itemId: number;
  name: string;
  type: string;
  stage: string;
  quantity: number;
  weight: number;
  createdAt: string;
}

export default defineComponent({
  name: "DonationsTable",
  props: {
    headers: {
      type: Array as () => Header[],
      required: true,
    },
    donations: {
      type: Array as () => FoodItem[],
      required: true,
    },
  },
  data() {
    return {
      filterBy: "name",
      ascending: true,
      filteredDonations: [] as FoodItem[],
    };
  },
  methods: {
    setFilterBy(filterBy: string) {
      if (filterBy === this.filterBy) {
        this.ascending = !this.ascending;
      } else {
        this.filterBy = filterBy;
        this.ascending = true;
      }

      switch (filterBy) {
        case "name":
          this.filteredDonations.sort((a, b) => {
            return this.ascending
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          });
          break;
        case "type":
          this.filteredDonations.sort((a, b) => {
            return this.ascending
              ? a.name.localeCompare(b.type)
              : b.name.localeCompare(a.type);
          });
          break;
        case "stage":
          this.filteredDonations.sort((a, b) => {
            return this.ascending
              ? a.name.localeCompare(b.stage)
              : b.name.localeCompare(a.stage);
          });
          break;
        case "quantity":
          this.filteredDonations.sort((a, b) => {
            return this.ascending
              ? a.quantity - b.quantity
              : b.quantity - a.quantity;
          });
          break;
        case "weight":
          this.filteredDonations.sort((a, b) => {
            return this.ascending ? a.weight - b.weight : b.weight - a.weight;
          });
          break;
        default:
          this.filteredDonations.sort((a, b) => {
            return this.ascending
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          });
          break;
      }
    },
  },
  mounted() {
    this.filterBy = this.headers[0].key;
    this.setFilterBy(this.filterBy);
  },
});
</script>

<style scoped lang="scss"></style>
