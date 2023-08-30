import { mount } from "@vue/test-utils";
import Registry from "@/views/Admin/RegistryView.vue";

const factory = () => {
  return mount(Registry as any, {
    data() {
      return {
        tabs: [
          {
            tab: "Registration",
            text: "Sign Up Requests",
            icon: "bi-hourglass",
          },
          {
            tab: "Members",
            text: "Manage Users",
            icon: "bi-clipboard-check",
          },
          {
            tab: "Reports",
            text: "Reports",
            icon: "bi-slash-circle",
          },
        ],
        activeTab: "Registration",
        show: true,
      };
    },
  });
};

describe("Registry View", () => {
  it("renders successfully", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
  });

  it("contains sidebar", () => {
    const wrapper = factory();
    expect(wrapper.find("#sideBar").exists()).toBeTruthy();
  });

  it("contains page title", () => {
    const wrapper = factory();
    expect(wrapper.find("h1").exists()).toBeTruthy();
  });

  it("runs switchTab() method successfully", async () => {
    const wrapper = factory();
    const mockSwitchTab = jest.spyOn(wrapper.vm, "switchTab");
    const tabs = [
      { name: "registrationTab", tab: "Registration" },
      { name: "membersTab", tab: "Members" },
      { name: "reportsTab", tab: "Reports" },
    ];
    let callbacks = 0;

    tabs.forEach((tab) => {
      wrapper.find(`#${tab.name}`).trigger("click");
      expect(mockSwitchTab).toHaveBeenCalledTimes(++callbacks);
      expect(wrapper.vm.activeTab).toEqual(tab.tab);
    });
  });

  it("runs toggleSideBar() method successfully", async () => {
    const wrapper = factory();
    const mockToggleSideBar = jest.spyOn(wrapper.vm, "toggleSidebar");

    for (let i = 0; i < 2; i++) {
      const show = wrapper.vm.show;
      await wrapper.find({ ref: "sidebarToggle" }).trigger("click");
      expect(mockToggleSideBar).toHaveBeenCalledTimes(i + 1);
      expect(wrapper.vm.show).toBe(!show);
    }
  });

  it("hideSideBarText() method successfully returns correct value based on window size", async () => {
    const wrapper = factory();
    const states = [
      {
        width: 1024,
        show: true,
      },
      {
        width: 750,
        show: false,
      },
    ];

    for (const state of states) {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: state.width,
      });
      await window.dispatchEvent(new Event("resize"));
      expect(wrapper.vm.show).toBe(state.show);
    }
  });
});
