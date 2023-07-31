import { mount } from "@vue/test-utils";
import UserTag from "@/components/Admin/UserTag.vue";

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
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("#userTag-1").exists()).toBe(true);
  });

  it("receives props successfully", () => {
    const wrapper = factory();
    expect(wrapper.props().id).toBe("userTag-1");
    expect(wrapper.props().userId).toBe("2");
    expect(wrapper.props().name).toBe("Itaewon");
  });

  it("displays the correct user name", async () => {
    const wrapper = factory();
    expect(wrapper.find("span").text()).toBe("Itaewon");

    await wrapper.setProps({ name: "Pabugnawan" });
    expect(wrapper.find("span").text()).toBe("Pabugnawan");

    await wrapper.setProps({ name: "Hippodromo Barangay Hall" });
    expect(wrapper.find("span").text()).toBe("Hippodromo Barangay Hall");
  });

  it("emits an event when remove button is clicked", async () => {
    const wrapper = factory();
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted().removeSelected).toBeTruthy();
  });
});
