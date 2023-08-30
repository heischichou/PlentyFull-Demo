import { VueWrapper, DOMWrapper, mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index";
import Footer from "@/components/App/AppFooter.vue";

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

const factory = (role: string) => {
  return mount(Footer as any, {
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

describe("Footer", () => {
  it("renders successfully", () => {
    const wrapper = factory("");
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("#footer").exists()).toBe(true);
  });

  it("renders Footer sections successfully", () => {
    const sections = ["contact", "menu", "textSection"];
    const wrapper = factory("");

    sections.forEach((section) => {
      expect(wrapper.find(`#${section}`).exists()).toBeTruthy();
    });
  });

  it("renders routes correctly", async () => {
    const wrapper = factory("");
    const states = [
      {
        role: "",
        routes: ["Home", "About", "Register", "Login"],
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
        routes: ["Donate", "Find", "Transactions", "Statistics"],
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
        routes: ["Receive", "Find", "Statistics"],
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
        routes: ["Registry", "Statistics"],
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

    for(const state of states){
      await wrapper.setData({ role: state.role });

      // Contains routes specific to user type
      state.routes.forEach((route) => {
        expect(findByText(wrapper, ".nav-link", route).exists()).toBe(true);
      });

      // Does not contain non-user type routes
      state.nonRoutes.forEach((route) => {
        expect(wrapper.html().includes(route)).toBe(false);
      });
    }
  });

  it("renders Copyrights correctly", () => {
    const wrapper = factory("");
    const copyrights = wrapper.find("#copyrights");
    expect(copyrights.exists()).toBeTruthy();
    expect(copyrights.text()).toContain("© PlentyFull. All rights reserved.");
  });
});
