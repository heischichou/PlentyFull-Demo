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

declare interface Queuer {
  queuerId: string;
  charityId: string;
  name: string;
  status: string;
  queuePos: number;
  queueWeight: string;
  distance: number;
  donationsReceived: number;
  createdAt: string;
  updatedAt: string;
}

const queuers = () => {
  return [
    {
      queuerId: uuid.v1(),
      charityId: uuid.v1(),
      name: "Cebu Food Bank",
      status: "Pending",
      queuePos: 1,
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
      queuePos: 2,
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
      queuePos: 3,
      queueWeight: "1200",
      distance: 1800,
      donationsReceived: 2,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  ] as Queuer[];
};

const getOrdinalSuffix = (number: number) => {
  const suffix = ["th", "st", "nd", "rd"],
    v = number % 100;
  return number + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
};

const getTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours() % 12;
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const meridiem = date.getHours() < 12 ? "AM" : "PM";
  return `${hours}:${minutes} ${meridiem}`;
};

const factory = (windowWidth: number) => {
  return shallowMount(DonationQueue as any, {
    data() {
      return {
        filterBy: "Priority Number",
        sortBy: "Ascending",
      };
    },
    propsData: {
      windowWidth: windowWidth,
      queuers: queuers(),
    },
  });
};

describe("Donation Queue", () => {
  it("renders successfully", () => {
    const wrapper = factory(window.innerWidth);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders list of queuers correctly", () => {
    const wrapper = factory(window.innerWidth);
    const queuerList = queuers();
    const queuerAccordions = wrapper.findAll(".queuer");
    expect(queuerAccordions.length).toBeGreaterThan(0);

    queuerAccordions.forEach((accordion, index) => {
      const queuerEntries = Object.entries(queuerList[index]).filter(
        ([key]) => {
          return (
            key !== "status" &&
            key !== "queuerId" &&
            key !== "charityId" &&
            key !== "queueWeight" &&
            key !== "updatedAt"
          );
        }
      );

      queuerEntries.forEach(([key, value]) => {
        const column =
          key === "queuePos"
            ? findByText(
                accordion,
                "p",
                getOrdinalSuffix(value as number).toString()
              )
            : key === "createdAt"
            ? findByText(accordion, "p", getTime(value as string).toString())
            : key === "distance"
            ? findByText(
                accordion,
                "p",
                ((value as number) / 1000).toString() + "km away"
              )
            : key === "donationsReceived"
            ? findByText(
                accordion,
                "p",
                (value as number).toString() + "/3 received today"
              )
            : findByText(accordion, "p", value.toString());

        expect(column.exists()).toBe(true);
      });
    });
  });

  it("filters queuers correctly", async () => {
    const mockSetFilterBy = jest.spyOn(
      DonationQueue.methods as any,
      "setFilterBy"
    );
    const filters = [
      "Name",
      "Priority Number",
      "Queue Time",
      "Distance",
      "Donations Received",
    ];

    const wrapper = factory(window.innerWidth);
    filters.forEach((filter) => {
      const option = findByText(wrapper, ".dropdown-item", filter);

      expect(option.exists()).toBe(true);
      option.trigger("click");
      expect(mockSetFilterBy).toBeCalled();
      expect(wrapper.vm.filterBy).toEqual(filter);
    });

    expect(mockSetFilterBy).toBeCalledTimes(filters.length);
  });

  it("sorts queuers correctly", async () => {
    const mockSetSortBy = jest.spyOn(DonationQueue.methods as any, "setSortBy");
    let orders = ["Ascending", "Descending"];

    const wrapper = factory(window.innerWidth);
    orders.forEach((order) => {
      const option = findByText(wrapper, ".dropdown-item", order);

      expect(option.exists()).toBe(true);
      option.trigger("click");
      expect(mockSetSortBy).toBeCalled();
      expect(wrapper.vm.sortBy).toEqual(order);
    });

    expect(mockSetSortBy).toBeCalledTimes(orders.length);
  });

  it("confirms a transaction with a queuer successfully", async () => {
    const mockConfirmQueuer = jest.spyOn(
      DonationQueue.methods as any,
      "confirmQueuer"
    );

    const wrapper = factory(window.innerWidth);
    const confirmButton = findByText(wrapper, ".btn-secondary", "Confirm");
    expect(confirmButton.exists()).toBe(true);
    await confirmButton.trigger("click");
    expect(mockConfirmQueuer).toBeCalled();
  });

  it("declines a transaction with a queuer successfully", async () => {
    const mockDeclineQueuer = jest.spyOn(
      DonationQueue.methods as any,
      "declineQueuer"
    );

    const wrapper = factory(window.innerWidth);
    const declineButton = findByText(wrapper, ".btn", "Decline");
    expect(declineButton.exists()).toBe(true);
    await declineButton.trigger("click");
    expect(mockDeclineQueuer).toBeCalled();
  });
});
