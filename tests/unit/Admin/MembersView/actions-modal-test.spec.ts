import { mount } from "@vue/test-utils";
import ActionsModal from "@/components/Admin/ActionsModal.vue";

declare interface User {
  userId: string;
  name: string;
  address: string;
  contact: string;
  userType: string;
  verified: string;
}

const selectedUsers = () => {
  return [
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
      userId: "3",
      name: "Pabugnawan",
      address: "Sitio Nasipit, Cebu City",
      contact: "032 233 1311",
      userType: "Donor",
      verified: "Yes",
    },
  ] as User[];
};

const factory = (selectedUsers: User[]) => {
  return mount(ActionsModal as any, {
    propsData: {
      isVisible: true,
      action: "Warn",
      selectedUsers: selectedUsers,
    },
  });
};

describe("Actions Modal", () => {
  it("renders successfully", () => {
    const userList = selectedUsers();
    const wrapper = factory(userList);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("#actionsModal").exists()).toBe(true);
  });

  it("receives props successfully", async () => {
    const userList = selectedUsers();
    const wrapper = factory(userList);
    expect(wrapper.props("isVisible")).toBe(true);
    expect(wrapper.props("action")).toBe("Warn");
    expect(wrapper.props("selectedUsers")).toStrictEqual(selectedUsers());

    await wrapper.setProps({ isVisible: false });
    expect(wrapper.props("isVisible")).toBe(false);

    await wrapper.setProps({ action: "Suspend" });
    expect(wrapper.props("action")).toBe("Suspend");

    await wrapper.setProps({ action: "Delete" });
    expect(wrapper.props("action")).toBe("Delete");
  });

  it("renders modal content correctly", async () => {
    const userList = selectedUsers();
    const wrapper = factory(userList);
    expect(wrapper.find(".modal-title").text()).toBe("Warn Users");
    expect(wrapper.find("#userlistSection").find(".fs-6").text()).toContain(
      "Users to Warn"
    );
    expect(wrapper.find("#subjectSection").find(".form-label").text()).toBe(
      "Subject"
    );
    expect(wrapper.find("#descSection").find(".form-label").text()).toBe(
      "Description"
    );
    expect(wrapper.find(".modal-footer").find(".btn-danger").text()).toBe(
      "Warn"
    );

    await wrapper.setProps({ action: "Suspend" });
    expect(wrapper.find(".modal-title").text()).toBe("Suspend Users");
    expect(wrapper.find("#userlistSection").find(".fs-6").text()).toContain(
      "Users to Suspend"
    );
    expect(wrapper.find(".modal-body").find(".form-text").text()).toBe(
      "Please confirm if you would like to suspend the accounts of these users."
    );
    expect(wrapper.find(".modal-footer").find(".btn-danger").text()).toBe(
      "Suspend"
    );

    await wrapper.setProps({ action: "Delete" });
    expect(wrapper.find(".modal-title").text()).toBe("Delete Accounts");
    expect(wrapper.find("#userlistSection").find(".fs-6").text()).toContain(
      "Users to Delete"
    );
    expect(wrapper.find(".modal-body").find(".form-text").text()).toBe(
      "Please confirm if you would like to delete the accounts of these users."
    );
    expect(wrapper.find(".modal-footer").find(".btn-danger").text()).toBe(
      "Delete"
    );
  });

  it("renders user list correctly", async () => {
    const userList = selectedUsers();
    const wrapper = factory([]);
    expect(wrapper.find("#userList").exists()).toBe(false);
    expect(wrapper.findAllComponents({ name: "UserTag" }).length).toBe(0);

    await wrapper.setProps({ selectedUsers: userList });
    expect(wrapper.find("#userList").exists()).toBe(true);

    const userTags = wrapper.findAllComponents({ name: "UserTag" });
    expect(userTags.length).toBeGreaterThan(0);
    userTags.forEach((userTag, index) => {
      expect(wrapper.find(`#userTag-${index}`).exists()).toBe(true);
      expect(userTag.text()).toContain(userList[index].name);
    });
  });

  it("emits an event when close button is clicked", async () => {
    const userList = selectedUsers();
    const wrapper = factory(userList);
    await wrapper.find(".btn-close").trigger("click");
    expect(wrapper.emitted().closeModal).toBeTruthy();
  });

  it("emits an event when cancel button is clicked", async () => {
    const userList = selectedUsers();
    const wrapper = factory(userList);
    await wrapper.find(".btn-outline-dark").trigger("click");
    expect(wrapper.emitted().cancelAction).toBeTruthy();
  });

  it("onRemoveSelected() successfully runs and emits an event", async () => {
    const userList = selectedUsers();
    const wrapper = factory(userList);
    await wrapper.vm.onRemoveSelected();
    expect(wrapper.emitted().removeSelected).toBeTruthy();
  });
});
