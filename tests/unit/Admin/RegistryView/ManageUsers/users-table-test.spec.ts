import { mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import { Header } from "@/types";
import { Account } from "@/types/Admin";
import Members from "@/components/Admin/RegistryView/ManageUsers/UsersTable.vue";

const members = () => {
  return [
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
  ] as Account[];
};

const factory = (members: Account[], selectedUsers: Account[]) => {
  return mount(Members as any, {
    propsData: {
      headers: [
        { key: "name", label: "Name" },
        { key: "address", label: "Address" },
        { key: "contact", label: "Contact No." },
        { key: "type", label: "User Type" },
        { key: "verified", label: "Verified" },
        { key: "actions", label: "" },
      ] as Header[],
      members: members,
      selectedUsers: selectedUsers,
    },

    data() {
      return {
        filterBy: "name",
        ascending: true,
        searchText: "",
        filteredMembers: [] as Account[],
        selectedMembers: {},
        filteredUsers: {} as Account,
      };
    },
  });
};

describe("Users Table", () => {
  it("renders successfully", () => {
    const wrapper = factory(members(), []);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("receives props successfully", () => {
    const users = members();
    const wrapper = factory(users, []);
    expect(wrapper.props("members")).not.toBeNull();
    expect(wrapper.props("members")).toStrictEqual(users);
  });

  it("renders Members correctly", async () => {
    const users = members();
    const wrapper = factory(users, []);
    expect(wrapper.findAll(".member").length).toEqual(0);
    await wrapper.setProps({ members: members() });
    expect(wrapper.findAll(".member").length).not.toBeNull();
  });

  it("runs setSearchText() correctly", async () => {
    const users = members();
    const states = [
      {
        searchText: "Cebu Food Bank",
        expectedLength: 1,
      },
      {
        searchText: "",
        expectedLength: users.length,
      },
    ];
    const wrapper = factory(users, []);
    const mockSetSearchText = jest.spyOn(wrapper.vm, "setSearchText");
    let callbacks = 0;

    for (const state of states) {
      await wrapper.vm.setSearchText(state.searchText);
      expect(mockSetSearchText).toHaveBeenCalledTimes(++callbacks);
      expect(wrapper.vm.filteredMembers.length).not.toBeNull();
    }
  });

  it("runs setSelectedMember() correctly", async () => {
    const users = members();
    const wrapper = factory(users, []);
    const rows = wrapper.findAll(".member");

    for (const [index, row] of rows.entries()) {
      const button = row.find(".btn-outline-primary");
      await button.trigger("click");
      expect(wrapper.vm.selectedMembers).toEqual(users[index]);
    }
  });

  it("renders the sorting columns successfully", async () => {
    const columns = [
      {
        key: "name",
        ref: "sortByname",
      },
      {
        key: "address",
        ref: "sortByaddress",
      },
      {
        key: "number",
        ref: "sortBynumber",
      },
      {
        key: "type",
        ref: "sortBytype",
      },
      {
        key: "verification",
        ref: "sortByverification",
      },
    ];

    const wrapper = factory(members(), []);
    columns.forEach((column) => {
      expect(wrapper.find({ ref: column.ref }).exists());
    });
  });

  it("contains all action buttons", () => {
    const wrapper = factory(members(), []);
    const refs = ["warn", "suspend", "delete"];
    refs.forEach((ref) => {
      expect(wrapper.find({ ref: ref }).exists()).toBeTruthy();
    });
  });

  it("clicking on the action buttons toggles the modal", async () => {
    const wrapper = factory([], []);
    const controls = [
      {
        ref: wrapper.vm.$refs.warn,
        action: "Warn",
      },
      {
        ref: wrapper.vm.$refs.suspend,
        action: "Suspend",
      },
      {
        ref: wrapper.vm.$refs.delete,
        action: "Delete",
      },
    ];
    let callbacks = -1;

    for (const control of controls) {
      await control.ref.click();
      const emitted = wrapper.emitted().toggleModal.at(++callbacks) as string;
      expect(emitted.toString()).toEqual(control.action);
    }

    expect(callbacks).toEqual(2);
  });

  it("toggleModal() emits successfully", async () => {
    const wrapper = factory([], []);
    const mockToggleModal = jest.spyOn(wrapper.vm, "toggleModal");

    await wrapper.vm.toggleModal("Warn");
    expect(mockToggleModal).toHaveBeenCalled();
    const emitted = wrapper.emitted().toggleModal.at(0) as string;
    expect(emitted.toString()).toEqual("Warn");
  });

  it("toggleCheckbox() emits successfully", async () => {
    const users = members();
    const selected = users[0];
    const wrapper = factory(users, []);
    const mockToggleCheckbox = jest.spyOn(wrapper.vm, "toggleCheckbox");

    await wrapper.vm.toggleCheckbox(selected);
    expect(mockToggleCheckbox).toHaveBeenCalled();
    const emitted = wrapper.emitted("update:selectedUsers")?.at(0) as any;
    expect(emitted.at(0) as Account).toStrictEqual(selected);
  });

  it("runSingleAction() emits successfully", async () => {
    const users = members();
    const selected = users[0];
    const wrapper = factory(users, []);
    const mockRunSingleAction = jest.spyOn(wrapper.vm, "runSingleAction");

    await wrapper.vm.runSingleAction(selected, "Warn");
    expect(mockRunSingleAction).toHaveBeenCalled();
    const emitted = wrapper.emitted("runSingleAction")?.at(0) as any;
    expect(emitted.at(0) as Account).toStrictEqual(selected);
    expect(emitted.at(emitted.length - 1).toString()).toStrictEqual("Warn");
  });
});
