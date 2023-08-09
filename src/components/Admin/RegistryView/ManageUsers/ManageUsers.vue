<template>
  <form id="manageUsers" v-if="members.length > 0">
    <Users
      class="mb-5"
      :headers="headers"
      :members="
        members.slice((currentPage - 1) * perPage, currentPage * perPage)
      "
      :selectedUsers="selectedUsers"
      @update:selectedUsers="onSelectedUserChange"
      @runSingleAction="onRunSingleAction"
      @toggleModal="toggleModal"
      @resetSelected="resetSelected"
    />
    <ActionsModal
      :action="actionModal"
      :isVisible="showModal"
      :selectedUsers="selectedUsers"
      @closeModal="closeModal"
      @removeSelected="removeSelected"
      @cancelAction="cancelAction"
    />
    <Pagination
      aria-label="Manage Users Pagination"
      :maxVisibleButtons="visibleButtons"
      :totalItems="totalMembers"
      :perPage="perPage"
      :currentPage="currentPage"
      @pageChanged="onPageChange"
    />
  </form>

  <div v-else>
    <h3 class="text-white">No users found.</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uuid } from "vue-uuid";
import { Header } from "@/types";
import { Account } from "@/types/Admin";
import Users from "./UsersTable.vue";
import ActionsModal from "./ActionsModal.vue";
import Pagination from "@/components/Admin/RegistryView/RegistryPagination.vue";

export default defineComponent({
  name: "ManageUsers",
  components: {
    Users,
    ActionsModal,
    Pagination,
  },
  data() {
    return {
      showModal: false,
      actionModal: "",
      headers: [
        { key: "name", label: "Name" },
        { key: "address", label: "Address" },
        { key: "contact", label: "Contact No." },
        { key: "type", label: "User Type" },
        { key: "verified", label: "Verified" },
        { key: "actions", label: "" },
      ] as Header[],
      members: [] as Account[],
      visibleButtons: 0,
      totalMembers: 0,
      perPage: 5,
      currentPage: 1,
      selectedUsers: [] as Account[],
    };
  },
  computed: {
    getTotalMembers: function (): number {
      return this.members.length;
    },
    setVisibleButtons: function (): number {
      const pages = Math.ceil(this.totalMembers / this.perPage);
      return this.totalMembers > 0 && pages >= 3 ? 3 : pages;
    },
  },
  methods: {
    toggleModal(action: string) {
      this.actionModal = action;
      this.showModal = !this.showModal;
    },
    closeModal() {
      this.showModal = false;
    },
    removeSelected(id: string) {
      const index = this.selectedUsers.findIndex((user) => user.id === id);
      this.selectedUsers.splice(index, 1);
    },
    resetSelected(): void {
      this.selectedUsers = Object.assign([], []);
    },
    cancelAction() {
      this.resetSelected();
      this.closeModal();
    },
    onSelectedUserChange(selectedMember: Account) {
      if (this.selectedUsers?.includes(selectedMember)) {
        this.removeSelected(selectedMember.id);
      } else {
        this.selectedUsers.push(selectedMember);
      }
    },
    onRunSingleAction(member: Account, action: string) {
      this.resetSelected();
      this.selectedUsers.push(member);
      this.toggleModal(action);
    },
    onPageChange(page: number) {
      this.currentPage = page;
    },
  },
  beforeMount() {
    this.members = Object.assign(
      [],
      [
        {
          id: uuid.v1(),
          name: "Hippodromo Barangay Hall",
          type: "Charity",
          address: "Hippodromo, Cebu City",
          contact: "032 233 1311",
          verified: true,
          createdAt: new Date().toString(),
        },
        {
          id: uuid.v1(),
          name: "Itaewon",
          type: "Donor",
          address: "Juan Luna Ave, Cebu City",
          contact: "032 233 1311",
          verified: true,
          createdAt: new Date().toString(),
        },
        {
          id: uuid.v1(),
          name: "JPIC-IDC Inc.",
          type: "Charity",
          address: "Maguikay, Mandaue City",
          contact: "032 233 1311",
          verified: true,
          createdAt: new Date().toString(),
        },
        {
          id: uuid.v1(),
          name: "Mayeen’s Catering Services",
          type: "Donor",
          address: "Cebu City",
          contact: "032 233 1311",
          verified: true,
          createdAt: new Date().toString(),
        },
        {
          id: uuid.v1(),
          name: "Pabugnawan",
          type: "Donor",
          address: "Sitio Nasipit, Cebu City",
          contact: "032 233 1311",
          verified: true,
          createdAt: new Date().toString(),
        },
        {
          id: uuid.v1(),
          name: "Jangoo",
          type: "Charity",
          address: "Cebu City",
          contact: "032 233 1311",
          verified: false,
          createdAt: new Date().toString(),
        },
        {
          id: uuid.v1(),
          name: "Kita Kits",
          type: "Donor",
          address: "Cebu City",
          contact: "032 233 1311",
          verified: false,
          createdAt: new Date().toString(),
        },
      ]
    );
    this.totalMembers = this.getTotalMembers;
    this.visibleButtons = this.setVisibleButtons;
  },
});
</script>

<style lang="scss" scoped></style>
