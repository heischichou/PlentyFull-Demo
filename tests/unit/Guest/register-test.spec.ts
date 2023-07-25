import { shallowMount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index";
import Register from "@/views/Guest/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const factory = () => {
  return shallowMount(Register, {
    global: {
      plugins: [router],
    },
  });
};

describe("Register page", () => {
  it("renders successfully", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders Header correctly", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find("#header").exists()).toBeTruthy();
    expect(wrapper.find("#getStarted").exists()).toBeTruthy();
    expect(wrapper.find("#learnMore").exists()).toBeTruthy();
  });

  it("renders Registration form successfully", () => {
    const wrapper = factory();
    expect(wrapper.find("#registration").exists()).toBeTruthy();
    expect(wrapper.find("#acceptTOS").exists()).toBeTruthy();
    expect(wrapper.find("#register").exists()).toBeTruthy();
  });

  it("renders the form sections successfully", () => {
    const sections = ["generalInformation", "presentLocation"];
    const wrapper = factory();

    sections.forEach((section) => {
      expect(wrapper.find(`#${section}`).exists()).toBeTruthy();
    });
  });

  it("renders the General Information section's fields successfully", () => {
    const fields = [
      "name",
      "description",
      "organizationType",
      "password",
      "confirmPassword",
      "verificationDocument",
    ];
    const wrapper = factory();

    fields.forEach((field) => {
      expect(wrapper.find(`#${field}`).exists()).toBeTruthy();
    });
  });

  it("renders the Present Location section's fields successfully", () => {
    const fields = [
      "contact",
      "email",
      "streetAddress",
      "barangay",
      "municipality",
      "city",
      "province",
    ];
    const wrapper = factory();

    fields.forEach((field) => {
      expect(wrapper.find(`#${field}`).exists()).toBeTruthy();
    });
  });
});
