import { shallowMount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index";
import About from "@/views/Guest/AboutView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const factory = () => {
  return shallowMount(About, {
    global: {
      plugins: [router],
    },
  });
};

describe("About page", () => {
  it("renders successfully", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders Header correctly", () => {
    const wrapper = factory();
    expect(wrapper.find("#header").exists()).toBeTruthy();
    expect(wrapper.find("#header").find("h2").text()).toEqual("About Us");
  });

  it("renders About content section successfully", () => {
    const wrapper = factory();
    expect(wrapper.find("#aboutContent").exists()).toBeTruthy();
  });

  it("renders Core Values correctly", () => {
    const wrapper = factory();
    expect(wrapper.find("#coreValues").exists()).toBeTruthy();
    expect(wrapper.find("#coreValues").find("h3").text()).toEqual(
      "Core Values"
    );
  });

  it("renders Vision and Mission successfully", () => {
    const wrapper = factory();
    expect(wrapper.find("#vision").exists()).toBeTruthy();
  });

  it("renders Founders correctly", () => {
    const wrapper = factory();
    const founders = wrapper.find("#founders");
    expect(founders.exists()).toBeTruthy();
    expect(founders.findAll(".avatar").length).toEqual(4);
  });
});
