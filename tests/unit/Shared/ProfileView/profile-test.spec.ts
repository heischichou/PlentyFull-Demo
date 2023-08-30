import { VueWrapper, DOMWrapper, mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index";
import Profile from "@/views/Shared/ProfileView.vue";

const findByText = (
  wrapper: VueWrapper<any> | DOMWrapper<any>,
  selector: string,
  text: string
) => {
  return wrapper
    .findAll(selector)
    .filter((e: any) => e.text() === text)
    .at(0) as DOMWrapper<Element>;
};

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const factory = (activeTab: string, avatar: string) => {
  return mount(Profile, {
    data() {
      return {
        tabs: [
          {
            name: "Profile",
            text: "Profile",
            icon: "bi-person-circle",
          },
          {
            name: "Security and Login",
            text: "Security",
            icon: "bi-shield-check",
          },
        ],
        activeTab: activeTab,
        windowWidth: window.innerWidth,
        avatar: avatar,
      };
    },
    global: {
      plugins: [router],
    },
  });
};

describe("Profile Page", () => {
  it("renders successfully", () => {
    const wrapper = factory("Profile", "default_profile.png");
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find("#userAvatar").exists()).toBeTruthy();
  });

  it("runs the setURL() successfully", () => {
    const wrapper = factory("Profile", "default_profile.png");
    const mockSetURL = jest.spyOn(wrapper.vm, "setURL");
    wrapper.vm.setURL(wrapper.vm.avatar);
    expect(mockSetURL).toHaveBeenCalled();
  });

  it("setURL() returns the correct URL", async () => {
    const wrapper = factory(
      "Profile",
      "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg"
    );
    const mockSetURL = jest.spyOn(wrapper.vm, "setURL");

    wrapper.vm.setURL(wrapper.vm.avatar);
    expect(mockSetURL).toReturnWith(wrapper.vm.avatar);

    await wrapper.setData({ avatar: "default_profile.png" });
    wrapper.vm.setURL(wrapper.vm.avatar);
    expect(mockSetURL).toReturnWith(
      `${require("@/assets/images/Shared/" + wrapper.vm.avatar)}`
    );
  });

  it("renders Settings components correctly", async () => {
    const settings = [
      {
        header: "Profile",
        tab: "profileTab",
        form: "editProfile",
        disabled: "securityAndLogin"
      },
      {
        header: "Security and Login",
        tab: "securityTab",
        form: "securityAndLogin",
        disabled: "editProfile"
      },
    ];
    const wrapper = factory("Profile", "default_profile.png");
    const settingsSection = wrapper.find("#settings");

    for(const setting of settings) {
      const tab = wrapper.find(`#${setting.tab}`);
      expect(tab.exists()).toBeTruthy();
      await tab.find(".nav-link").trigger("click");

      const header = findByText(wrapper, "h4", setting.header);
      expect(header.exists()).toBeTruthy();
      expect(wrapper.vm.activeTab).toEqual(setting.header);
      expect(settingsSection.find(`#${setting.form}`).exists()).toBeTruthy();
      expect(settingsSection.find(`#${setting.disabled}`).exists()).toBeFalsy();
    }
  });

  it("listens to window resize", async () => {
    const mockResizeEvent = jest.spyOn(Profile.methods as any, "onResize");
    const wrapper = factory("Profile", "default_profile.png");

    await window.dispatchEvent(new Event("resize"));
    expect(mockResizeEvent).toBeCalled();
  });
});
