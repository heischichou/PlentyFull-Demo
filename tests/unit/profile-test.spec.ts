import { shallowMount } from '@vue/test-utils'
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index";
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });

const factory = (values = {}) => {
  return shallowMount(ProfileView, {
    data() {
        return {
            ...values,
        };
    },
    global: {
      plugins: [router],
    },
  });
};

describe("Profile", () => {
    it("renders header successfully", () => {
        const wrapper = factory({ profile: true, security: false });
        expect(wrapper.find('#header').exists()).toBeTruthy();
    });
    it("renders header title successfully", () => {
        const wrapper = factory({ profile: true, security: false });
        expect(wrapper.find('#header').find("h1").text()).toEqual("Settings");
    });
    it("renders the image for profile picture successfully", () => {
        const wrapper = factory({ profile: true, security: false });
        expect(wrapper.find('#profile-picture').exists()).toBeTruthy();
    });
    it("renders personal profile section successfully", () => {
        const wrapper = factory({ profile: true, security: false });
        expect(wrapper.find('#view-profile').exists()).toBeTruthy();
    });
    it("renders personal profile title successfully", () => {
        const wrapper = factory({ profile: true, security: false });
        expect(wrapper.find('#view-profile').find("h4").text()).toEqual("Personal Profile");
    });
    it("renders security section successfully", () => {
        const wrapper = factory({ profile: false, security: true });
        expect(wrapper.find('#view-security').exists()).toBeTruthy();
    });
    it("renders security title successfully", () => {
        const wrapper = factory({ profile: false, security: true });
        expect(wrapper.find('#view-security').find("h4").text()).toEqual("Security");
    });
});