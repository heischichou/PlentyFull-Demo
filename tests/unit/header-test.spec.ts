import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index";
import Header from "@/components/AppHeader.vue";
import NotificationsDropdown from "@/components/NotificationsDropdown.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const factory = (role: String) => {
  return mount(Header, {
    data() {
      return {
        role: role,
      };
    },
    global: {
      plugins: [router],
    },
  });
};

describe("App Header", () => {
  it("renders successfully", () => {
    const wrapper = factory("");
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("#nav").exists()).toBe(true);
    expect(wrapper.find(".navbar-collapse").exists()).toBe(true);
  });

  it("renders notifications toggler correctly", async () => {
    const wrapper = factory("Donor");
    expect(wrapper.findComponent(NotificationsDropdown).exists()).toBe(true);
    await wrapper.setData({ role: "" });
    expect(wrapper.findComponent(NotificationsDropdown).exists()).toBe(false);
  });

  it("renders Guest routes correctly", async () => {
    const wrapper = factory("");

    // Contains Guest routes
    expect(wrapper.html().includes("Home")).toBe(true);
    expect(wrapper.html().includes("About")).toBe(true);
    expect(wrapper.html().includes("Register")).toBe(true);
    expect(wrapper.html().includes("Login")).toBe(true);

    // Does not contain non-Guest routes
    expect(wrapper.html().includes("Donate")).toBe(false);
    expect(wrapper.html().includes("Receive")).toBe(false);
    expect(wrapper.html().includes("Registry")).toBe(false);
    expect(wrapper.html().includes("Find")).toBe(false);
    expect(wrapper.html().includes("Transactions")).toBe(false);
    expect(wrapper.html().includes("Statistics")).toBe(false);
    expect(wrapper.html().includes("Profile")).toBe(false);
  });

  it("renders Donor routes correctly", () => {
    const wrapper = factory("Donor");

    // Contains Donor routes
    expect(wrapper.html().includes("/donate")).toBe(true);
    expect(wrapper.html().includes("/find")).toBe(true);
    expect(wrapper.html().includes("/transactions")).toBe(true);
    expect(wrapper.html().includes("/statistics")).toBe(true);
    expect(wrapper.html().includes("/profile")).toBe(true);

    // Does not contain Guest routes
    expect(wrapper.html().includes("Home")).toBe(false);
    expect(wrapper.html().includes("About")).toBe(false);
    expect(wrapper.html().includes("Register")).toBe(false);
    expect(wrapper.html().includes("Login")).toBe(false);
  });

  it("renders Charity routes correctly", () => {
    const wrapper = factory("Charity");

    // Contains Charity routes
    expect(wrapper.html().includes("/receive")).toBe(true);
    expect(wrapper.html().includes("/find")).toBe(true);
    expect(wrapper.html().includes("/transactions")).toBe(true);
    expect(wrapper.html().includes("/statistics")).toBe(true);
    expect(wrapper.html().includes("/profile")).toBe(true);

    // Does not contain Guest routes
    expect(wrapper.html().includes("Home")).toBe(false);
    expect(wrapper.html().includes("About")).toBe(false);
    expect(wrapper.html().includes("Register")).toBe(false);
    expect(wrapper.html().includes("Login")).toBe(false);
  });

  it("renders Admin routes correctly", () => {
    const wrapper = factory("Admin");

    // Contains Admin routes
    expect(wrapper.html().includes("/registry")).toBe(true);
    expect(wrapper.html().includes("/statistics")).toBe(true);
    expect(wrapper.html().includes("/profile")).toBe(true);

    // Does not contain non-Admin routes
    expect(wrapper.html().includes("Home")).toBe(false);
    expect(wrapper.html().includes("About")).toBe(false);
    expect(wrapper.html().includes("Register")).toBe(false);
    expect(wrapper.html().includes("Login")).toBe(false);
    expect(wrapper.html().includes("Donate")).toBe(false);
    expect(wrapper.html().includes("Receive")).toBe(false);
    expect(wrapper.html().includes("Home")).toBe(false);
    expect(wrapper.html().includes("Find")).toBe(false);
    expect(wrapper.html().includes("Home")).toBe(false);
    expect(wrapper.html().includes("Transactions")).toBe(false);
  });
});
