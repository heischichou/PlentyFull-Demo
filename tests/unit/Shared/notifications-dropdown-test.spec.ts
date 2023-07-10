import { mount } from "@vue/test-utils";
import Notifications from "@/components/Shared/NotificationsDropdown.vue";
import { uuid } from "vue-uuid";

declare interface Notification {
  notificationId: string;
  senderId: string;
  senderName: string;
  type: string;
  message: string;
  createdAt: string;
  read: boolean;
  report: {
    required: boolean;
    type: object | null;
    default: object | null;
  };
}

const notifications = () => {
  return [
    {
      notificationId: uuid.v1(),
      senderId: uuid.v1(),
      senderName: "Cebu Food Bank",
      type: "Notification",
      message: "has accepted your donation reception.",
      createdAt: new Date().toDateString(),
      read: false,
      report: {
        required: false,
        type: [Object, null],
        default: null,
      },
    },
    {
      notificationId: uuid.v1(),
      senderId: uuid.v1(),
      senderName: "Hippodromo Barangay Hall",
      type: "Notification",
      message: "successfully received your donation.",
      createdAt: new Date().toDateString(),
      read: true,
      report: {
        required: false,
        type: [Object, null],
        default: null,
      },
    },
  ] as Notification[];
};

const factory = (
  filteredNotifications: Notification[],
  filterByRead: Boolean
) => {
  return mount(Notifications as any, {
    data() {
      return {
        notifications: notifications(),
        filteredNotifications: filteredNotifications,
      };
    },
    propsData: {
      filterByRead: filterByRead,
    },
  });
};

describe("Notifications Dropdown", () => {
  it("renders successfully", () => {
    const wrapper = factory([], false);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders dropdown menu successfuly", () => {
    const wrapper = factory([], false);
    expect(wrapper.find(".dropdown-menu").exists()).toBe(true);
  });

  it("receives notifications successfully", () => {
    const notificationsList = notifications();
    const wrapper = factory(notificationsList, false);
    expect(wrapper.findAll(".dropdown-item").length).toBe(
      notificationsList.length
    );
  });

  it("renders notifications successfully", () => {
    const notificationsList = notifications();
    const wrapper = factory(notificationsList, false);
    const listItems = wrapper.findAll(".dropdown-item");
    expect(listItems.at(0)?.find(".avatar").exists()).toBe(true);
    expect(listItems.at(0)?.find("p").exists()).toBe(true);
    expect(listItems.at(0)?.find("p").text()).toBe(
      notificationsList[0].senderName + " " + notificationsList[0].message
    );
    expect(listItems.at(0)?.find("small").exists()).toBe(true);
    expect(listItems.at(0)?.find("small").text()).toBe(
      notificationsList[0].createdAt
    );
    expect(listItems.at(0)?.find(".bi").exists()).toBe(true);
  });

  it("filters notifications successfully", async () => {
    const filteredNotifications = notifications().filter(
      (notification) => notification.read === false
    );
    const wrapper = factory([], false);
    await wrapper.setProps({ filterByRead: true });
    expect(wrapper.findAll(".dropdown-item").length).toBe(
      filteredNotifications.length
    );
    await wrapper.setProps({ filterByRead: false });
    expect(wrapper.findAll(".dropdown-item").length).toBe(
      notifications().length
    );
  });

  it("listens to window resize", async () => {
    const mockResizeEvent = jest.spyOn(
      Notifications.methods as any,
      "onResize"
    );
    const wrapper = factory([], false);
    await window.dispatchEvent(new Event("resize"));
    expect(mockResizeEvent).toBeCalled();
  });
});
