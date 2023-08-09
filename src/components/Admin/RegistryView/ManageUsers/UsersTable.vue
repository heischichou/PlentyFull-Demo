<template>
  <div id="members">
    <div class="search-bar input-group">
      <input
        type="text"
        class="form-control border-3 border-primary bg-transparent text-white rounded-end-0 rounded-top-4 px-4 py-3"
        placeholder="Search here..."
        id="searchBar"
        :value="searchText"
        @change="setSearchText($event.target.value)"
      />
      <button
        class="btn btn-outline-primary border-start-0 border-3 px-4"
        type="button"
        id="button-addon2"
        @click="
          () => {
            setSearchText('');
            $emit('resetSelected');
          }
        "
      >
        <em class="bi bi-arrow-clockwise text-white"></em>
      </button>
      <div
        class="d-flex justify-content-around align-items-center gap-3 border border-primary border-3 border-start-0 rounded-end-4 rounded-bottom-0 px-4"
      >
        <a
          ref="warn"
          role="button"
          class="link-white link-opacity-75-hover"
          data-bs-toggle="modal"
          data-bs-target="#actionsModal"
          @click="toggleModal('Warn')"
          ><em class="bi bi-exclamation-circle text-white"></em
        ></a>
        <a
          ref="suspend"
          role="button"
          class="link-white link-opacity-75-hover"
          data-bs-toggle="modal"
          data-bs-target="#actionsModal"
          @click="toggleModal('Suspend')"
          ><em class="bi bi-lock text-white"></em
        ></a>
        <a
          ref="delete"
          role="button"
          class="link-white link-opacity-75-hover"
          data-bs-toggle="modal"
          data-bs-target="#actionsModal"
          @click="toggleModal('Delete')"
          ><em class="bi bi-dash-circle text-white"></em
        ></a>
      </div>
    </div>
    <div class="users-table table-responsive mt-2 mb-3">
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
          <template v-if="filteredUsers.length > 0">
            <tr
              v-for="(member, idx) in filteredUsers"
              :key="member.memberId"
              class="align-middle border-3 border-start-0 border-end-0 border-primary"
            >
              <template v-for="(header, index) in headers">
                <template v-if="header.key === 'name'">
                  <td :key="index" class="py-4">
                    <div
                      class="d-flex align-items-center justify-content-start py-1"
                    >
                      <div class="my-auto">
                        <input
                          class="form-check-input mx-4"
                          type="checkbox"
                          :id="`checkbox-${idx}`"
                          :value="member"
                          :checked="selectedUsers.includes(member)"
                          @change="toggleCheckbox(member)"
                        />
                      </div>
                      <p class="text-start m-0">{{ member[header.key] }}</p>
                    </div>
                  </td>
                </template>

                <template v-else-if="header.key === 'actions'">
                  <td :key="index" class="text-center">
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

                <template v-else-if="header.key === 'verified'">
                  <td :key="index" class="text-center py-4">
                    <p class="m-0">
                      {{ member[header.key] === true ? "Yes" : "No" }}
                    </p>
                  </td>
                </template>

                <template v-else>
                  <td :key="index" class="text-center py-4">
                    <p class="m-0">{{ member[header.key] }}</p>
                  </td>
                </template>
              </template>
            </tr>
          </template>

          <template v-else>
            <tr
              class="align-middle border-3 border-start-0 border-end-0 border-primary"
            >
              <td class="py-3" :colspan="headers.length">No users found.</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Header } from "@/types";
import { Account } from "@/types/Admin";

export default defineComponent({
  name: "UsersTable",
  props: {
    headers: {
      type: Array as () => Header[],
      required: true,
    },
    members: {
      type: Array as () => Account[],
      required: true,
    },
    selectedUsers: {
      type: Array as () => Account[],
      required: true,
    },
  },
  data() {
    return {
      filterBy: "name",
      ascending: true,
      searchText: "",
      filteredUsers: [] as Account[],
    };
  },
  methods: {
    toggleModal(action: string) {
      this.$emit("toggleModal", action);
    },
    toggleCheckbox(member: Account) {
      this.$emit("update:selectedUsers", member);
    },
    runSingleAction(member: Account, action: string) {
      this.$emit("runSingleAction", member, action);
    },
    setSearchText(data: string): void {
      this.searchText = data;
      if (data.length === 0) {
        this.filteredUsers = Object.assign([], this.members);
      } else {
        this.filteredUsers = this.members.filter((report: Account) => {
          const key = report[this.filterBy as keyof Account] as string;
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
        case "address":
          this.filteredUsers.sort((a, b) => {
            return this.ascending
              ? a.address.localeCompare(b.address)
              : b.address.localeCompare(a.address);
          });
          break;
        case "contact":
          this.filteredUsers.sort((a, b) => {
            return this.ascending
              ? a.contact.localeCompare(b.contact)
              : b.contact.localeCompare(a.contact);
          });
          break;
        case "type":
          this.filteredUsers.sort((a, b) => {
            return this.ascending
              ? a.type.localeCompare(b.type)
              : b.type.localeCompare(a.type);
          });
          break;
        case "verified":
          this.filteredUsers.sort((a, b) => {
            return this.ascending
              ? Number(a.verified) - Number(b.verified)
              : Number(b.verified) - Number(a.verified);
          });
          break;
        case "name":
        default:
          this.filteredUsers.sort((a, b) => {
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
    this.filteredUsers = Object.assign([], this.members);
    this.setFilterBy(this.filterBy);
  },
  watch: {
    members: function (data: Account[]) {
      this.filteredUsers = Object.assign([], data);
      this.setFilterBy(this.filterBy);
    },
  },
});
</script>

<style scoped lang="scss"></style>
