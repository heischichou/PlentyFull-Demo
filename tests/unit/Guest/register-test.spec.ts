import { shallowMount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index";
import RegisterView from "@/views/Guest/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const factory = () => {
  return shallowMount(RegisterView, {
    global: {
      plugins: [router],
    },
  });
};

describe("Register", () => {
  it("renders header successfully", () => {
    const wrapper = factory();
    expect(wrapper.find("#header").exists()).toBeTruthy();
  });

  it("renders register form successfully", () => {
    const wrapper = factory();
    expect(wrapper.find("#register-form").exists()).toBeTruthy();
  });

  it("renders general information section successfully", () => {
    const wrapper = factory();
    expect(wrapper.find("#general-info-section").exists()).toBeTruthy();
  });

  it("renders present location section successfully", () => {
    const wrapper = factory();
    expect(wrapper.find("#present-location-section").exists()).toBeTruthy();
  });

  it("renders Get Started button", () => {
    const wrapper = factory();
    expect(wrapper.find("#get-started-btn").exists()).toBeTruthy();
  });

  it("renders Learn More button", () => {
    const wrapper = factory();
    expect(wrapper.find("#learn-more-btn").exists()).toBeTruthy();
  });

  it("renders name input", () => {
    const wrapper = factory();
    expect(wrapper.find("#name").exists()).toBeTruthy();
  });

  it("renders description text area", () => {
    const wrapper = factory();
    expect(wrapper.find("#description").exists()).toBeTruthy();
  });

  it("renders organization type input", () => {
    const wrapper = factory();
    expect(wrapper.find("#organizationType").exists()).toBeTruthy();
  });

  it("renders password input field", () => {
    const wrapper = factory();
    expect(wrapper.find("#password").exists()).toBeTruthy();
  });

  it("renders re-enter password input field", () => {
    const wrapper = factory();
    expect(wrapper.find("#password2").exists()).toBe;
  });

  it("renders file input field", () => {
    const wrapper = factory();
    expect(wrapper.find("#fileInput").exists()).toBeTruthy();
  });

  it("renders contact input field", () => {
    const wrapper = factory();
    expect(wrapper.find("#contact").exists()).toBeTruthy();
  });

  it("renders email input field", () => {
    const wrapper = factory();
    expect(wrapper.find("#email").exists()).toBeTruthy();
  });

  it("renders street address input field", () => {
    const wrapper = factory();
    expect(wrapper.find("#streetAdd").exists()).toBeTruthy();
  });

  it("renders barangay input field", () => {
    const wrapper = factory();
    expect(wrapper.find("#barangay").exists()).toBeTruthy();
  });

  it("renders municipality input field", () => {
    const wrapper = factory();
    expect(wrapper.find("#municipality").exists()).toBeTruthy();
  });

  it("renders city input field", () => {
    const wrapper = factory();
    expect(wrapper.find("#city").exists()).toBeTruthy();
  });

  it("renders province input field", () => {
    const wrapper = factory();
    expect(wrapper.find("#province").exists()).toBeTruthy();
  });

  it("renders checkbox input field", () => {
    const wrapper = factory();
    expect(wrapper.find("#checkBox").exists()).toBeTruthy();
  });

  it("renders register button", () => {
    const wrapper = factory();
    expect(wrapper.find("#register-btn").exists()).toBeTruthy();
  });
});
