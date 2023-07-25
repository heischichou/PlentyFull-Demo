import { shallowMount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index";
import Login from "@/views/Guest/LoginView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const factory = () => {
  return shallowMount(Login, {
    global: {
      plugins: [router],
    },
  });
};

describe("Login page", () => {
  it("renders successfully", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders the Register link successfully", () => {
    const wrapper = factory();
    expect(wrapper.find("#register").exists()).toBeTruthy();
  });

  it("renders the Forgot Password link succesfully", () => {
    const wrapper = factory();
    expect(wrapper.find("#forgotPassword").exists()).toBeTruthy();
  });

  it("renders the Login Form correctly", () => {
    const wrapper = factory();
    const login = wrapper.find("#login");
    expect(login.exists()).toBeTruthy();
    expect(login.find("h2").text()).toEqual("Login");
    expect(login.find("#loginForm").exists()).toBeTruthy();
  });

  it("renders the form's fields correctly", () => {
    const fields = ["email", "password", "forgotPassword", "rememberMe"];
    const wrapper = factory();

    fields.forEach((field) => {
      expect(wrapper.find(`#${field}`).exists()).toBeTruthy();
    });
  });

  it("renders the form's submit button successfully", () => {
    const wrapper = factory();
    expect(wrapper.find({ ref: "login" }).exists()).toBeTruthy();
  });
});
