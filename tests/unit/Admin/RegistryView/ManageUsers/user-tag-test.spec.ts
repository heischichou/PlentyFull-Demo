import { mount } from "@vue/test-utils";
import UserTag from "@/components/Admin/RegistryView/ManageUsers/UserTag.vue";

const factory = () => {
  return mount(UserTag as any, {
    propsData: {
      id: "userTag-1",
      userId: "2",
      name: "Itaewon",
    },
  });
};

describe("User Tag", () => {
  it("renders successfully", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find("#userTag-1").exists()).toBeTruthy();
  });

  it("receives props successfully", () => {
    const wrapper = factory();
    expect(wrapper.props()).toEqual({
      id: "userTag-1",
      userId: "2",
      name: "Itaewon",
    });
  });

  it("displays the correct user name", async () => {
    const wrapper = factory();
    const names = [
      "Itaewon",
      "Pabugnawan",
      "Hippodromo Barangay Hall",
    ];

    for(const name of names){
      await wrapper.setProps({ name: name });
      expect(wrapper.find("span").text()).toBe(name);
    }
  });

  it("emits an event when remove button is clicked", async () => {
    const wrapper = factory();
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted().removeSelected).toBeTruthy();
  });
});
