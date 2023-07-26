import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import SearchingFor from "@/components/Donor/SearchingForCharities.vue";

const findByText = (
  wrapper: VueWrapper<any> | DOMWrapper<any>,
  selector: string,
  text: string
) => {
  return wrapper
    .findAll(selector)
    .filter((e: any) => e.text() === text)
    .at(0) as DOMWrapper<Element>;
};

const factory = (foundQueuers: Boolean) => {
  return mount(SearchingFor as any, {
    propsData: {
      windowWidth: window.innerWidth,
      foundQueuers: foundQueuers,
    },
  });
};

describe("Donation Queue", () => {
  it("renders successfully", () => {
    const wrapper = factory(false);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the searching progress correctly", async () => {
    const wrapper = factory(false);
    let header = findByText(wrapper, ".text-center", "Searching...");
    let subtitle = findByText(wrapper, "p", "Looking for receivers.");
    expect(header.exists()).toBe(true);
    expect(subtitle.exists()).toBe(true);
    expect(wrapper.find(".breeding-rhombus-spinner").exists()).toBe(true);
    expect(wrapper.find("svg").exists()).toBe(false);

    await wrapper.setProps({ foundQueuers: true });
    header = findByText(wrapper, ".text-center", "Found Receivers");
    subtitle = findByText(
      wrapper,
      "p",
      "You may proceed to the donation queue now."
    );
    expect(header.exists()).toBe(true);
    expect(subtitle.exists()).toBe(true);
    expect(wrapper.find("svg").exists()).toBe(true);
    expect(wrapper.find(".breeding-rhombus-spinner").exists()).toBe(false);
  });

  it("renders the control buttons correctly", async () => {
    const wrapper = factory(false);
    let controlButton = findByText(wrapper, ".btn", "Cancel Order");
    expect(controlButton.exists()).toBe(true);

    controlButton = findByText(wrapper, ".btn", "Go back");
    expect(controlButton.exists()).toBe(true);

    controlButton = findByText(wrapper, ".btn", "View Queue");
    expect(controlButton).toBe(undefined);

    await wrapper.setProps({ foundQueuers: true });
    controlButton = findByText(wrapper, ".btn", "View Queue");
    expect(controlButton.exists()).toBe(true);

    controlButton = findByText(wrapper, ".btn", "Go back");
    expect(controlButton).toBe(undefined);
  });
});
