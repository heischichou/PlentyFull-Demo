import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index";
import Header from "@/components/App/AppHeader.vue";
import NotificationsDropdown from "@/components/Shared/NotificationsDropdown.vue";

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

  it("renders routes correctly", async () => {
    const wrapper = factory("");
    const states = [
      {
        role: "",
        routes: ["Home", "/about", "/register", "/login"],
        nonRoutes: [
          "/donate",
          "/receive",
          "/registry",
          "/find",
          "/transactions",
          "/statistics",
          "/profile",
        ],
      },
      {
        role: "Donor",
        routes: [
          "/donate",
          "/find",
          "/transactions",
          "/statistics",
          "/profile",
        ],
        nonRoutes: [
          "/home",
          "/about",
          "/register",
          "/login",
          "/registry",
          "/receive",
        ],
      },
      {
        role: "Charity",
        routes: ["/receive", "/find", "/statistics", "/profile"],
        nonRoutes: [
          "/home",
          "/about",
          "/register",
          "/login",
          "/registry",
          "/donate",
        ],
      },
      {
        role: "Administrator",
        routes: ["/registry", "/statistics", "/profile"],
        nonRoutes: [
          "/home",
          "/about",
          "/register",
          "/login",
          "/donate",
          "/receive",
          "/find",
          "/transactions",
        ],
      },
    ];

    for (const state of states) {
      await wrapper.setData({ role: state.role });

      // Contains routes specific to user type
      state.routes.forEach((route) => {
        expect(wrapper.html().includes(route)).toBe(true);
      });

      // Does not contain non-user type routes
      state.nonRoutes.forEach((route) => {
        expect(wrapper.html().includes(route)).toBe(false);
      });
    }
  });
});
