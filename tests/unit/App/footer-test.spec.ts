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

const factory = () => {
  return mount(Footer as any, {
    global: {
      plugins: [router],
    },
  });
};

describe("Footer", () => {
  it("renders successfully", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("#footer").exists()).toBe(true);
  });

  it("renders Footer sections successfully", () => {
    const sections = ["contact", "menu", "textSection"];
    const wrapper = factory();

    sections.forEach((section) => {
      expect(wrapper.find(`#${section}`).exists()).toBeTruthy();
    });
  });

  it("renders Menu routes successfully", async () => {
    const wrapper = factory();
    const routes = [
      findByText(wrapper, ".nav-link", "Home"),
      findByText(wrapper, ".nav-link", "About"),
      findByText(wrapper, ".nav-link", "Register"),
      findByText(wrapper, ".nav-link", "Login"),
    ];
    routes.forEach((route) => {
      expect(route.exists()).toBe(true);
    });
  });

  it("renders Copyrights correctly", () => {
    const wrapper = factory();
    const copyrights = wrapper.find("#copyrights");
    expect(copyrights.exists()).toBeTruthy();
    expect(copyrights.text()).toContain("© PlentyFull. All rights reserved.");
  });
});
