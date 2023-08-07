import { mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import Members from "@/components/ManageUsers.vue";

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

const factory = (selectedUsers: UserDetails[]) => {
    return mount(Members as any, {
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
          selectedUsers: [
            {
              userId: "1",
              name: "Hippodromo Barangay Hall",
              address: "Hippodromo, Cebu City",
              contact: "032 233 1311",
              userType: "Charity",
              verified: "Yes",
            },
            {
              userId: "2",
              name: "Itaewon",
              address: "Juan Luna Ave, Cebu City",
              contact: "032 233 1311",
              userType: "Donor",
              verified: "Yes",
            },
            {
              userId: "5",
              name: "Pabugnawan",
              address: "Sitio Nasipit, Cebu City",
              contact: "032 233 1311",
              userType: "Donor",
              verified: "Yes",
            },
          ],
        };
      },
    });
};

describe("Manage Users", () => {
  it("renders successfully", () => {
    const wrapper = factory([]);
    expect(wrapper.exists()).toBe(true);
  });

  it("contains page title", () => {
    const wrapper = factory([]);
    expect(wrapper.find("p").exists()).toBe(true);
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
    const wrapper = factory([]);
    const mockRemoveSelected = jest.spyOn(wrapper.vm, "removeSelected");
    wrapper.vm.removeSelected("2");
    expect(mockRemoveSelected).toHaveBeenCalled();
    expect(wrapper.vm.selectedUsers.length).toEqual(2);
    expect(wrapper.vm.selectedUsers).toEqual(
      expect.not.arrayContaining([
        {
            memberId: "2",
            name: "Itaewon",
            address: "Juan Luna Ave, Cebu City",
            number: "032 233 1311",
            type: "Donor",
            verification: "Yes",
        },
      ])
    );
  });

  it("contains all action buttons", () => {
    const wrapper = factory([]);
    expect(wrapper.find({ ref: "warnBtn" }).exists());
    expect(wrapper.find({ ref: "suspendBtn" }).exists());
    expect(wrapper.find({ ref: "deleteBtn" }).exists());
  });

  it("clicking on the action buttons toggles the modal", async () => {
    const wrapper = factory([]);
    await wrapper.vm.$refs.warnBtn.click();
    expect(wrapper.vm.actionModal).toEqual("Warn");
    expect(wrapper.vm.showModal).toBe(true);

    await wrapper.vm.closeModal();
    expect(wrapper.vm.showModal).toBe(false);

    await wrapper.vm.$refs.suspendBtn.click();
    expect(wrapper.vm.actionModal).toEqual("Suspend");
    expect(wrapper.vm.showModal).toBe(true);

    await wrapper.vm.closeModal();
    expect(wrapper.vm.showModal).toBe(false);

    await wrapper.vm.$refs.deleteBtn.click();
    expect(wrapper.vm.actionModal).toEqual("Delete");
    expect(wrapper.vm.showModal).toBe(true);

    await wrapper.vm.closeModal();
    expect(wrapper.vm.showModal).toBe(false);
  });
});
