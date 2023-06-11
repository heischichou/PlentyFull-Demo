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
  return mount(Header as any, {
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

    const guestRoutes = ["Home", "/about", "/register", "/login"];
    const nonGuestRoutes = [
      "/donate",
      "/receive",
      "/registry",
      "/find",
      "/transactions",
      "/statistics",
      "/profile",
    ];

    // Contains Guest routes
    guestRoutes.forEach((route) => {
      expect(wrapper.html().includes(route)).toBe(true);
    });

    // Does not contain non-Guest routes
    nonGuestRoutes.forEach((route) => {
      expect(wrapper.html().includes(route)).toBe(false);
    });
  });

  it("renders Donor routes correctly", () => {
    const wrapper = factory("Donor");

    const donorRoutes = [
      "/donate",
      "/find",
      "/transactions",
      "/statistics",
      "/profile",
    ];
    const guestRoutes = ["/home", "/about", "/register", "/login"];

    // Contains Donor routes
    donorRoutes.forEach((route) => {
      expect(wrapper.html().includes(route)).toBe(true);
    });

    // Does not contain Guest routes
    guestRoutes.forEach((route) => {
      expect(wrapper.html().includes(route)).toBe(false);
    });
  });

  it("renders Charity routes correctly", () => {
    const wrapper = factory("Charity");

    const donorRoutes = [
      "/receive",
      "/find",
      "/transactions",
      "/statistics",
      "/profile",
    ];
    const guestRoutes = ["/home", "/about", "/register", "/login"];

    // Contains Donor routes
    donorRoutes.forEach((route) => {
      expect(wrapper.html().includes(route)).toBe(true);
    });

    // Does not contain Guest routes
    guestRoutes.forEach((route) => {
      expect(wrapper.html().includes(route)).toBe(false);
    });
  });

  it("renders Admin routes correctly", () => {
    const wrapper = factory("Admin");

    const adminRoutes = ["/registry", "/statistics", "/profile"];
    const nonAdminRoutes = [
      "/home",
      "/about",
      "/register",
      "/login",
      "/donate",
      "/receive",
      "/find",
      "/transactions",
    ];

    // Contains Admin routes
    adminRoutes.forEach((route) => {
      expect(wrapper.html().includes(route)).toBe(true);
    });

    // Does not contain non-Admin routes
    nonAdminRoutes.forEach((route) => {
      expect(wrapper.html().includes(route)).toBe(false);
    });
  });
});
