import { mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import { Account } from "@/types/Admin";
import ActionsModal from "@/components/Admin/RegistryView/ManageUsers/ActionsModal.vue";

const selectedUsers = () => {
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

const factory = (selectedUsers: Account[]) => {
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
    const wrapper = factory(selectedUsers());
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find("#actionsModal").exists()).toBeTruthy();
  });

  it("receives props successfully", async () => {
    const users = selectedUsers();
    const wrapper = factory(users);
    expect(wrapper.props("selectedUsers")).toStrictEqual(users);

    const states = [
      {
        prop: "isVisible",
        set: null,
        toBe: true,
      },
      {
        prop: "action",
        set: null,
        toBe: "Warn",
      },
      {
        prop: "isVisible",
        set: false,
        toBe: false,
      },
      {
        prop: "action",
        set: "Suspend",
        toBe: "Suspend",
      },
      {
        prop: "action",
        set: "Delete",
        toBe: "Delete",
      },
    ];

    for (const state of states) {
      if (state.set !== null) {
        await wrapper.setProps({ [state.prop]: state.set });
      }
      expect(wrapper.props(state.prop)).toBe(state.toBe);
    }
  });

  it("renders modal content correctly", async () => {
    const wrapper = factory(selectedUsers());
    const states = [
      // Warn selected users
      {
        action: "Warn",
        title: "Warn Users",
        elements: [
          {
            node: "#userPills",
            find: ".fs-6",
            matcher: "toContain",
            text: "Users to Warn",
          },
          {
            node: "subject",
            find: ".form-label",
            matcher: "toBe",
            text: "Subject",
          },
          {
            node: "description",
            find: ".form-label",
            matcher: "toBe",
            text: "Description",
          },
        ],
      },
      // Suspend Users
      {
        action: "Suspend",
        title: "Suspend Users",
        elements: [
          {
            node: "#userPills",
            find: ".fs-6",
            matcher: "toContain",
            text: "Users to Suspend",
          },
          {
            node: ".modal-body",
            find: ".form-text",
            matcher: "toBe",
            text: "Please confirm if you would like to suspend the accounts of these users.",
          },
        ],
      },
      // Delete Accounts
      {
        action: "Delete",
        title: "Delete Accounts",
        elements: [
          {
            node: "#userPills",
            find: ".fs-6",
            matcher: "toContain",
            text: "Users to Delete",
          },
          {
            node: ".modal-body",
            find: ".form-text",
            matcher: "toBe",
            text: "Please confirm if you would like to delete the accounts of these users.",
          },
        ],
      },
    ];

    for (const state of states) {
      await wrapper.setProps({ action: state.action });
      expect(wrapper.find(".modal-title").text()).toBe(state.title);

      for (const element of state.elements) {
        const htmlWrapper =
          element.node.includes("#") || element.node.includes(".")
            ? wrapper.find(element.node)
            : wrapper.find({ ref: element.node });

        if (element.matcher === "toContain") {
          expect(htmlWrapper.find(element.find).text()).toContain(element.text);
        } else {
          expect(htmlWrapper.find(element.find).text()).toBe(element.text);
        }
      }

      expect(wrapper.find(".modal-footer").find(".btn-danger").text()).toBe(
        state.action
      );
    }
  });

  it("renders User list correctly", async () => {
    const users = selectedUsers();
    const wrapper = factory([]);
    expect(wrapper.find("#userList").exists()).toBe(false);
    expect(wrapper.findAllComponents({ name: "UserTag" }).length).toBe(0);

    await wrapper.setProps({ selectedUsers: users });
    expect(wrapper.find("#userList").exists()).toBe(true);

    const userTags = wrapper.findAllComponents({ name: "UserTag" });
    expect(userTags.length).toBeGreaterThan(0);
    userTags.forEach((userTag, index) => {
      expect(wrapper.find(`#userTag-${index}`).exists()).toBe(true);
      expect(userTag.text()).toContain(users[index].name);
    });
  });

  it("emits an event when close button is clicked", async () => {
    const users = selectedUsers();
    const wrapper = factory(users);
    const mockCloseModal = jest.spyOn(wrapper.vm, "closeModal");
    await wrapper.find(".btn-close").trigger("click");
    expect(mockCloseModal).toHaveBeenCalled();
    expect(wrapper.emitted().closeModal).toBeTruthy();
  });

  it("emits an event when cancel button is clicked", async () => {
    const users = selectedUsers();
    const wrapper = factory(users);
    await wrapper.find(".btn-outline-dark").trigger("click");
    expect(wrapper.emitted().cancelAction).toBeTruthy();
  });

  it("onRemoveSelected() emits successfully", async () => {
    const users = selectedUsers();
    const wrapper = factory(users);
    await wrapper.vm.onRemoveSelected();
    expect(wrapper.emitted().removeSelected).toBeTruthy();
  });
});
