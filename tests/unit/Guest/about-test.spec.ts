import { shallowMount } from '@vue/test-utils'
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index";
import AboutView from '@/views/Guest/AboutView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });

const factory = () => {
  return shallowMount(AboutView, {
    global: {
      plugins: [router],
    },
  });
};

describe("About", () => {
    it("renders header successfully", () => {
        const wrapper = factory();
        expect(wrapper.find('#header').exists()).toBeTruthy();
    });
    it("renders header title successfully", () => {
        const wrapper = factory();
        expect(wrapper.find('#header').find("h2").text()).toEqual("About Us");
    });
    it("renders about content section successfully", () => {
        const wrapper = factory();
        expect(wrapper.find('#about-content-section').exists()).toBeTruthy();
    });
    it("renders core values section successfully", () => {
        const wrapper = factory();
        expect(wrapper.find('#core-values-section').exists()).toBeTruthy();
    });
    it("renders core values title successfully", () => {
        const wrapper = factory();
        expect(wrapper.find('#core-values-section').find("h3").text()).toEqual("Core Values");
    });
    it("renders vision & mission section successfully", () => {
        const wrapper = factory();
        expect(wrapper.find('#vision-section').exists()).toBeTruthy();
    });
    it("renders founders section successfully", () => {
        const wrapper = factory();
        expect(wrapper.find('#founders-section').exists()).toBeTruthy();
    });
});