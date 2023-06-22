import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index";
import Statistics from "@/views/StatisticsView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

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

const factory = (role: String, data = {}) => {
  return mount(Statistics as any, {
    data() {
      return {
        role: role,
        ...data,
      };
    },
    global: {
      plugins: [router],
    },
  });
};

describe("Statistics page", () => {
  it("renders successfully", () => {
    const wrapper = factory("Donor", {});
    expect(wrapper.exists()).toBe(true);
  });

  it("renders statistical figures successfully", () => {
    const wrapper = factory("Donor", {});
    const figures = [
      {
        id: "#totalVolume",
        title: "Food Surplus Volume",
      },
      {
        id: "#donationCount",
        title: "Donations Per Location",
      },
      {
        id: "#transactionRates",
        title: "Rate of Successful Transactions",
      },
    ];

    figures.forEach((figure) => {
      const figureContainer = wrapper.find(figure.id);
      expect(figureContainer.exists()).toBe(true);

      const title = findByText(figureContainer, ".fw-semibold", figure.title);
      expect(title.text()).toEqual(figure.title);
      expect(figureContainer.find(".figure-description").exists()).toBe(true);
    });
  });

  it("conditionally renders the page Header correctly", async () => {
    const wrapper = factory("Administrator", {});
    const updates = [
      "Food Donation Count",
      "Successful Transactions Count",
    ]
    
    updates.forEach((update) => {
      const figure = findByText(wrapper, ".fw-semibold", update);
      expect(figure.exists()).toBe(true);
    });

    await wrapper.setData({ role: "Donor" });
    const figures = wrapper.findAll(".fw-semibold");
    figures.forEach((figure) => {
      updates.forEach((update) => {
        expect(figure.text()).not.toBe(update);
      });
    });
  });

  it("renders the Export dropdown correctly", async () => {
    const wrapper = factory("Administrator", {});
    expect(wrapper.find(".bi-download").exists()).toBe(false);

    await wrapper.setData({ role: "Donor" });
    expect(wrapper.find(".bi-download").exists()).toBe(true);
  });

  it("exports the raw data correctly", async () => {
    const mockExportAsCSV = jest.spyOn(
      Statistics.methods as any,
      "exportAsCSV"
    );
    const mockExportAsExcel = jest.spyOn(
      Statistics.methods as any,
      "exportAsExcel"
    );

    const wrapper = factory("Donor", {});
    const exportAsCSVButton = findByText(wrapper, ".dropdown-item", "CSV");
    const exportAsExcelButton = findByText(wrapper, ".dropdown-item", "Excel");
    await exportAsCSVButton.trigger("click");
    expect(mockExportAsCSV).toBeCalled();
    await exportAsExcelButton.trigger("click");
    expect(mockExportAsExcel).toBeCalled();
  });
});
