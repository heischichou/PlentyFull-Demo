import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index";
import Footer from "@/components/AppFooter.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const factory = () => {
  return mount(Footer as any, {
    global: {
      plugins: [router],
    },
  });
};

describe("Footer", () => {
  it("renders footer successfully", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("#footer").exists()).toBe(true);
  });

  it("renders contact section successfully", () => {
    const wrapper = factory();
    expect(wrapper.find("#contact-section").exists()).toBeTruthy();
  });

  it("renders menu section successfully", () => {
    const wrapper = factory();
    expect(wrapper.find("#menu-section").exists()).toBeTruthy();
  });

  it("renders menu routes successfully", async () => {
    const wrapper = factory();
    const menuRoutes = ["Home", "/about", "/register", "/login"];
    menuRoutes.forEach((route) => {
      expect(wrapper.html().includes(route)).toBe(true);
    });
  });

  it("renders text section successfully", () => {
    const wrapper = factory();
    expect(wrapper.find("#text-section").exists()).toBeTruthy();
  });

  it("renders bottom footer successfully", () => {
    const wrapper = factory();
    expect(wrapper.find("#bottom-footer").exists()).toBeTruthy();
    expect(wrapper.find("#bottom-footer").text()).toContain(
      "© PlentyFull. All rights reserved."
    );
  });
});
