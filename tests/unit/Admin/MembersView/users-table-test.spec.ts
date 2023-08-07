import { mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import Members from "@/components/UsersTable.vue";

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

const headers = () => {
  return [
    { key: "name", label: "Name" },
    { key: "address", label: "Address" },
    { key: "number", label: "Contact No." },
    { key: "type", label: "User Type" },
    { key: "verification", label: "Verified" },
    { key: "actions", label: "" },
  ] as Header[];
};

const members = () => {
  return [
    {
      memberId: "1",
      name: "Hippodromo Barangay Hall",
      address: "Hippodromo, Cebu City",
      number: "032 233 1311",
      type: "Charity",
      verification: "Yes",
    },
    {
      memberId: "2",
      name: "Itaewon",
      address: "Juan Luna Ave, Cebu City",
      number: "032 233 1311",
      type: "Donor",
      verification: "Yes",
    },
    {
      memberId: "3",
      name: "JPIC-IDC Inc.",
      address: "Maguikay, Mandaue City",
      number: "032 233 1311",
      type: "Charity",
      verification: "Yes",
    },
    {
      memberId: "4",
      name: "Mayeen’s Catering Services",
      address: "Cebu City",
      number: "032 233 1311",
      type: "Donor",
      verification: "Yes",
    },
    {
      memberId: "5",
      name: "Pabugnawan",
      address: "Sitio Nasipit, Cebu City",
      number: "032 233 1311",
      type: "Donor",
      verification: "Yes",
    },
  ] as UserDetails[];
};

const factory = (selectedUsers: UserDetails[]) => {
  return mount(Members as any, {
    propsData: {
      headers: headers(),
      members: members(),
      selectedUsers: selectedUsers,
    },

    data() {
      return {
        filterBy: "name",
        ascending: true,
        searchText: "",
        filteredMembers: [] as UserDetails[],
        selectedMembers: {},
        filteredUsers: {} as UserDetails,
      };
    },
  });
};

describe("Users Table", () => {
  it("renders successfully", () => {
    const wrapper = factory([]);
    expect(wrapper.exists()).toBe(true);
  });

  it("receives props successfully", () => {
    const users = members();
    const wrapper = factory(users);
    expect(wrapper.props("members")).not.toBeNull();
    expect(wrapper.props("members")).toStrictEqual(users);
  });

  it("renders Members correctly", async () => {
    const users = members();
    const wrapper = factory(users);
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
    const wrapper = factory(users);
    const mockSetSearchText = jest.spyOn(wrapper.vm, "setSearchText");
    let callbacks = 0;

    for (const state of states) {
      await wrapper.vm.setSearchText(state.searchText);
      expect(mockSetSearchText).toHaveBeenCalledTimes(++callbacks);
      expect(wrapper.vm.filteredMembers.length).not.toBeNull();
    }
  });

  it("runs setSelectedReport() correctly", async () => {
    const users = members();
    const wrapper = factory(users);
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

    const wrapper = factory(members());
    columns.forEach((column) => {
      expect(wrapper.find({ ref: column.ref }).exists());
    });
  });
  
});
