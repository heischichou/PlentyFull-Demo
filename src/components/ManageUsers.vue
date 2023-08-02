<template>
  <div>
    <form action="get">
      <div class="input-group mb-2">
        <input
          type="text"
          class="form-control border-3 border-primary bg-transparent text-white rounded-end-0 rounded-top-4 px-4 py-3"
          placeholder="Search here..."
          id="searchbar"
          @change="setSearchText($event.target.value)"
        />
        <button
          class="btn btn-outline-primary border-start-0 border-3 px-4"
          type="button"
          id="button-addon2"
        >
          <em class="bi bi-arrow-clockwise text-white"></em>
        </button>
        <div
          class="d-flex justify-content-around align-items-center gap-3 border border-primary border-3 border-start-0 rounded-end-4 rounded-bottom-0 px-4"
        >
          <a
            ref="warnBtn"
            role="button"
            class="link-white link-opacity-75-hover"
            data-bs-toggle="modal"
            data-bs-target="#actionsModal"
            @click="toggleModal('Warn')"
            ><em class="bi bi-exclamation-circle text-white"></em
          ></a>
          <a
            ref="suspendBtn"
            role="button"
            class="link-white link-opacity-75-hover"
            data-bs-toggle="modal"
            data-bs-target="#actionsModal"
            @click="toggleModal('Suspend')"
            ><em class="bi bi-lock text-white"></em
          ></a>
          <a
            ref="deleteBtn"
            role="button"
            class="link-white link-opacity-75-hover"
            data-bs-toggle="modal"
            data-bs-target="#actionsModal"
            @click="toggleModal('Delete')"
            ><em class="bi bi-dash-circle text-white"></em
          ></a>
        </div>
      </div>
      <Members
        :headers="headers"
        :members="
          members.slice((currentPage - 1) * perPage, currentPage * perPage)
        "
        :selectedUsers="selectedUsers"
        @update:selectedUsers="onSelectedUserChange"
        @runSingleAction="onRunSingleAction"
      />
      <ActionsModal
        :action="actionModal"
        :isVisible="showModal"
        :selectedUsers="selectedUsers"
        @closeModal="closeModal"
        @removeSelected="removeSelected"
        @cancelAction="cancelAction"
      />
    </form>
    <Pagination
      :maxVisibleButtons="visibleButtons"
      :totalMembers="totalMembers"
      :perPage="perPage"
      :currentPage="currentPage"
      @pageChanged="onPageChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uuid } from "vue-uuid";
import Members from "./UsersTable.vue";
import ActionsModal from "@/components/Admin/ActionsModal.vue";
import Pagination from "./UsersPagination.vue";

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
  name: "MembersList",
  components: {
    Members,
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
        { key: "number", label: "Contact No." },
        { key: "type", label: "User Type" },
        { key: "verification", label: "Verified" },
        { key: "actions", label: "" },
      ] as Header[],
      members: [] as Array<UserDetails>,
      visibleButtons: 0,
      totalMembers: 0,
      perPage: 5,
      currentPage: 1,
      selectedUsers: [] as Array<UserDetails>,
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
      const index = this.selectedUsers.findIndex(
        (user) => user.memberId === id
      );
      this.selectedUsers.splice(index, 1);
    },
    resetSelected(): void {
      this.selectedUsers = Object.assign([], []);
    },
    cancelAction() {
      this.resetSelected();
      this.closeModal();
    },
    onSelectedUserChange(selectedMember: UserDetails) {
      if (this.selectedUsers?.includes(selectedMember)) {
        this.removeSelected(selectedMember.memberId);
      } else {
        this.selectedUsers.push(selectedMember);
      }
    },
    onRunSingleAction(member: UserDetails, action: string) {
      this.resetSelected();
      this.selectedUsers.push(member);
      this.toggleModal(action);
    },
    onPageChange(page: number) {
      this.currentPage = page;
    },
  },
  beforeMount() {
    this.members = [
      {
        memberId: uuid.v1(),
        name: "Hippodromo Barangay Hall",
        address: "Hippodromo, Cebu City",
        number: "032 233 1311",
        type: "Charity",
        verification: "Yes",
      },
      {
        memberId: uuid.v1(),
        name: "Itaewon",
        address: "Juan Luna Ave, Cebu City",
        number: "032 233 1311",
        type: "Donor",
        verification: "Yes",
      },
      {
        memberId: uuid.v1(),
        name: "JPIC-IDC Inc.",
        address: "Maguikay, Mandaue City",
        number: "032 233 1311",
        type: "Charity",
        verification: "Yes",
      },
      {
        memberId: uuid.v1(),
        name: "Mayeen’s Catering Services",
        address: "Cebu City",
        number: "032 233 1311",
        type: "Donor",
        verification: "Yes",
      },
      {
        memberId: uuid.v1(),
        name: "Pabugnawan",
        address: "Sitio Nasipit, Cebu City",
        number: "032 233 1311",
        type: "Donor",
        verification: "Yes",
      },
      {
        memberId: uuid.v1(),
        name: "Jangoo",
        address: "Cebu City",
        number: "032 233 1311",
        type: "Charity",
        verification: "No",
      },
      {
        memberId: uuid.v1(),
        name: "Kita Kits",
        address: "Cebu City",
        number: "032 233 1311",
        type: "Donor",
        verification: "No",
      },
    ];
    this.totalMembers = this.getTotalMembers;
    this.visibleButtons = this.setVisibleButtons;
  },
});
</script>

<style lang="scss" scoped>
::placeholder {
  color: #f8f9fa !important;
}
</style>
