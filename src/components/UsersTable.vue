<template>
  <div class="table-responsive" id="usersTable">
    <table
      class="table table-hover table-responsive table-admin overflow-hidden rounded-1"
    >
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
        <tr
          v-for="(member, idx) in filteredMembers"
          :key="member.memberId"
          class="align-middle border-3 border-start-0 border-end-0 border-primary"
        >
          <template v-for="(header, index) in headers">
            <template v-if="header.key === 'name'">
              <td :key="index" class="text-center pt-4">
                <div class="d-flex justify-content-start">
                  <input
                    class="form-check-input mx-4"
                    type="checkbox"
                    :id="`checkbox-${idx}`"
                    :value="member"
                    :checked="selectedUsers.includes(member)"
                    @change="toggleCheckbox(member)"
                  />
                  <p>{{ member[header.key] }}</p>
                </div>
              </td>
            </template>

            <template v-else-if="header.key === 'actions'">
              <td :key="index" class="text-center pt-4">
                <button
                  class="btn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                  id="button-addon2"
                >
                  <em class="bi bi-three-dots text-white"></em>
                </button>
                <ul class="dropdown-menu mx-1">
                  <li class="text-start my-1">
                    <button class="dropdown-item" type="button">
                      <i class="bi bi-bar-chart-fill text-start">
                        View Statistics</i
                      >
                    </button>
                  </li>
                  <li class="text-start my-1">
                    <a
                      class="dropdown-item"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#actionsModal"
                      @click="runSingleAction(member, 'Warn')"
                    >
                      <i class="bi bi-exclamation-circle"> Warn</i>
                    </a>
                  </li>
                  <li class="text-start my-1">
                    <a
                      class="dropdown-item"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#actionsModal"
                      @click="runSingleAction(member, 'Suspend')"
                    >
                      <i class="bi bi-lock"> Suspend</i>
                    </a>
                  </li>
                  <li class="text-start my-1">
                    <a
                      class="dropdown-item"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#actionsModal"
                      @click="runSingleAction(member, 'Delete')"
                    >
                      <i class="bi bi-dash-circle"> Delete</i>
                    </a>
                  </li>
                </ul>
              </td>
            </template>

            <template v-else>
              <td :key="index" class="text-center pt-4">
                <p>{{ member[header.key] }}</p>
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

declare interface UserDetails {
  memberId: string;
  name: string;
  address: string;
  number: string;
  type: string;
  verification: string;
}

export default defineComponent({
  name: "UsersTable",
  props: {
    headers: {
      type: Array as () => Header[],
      required: true,
    },
    members: {
      type: Array as () => UserDetails[],
      required: true,
    },
    selectedUsers: {
      type: Array as () => UserDetails[],
      required: true,
    },
  },
  data() {
    return {
      filterBy: "name",
      ascending: true,
      searchText: "",
      filteredMembers: [] as UserDetails[],
      selectedMembers: this.selectedUsers,
      filteredUsers: {} as UserDetails,
    };
  },
  methods: {
    toggleCheckbox(member: UserDetails) {
      this.$emit("update:selectedUsers", member);
    },
    runSingleAction(member: UserDetails, action: string) {
      this.$emit("runSingleAction", member, action);
    },
    setSelectedMembers(member: UserDetails): void {
      this.filteredUsers = member;
    },
    setSearchText(data: string): void {
      this.searchText = data;
      if (data.length === 0) {
        this.filteredMembers = Object.assign([], this.members);
      } else {
        this.filteredMembers = this.members.filter((report: UserDetails) => {
          const key = report[this.filterBy as keyof UserDetails] as string;
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
        case "name":
          this.filteredMembers.sort((a, b) => {
            return this.ascending
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          });
          break;
        case "address":
          this.filteredMembers.sort((a, b) => {
            return this.ascending
              ? a.address.localeCompare(b.address)
              : b.address.localeCompare(a.address);
          });
          break;
        case "number":
          this.filteredMembers.sort((a, b) => {
            return this.ascending
              ? a.number.localeCompare(b.number)
              : b.number.localeCompare(a.number);
          });
          break;
        case "type":
          this.filteredMembers.sort((a, b) => {
            return this.ascending
              ? a.type.localeCompare(b.type)
              : b.type.localeCompare(a.type);
          });
          break;
        case "verification":
          this.filteredMembers.sort((a, b) => {
            return this.ascending
              ? a.verification.localeCompare(b.verification)
              : b.verification.localeCompare(a.verification);
          });
          break;
      }
    },
  },
  mounted() {
    this.filterBy = this.headers[0].key;
    this.filteredMembers = Object.assign([], this.members);
    this.setFilterBy(this.filterBy);
  },
  watch: {
    members: function (data: UserDetails[]) {
      this.filteredMembers = Object.assign([], data);
      this.setFilterBy(this.filterBy);
    },
  },
});
</script>

<style scoped lang="scss"></style>
