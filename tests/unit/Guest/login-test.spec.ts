import { shallowMount } from "@vue/test-utils";
import LoginView from "@/views/Guest/LoginView.vue";

const factory = () => {
  return shallowMount(LoginView, {});
};

describe("LoginView", () => {
  it("renders the login div", () => {
    const wrapper = factory();
    expect(wrapper.find("#login").exists()).toBeTruthy();
  });

  it("renders the login form", () => {
    const wrapper = factory();
    expect(wrapper.find("#login-form").exists()).toBeTruthy();
  });

  it("renders the login form title", () => {
    const wrapper = factory();
    expect(wrapper.find("h2").text()).toEqual("Login");
  });

  it("renders the login form register link", () => {
    const wrapper = factory();
    expect(wrapper.find("#register").exists()).toBeTruthy();
  });

  it("renders the login form email input", () => {
    const wrapper = factory();
    expect(wrapper.find("#email").exists()).toBeTruthy();
  });

  it("renders the login form password input", () => {
    const wrapper = factory();
    expect(wrapper.find("#password").exists()).toBeTruthy();
  });

  it("renders the login form forgot password link", () => {
    const wrapper = factory();
    expect(wrapper.find("#forgot-password").exists()).toBeTruthy();
  });

  it("renders the login form checkbox input field", () => {
    const wrapper = factory();
    expect(wrapper.find("#rememberbox").exists()).toBeTruthy();
  });

  it("renders the login form submit button", () => {
    const wrapper = factory();
    expect(wrapper.find("#login-btn").exists()).toBeTruthy();
  });
});
