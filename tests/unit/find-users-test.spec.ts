import { mount } from "@vue/test-utils";
import FindUsersView from "@/views/FindUsersView.vue";

const factory = () => {
  return mount(FindUsersView as any, {
    data() {
      return {
        role: "",
        searchByVal: "Name",
        sortByVal: "Distance",
        findResults: [] as Array<any>,
      };
    },
  });
};

describe("Find Users View", () => {
  it("should display page title", () => {
    const wrapper = factory();
    expect(wrapper.find("h1").exists()).toBe(true);
  });
  it("should contain search bar", () => {
    const wrapper = factory();
    expect(wrapper.find("#find-search-bar").exists()).toBe(true);
  }); 
  it("should contain search by dropdown", () => {
    const wrapper = factory();
    expect(wrapper.find("#searchBy-btn").exists()).toBe(true);
  });
  it("should contain sort by dropdown", () => {
    const wrapper = factory();
    expect(wrapper.find("#sortBy-btn").exists()).toBe(true);
  });
  it("runs the SelectSearchBy method successfully", () => {
    const wrapper = factory();
    const SelectSearchByMethod = jest.spyOn(wrapper.vm, "SelectSearchBy");
    wrapper.vm.SelectSearchBy(wrapper.vm.searchByVal);
    expect(SelectSearchByMethod).toHaveBeenCalled();
  });
  it("runs the SelectSortBy method successfully", () => {
    const wrapper = factory();
    const SelectSortByMethod = jest.spyOn(wrapper.vm, "SelectSortBy");
    wrapper.vm.SelectSortBy(wrapper.vm.sortByVal);
    expect(SelectSortByMethod).toHaveBeenCalled();
  });
  it("updates the correct value if the SelectSearchBy method is called", () => {
    const wrapper = factory();
    jest.spyOn(wrapper.vm, "SelectSearchBy");
    wrapper.vm.SelectSearchBy("Address");
    expect(wrapper.vm.searchByVal).toBe("Address");
  });
  it("updates the correct value if the SelectSortBy method is called", () => {
    const wrapper = factory();
    jest.spyOn(wrapper.vm, "SelectSortBy");
    wrapper.vm.SelectSortBy("A to Z");
    expect(wrapper.vm.sortByVal).toBe("A to Z");
  });
  it("renders find users section", () => {
    const wrapper = factory();
    expect(wrapper.find("#find-users-section").exists()).toBe(true);
  });
});