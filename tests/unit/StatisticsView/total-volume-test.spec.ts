import { DOMWrapper, VueWrapper, shallowMount } from "@vue/test-utils";
import TotalVolume from "@/components/StatisticsView/TotalVolume.vue";

const findByText = (
  wrapper: VueWrapper<any>,
  selector: string,
  text: string
) => {
  return wrapper
    .findAll(selector)
    .filter((e: any) => e.text() === text)
    .at(0) as DOMWrapper<Element>;
};

const convertHex = (color: string) => {
  color = color.replace("#", "");
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const stubProps = () => {
  return {
    role: "Donor",
    basis: "Weekly",
    totalSurplusVolume: 1200,
    commonFoodType: {
      type: "Vegetables",
      percent: 48,
    },
    successRate: 86,
    chartData: {
      labels: [
        "Vegetables",
        "Meat & Poultry",
        "Eggs & Dairy",
        "Fish & Seafood",
      ],
      datasets: [
        {
          label: "Food Surplus Volume",
          data: [47, 32, 15, 8],
          backgroundColor: ["#113333", "#45bf5D", "#56f576", "#6ef997"],
        },
      ],
    },
  };
};

const factory = (props = {}) => {
  return shallowMount(TotalVolume as any, {
    propsData: {
      ...props,
    },
  });
};

describe("Total Food Surplus Volume component", () => {
  it("renders successfully", () => {
    const wrapper = factory(stubProps());
    expect(wrapper.exists()).toBe(true);
  });

  it("receives props successfully", () => {
    const wrapper = factory(stubProps());
    expect(wrapper.props()).toStrictEqual(stubProps());
  });

  it("renders statistical figures correctly", () => {
    const props = stubProps();
    const wrapper = factory(props);
    const { labels } = props.chartData;
    const { data, backgroundColor } = props.chartData.datasets[0];
    const pills = wrapper.findAll(".pill");

    expect(pills.length).toBe(labels.length);

    labels.forEach((label, index) => {
      const legendItem = findByText(wrapper, "p", data.at(index) + "kg");
      const pill = pills.at(index)?.attributes("style");

      expect(legendItem.exists()).not.toBe(undefined);
      expect(convertHex(backgroundColor.at(index) as string)).toBe(
        pill?.substring(pill.indexOf("rgb"), pill.length - 1)
      );
    });
  });

  it("renders report summary successfully", () => {
    const props = stubProps();
    const wrapper = factory(props);
    const { totalSurplusVolume, commonFoodType, successRate } = props;

    let summaryItem = findByText(wrapper, "h2", (totalSurplusVolume /1000) + "K+");
    expect(summaryItem.exists()).not.toBe(undefined);

    summaryItem = findByText(wrapper, "h2", commonFoodType.type);
    expect(summaryItem.exists()).not.toBe(undefined);

    summaryItem = findByText(wrapper, "h2", successRate + "%");
    expect(summaryItem.exists()).not.toBe(undefined);
  });

  it("renders Per Basis selector correctly", async () => {
    const wrapper = factory(stubProps());
    expect(wrapper.find(".dropdown-toggle").exists()).toBe(true);

    const options = wrapper.findAll(".dropdown-item");
    options.forEach(async (option: DOMWrapper<Element>) => {
      expect(["Weekly", "Monthly", "Yearly"]).toContain(option.text());
    });
  });

  it("emits Per Basis selector correctly", async () => {
    const wrapper = factory(stubProps());
    let button = findByText(wrapper, ".dropdown-item", "Weekly");

    // Barangay option
    await button.trigger("click");
    expect(wrapper.emitted("updateBasis")?.toString()).toEqual(button.text());

    // Municipality option
    button = findByText(wrapper, ".dropdown-item", "Monthly");
    await button.trigger("click");
    let emitted = wrapper.emitted("updateBasis");
    expect(emitted?.at(emitted.length - 1)?.toString()).toEqual(button.text());

    // City option
    button = findByText(wrapper, ".dropdown-item", "Yearly");
    await button.trigger("click");
    emitted = wrapper.emitted("updateBasis");
    expect(emitted?.at(emitted.length - 1)?.toString()).toEqual(button.text());
  });
});
