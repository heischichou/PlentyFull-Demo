import { mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import { Header } from "@/types";
import { Account } from "@/types/Admin";
import Members from "@/components/Admin/RegistryView/ManageUsers/ManageUsers.vue";

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
      name: "Pabugnawan",
      type: "Donor",
      address: "Sitio Nasipit, Cebu City",
      contact: "032 233 1311",
      verified: true,
      createdAt: new Date().toString(),
    },
  ] as Account[];
};

const factory = (selectedUsers: Account[]) => {
  return mount(Members as any, {
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
        selectedUsers: selectedUsers,
      };
    },
  });
};

describe("Manage Users", () => {
  it("renders successfully", () => {
    const wrapper = factory([]);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("runs toggleModal() method successfully", async () => {
    const wrapper = factory([]);
    const mockToggleModal = jest.spyOn(wrapper.vm, "toggleModal");

    wrapper.vm.toggleModal("Warn");
    expect(mockToggleModal).toHaveBeenCalled();
    expect(wrapper.vm.showModal).toBe(true);
    expect(wrapper.vm.actionModal).toEqual("Warn");
  });

  it("runs closeModal() method successfully", async () => {
    const wrapper = factory([]);
    const mockCloseModal = jest.spyOn(wrapper.vm, "closeModal");

    wrapper.vm.closeModal();
    expect(mockCloseModal).toHaveBeenCalled();
    expect(wrapper.vm.showModal).toBe(false);
  });

  it("runs cancelAction() method successfully", async () => {
    const wrapper = factory([]);
    const mockCancelAction = jest.spyOn(wrapper.vm, "cancelAction");

    wrapper.vm.cancelAction();
    expect(mockCancelAction).toHaveBeenCalled();
    expect(wrapper.vm.selectedUsers.length).toEqual(0);
    expect(wrapper.vm.showModal).toBe(false);
  });

  it("resetSelected() method successfully resets selected users", async () => {
    const wrapper = factory([]);
    const mockResetSelected = jest.spyOn(wrapper.vm, "resetSelected");

    wrapper.vm.resetSelected();
    expect(mockResetSelected).toHaveBeenCalled();
    expect(wrapper.vm.selectedUsers.length).toEqual(0);
  });

  it("removeSelected() method successfully removes selected users", async () => {
    const users = members();
    const selected = users[2];
    const wrapper = factory(users);
    const mockRemoveSelected = jest.spyOn(wrapper.vm, "removeSelected");

    wrapper.vm.removeSelected(selected.id);
    expect(mockRemoveSelected).toHaveBeenCalled();
    expect(wrapper.vm.selectedUsers.length).toEqual(2);
    expect(wrapper.vm.selectedUsers).toEqual(
      expect.not.arrayContaining([selected])
    );
  });
});
