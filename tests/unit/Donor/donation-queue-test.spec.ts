import { DOMWrapper, VueWrapper, shallowMount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import DonationQueue from "@/components/Donor/DonationQueue.vue";

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

const queuers = () => {
  return [
    {
      queuerId: uuid.v1(),
      charityId: uuid.v1(),
      name: "Cebu Food Bank",
      status: "Pending",
      queuePos: "1",
      queueWeight: "1000",
      distance: 1100,
      donationsReceived: 1,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      queuerId: uuid.v1(),
      charityId: uuid.v1(),
      name: "Hippodromo Barangay Hall",
      status: "Pending",
      queuePos: "2",
      queueWeight: "1100",
      distance: 1300,
      donationsReceived: 2,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      queuerId: uuid.v1(),
      charityId: uuid.v1(),
      name: "JPIC-IDC Inc.",
      status: "Pending",
      queuePos: "3",
      queueWeight: "1200",
      distance: 1800,
      donationsReceived: 2,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  ];
};

const factory = () => {
  return shallowMount(DonationQueue as any, {
    data() {
      return {
        filterBy: "Priority Number",
        sortBy: "Ascending",
      };
    },
    propsData: {
      windowWidth: window.innerWidth,
      queuers: queuers(),
    },
  });
};

describe("Donation Queue", () => {
  it("renders successfully", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
  });
});
