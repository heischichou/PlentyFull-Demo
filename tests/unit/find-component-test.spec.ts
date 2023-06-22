import { mount } from "@vue/test-utils";
import FindComponent from "@/components/FindComponent.vue";

const findResultItem = () => {
  return {
    userID: 2,
    username: "Hipodromo Barangay Hall",
    address: "664 Saint Joseph St., Barangay Hipodromo, Cebu City",
    description:
      "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements. If the text label isn’t capitalized, it should use a different color, style, or layout from other text.",
    email: "info@hipodromoBarangayHall.com",
    contact: "(32) 233 1311",
    profileImage:
      "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg",
  };
};

const factory = () => {
  return mount(FindComponent as any, {
    propsData: {
        findResult: findResultItem(),
    },
  });
};

describe("Find Component", () => {
    it("receives the findResult prop successfully", () => {
        const wrapper = factory();
        expect(wrapper.props().findResult).toStrictEqual(findResultItem());
    });
    it("runs the isUrl method successfully", () => {
        const wrapper = factory();
        const isUrlMethod = jest.spyOn(wrapper.vm, "isURL");
        wrapper.vm.isURL(wrapper.props().findResult.profileImage);
        expect(isUrlMethod).toHaveBeenCalled();
    });
    it("returns true if the profile image is a Url profile image", () => {
      const wrapper = factory();
      const isUrlMethod = jest.spyOn(wrapper.vm, "isURL");
      wrapper.vm.isURL(wrapper.props().findResult.profileImage);
      expect(isUrlMethod).toReturnWith(true);
    });
    it("returns false if the profile image is not a Url profile image", () => {
      const wrapper = factory();
      const isUrlMethod = jest.spyOn(wrapper.vm, "isURL");
      wrapper.vm.isURL("default_profile.png");
      expect(isUrlMethod).toReturnWith(false);
    });
    it("renders component title", () => {
      const wrapper = factory();
      expect(wrapper.find(".card-title").exists()).toBe(true);
    });
    it("renders component subtitle", () => {
      const wrapper = factory();
      expect(wrapper.find(".card-subtitle").exists()).toBe(true);
    });
    it("renders report button", () => {
      const wrapper = factory();
      expect(wrapper.find("#report-btn").exists()).toBe(true);
      expect(wrapper.find(".bi-exclamation-triangle").exists()).toBe(true);
    });
    it("renders location button", () => {
      const wrapper = factory();
      expect(wrapper.find("#location-btn").exists()).toBe(true);
      expect(wrapper.find(".bi-geo-alt").exists()).toBe(true);
    });
    it("should display find details", () => {
      const wrapper = factory();
      expect(wrapper.find("#find-desc").exists()).toBe(true);
      expect(wrapper.find("#find-add").exists()).toBe(true);
      expect(wrapper.find("#find-email").exists()).toBe(true);
      expect(wrapper.find("#find-contact").exists()).toBe(true);
    });
});
