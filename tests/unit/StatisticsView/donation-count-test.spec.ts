import { DOMWrapper, VueWrapper, shallowMount } from "@vue/test-utils";
import DonationCount from "@/components/StatisticsView/DonationCount.vue";

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
    governmentLevel: "Barangay",
    chartData: {
      labels: ["TALAMBAN", "MABOLO", "MANDAUE", "LAHUG"],
      datasets: [
        {
          label: "Donations Per Location",
          data: [21, 14, 8, 6],
          backgroundColor: ["#113333", "#45bf5D", "#56f576", "#6ef997"],
        },
      ],
    },
  };
};

const factory = (props = {}) => {
  return shallowMount(DonationCount as any, {
    propsData: {
      ...props,
    },
  });
};

describe("Donations Per Location", () => {
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
    const legends = wrapper.findAll(".chart-legend");

    expect(legends.length).toBe(labels.length);

    legends.forEach((legend, index) => {
      const legendItem = findByText(
        legend,
        "p",
        data.at(index) + " donations"
      );
      const pill = wrapper.findAll(".pill").at(index)?.attributes("style");

      expect(legendItem.exists()).not.toBe(undefined);
      expect(convertHex(backgroundColor.at(index) as string)).toBe(
        pill?.substring(pill.indexOf("rgb"), pill.length - 1)
      );
    });
  });

  it("renders Government Level selector correctly", async () => {
    const wrapper = factory(stubProps());
    expect(wrapper.find(".dropdown-toggle").exists()).toBe(true);

    const options = wrapper.findAll(".dropdown-item");
    options.forEach(async (option: DOMWrapper<Element>) => {
      expect(["Barangay", "Municipality", "City"]).toContain(option.text());
    });
  });

  it("emits Government Level selector correctly", async () => {
    const wrapper = factory(stubProps());
    let button = findByText(wrapper, ".dropdown-item", "Barangay");

    // Barangay option
    await button.trigger("click");
    expect(wrapper.emitted("updateGovernmentLevel")?.toString()).toEqual(
      button.text()
    );

    // Municipality option
    button = findByText(wrapper, ".dropdown-item", "Municipality");
    await button.trigger("click");
    let emitted = wrapper.emitted("updateGovernmentLevel");
    expect(emitted?.at(emitted.length - 1)?.toString()).toEqual(button.text());

    // City option
    button = findByText(wrapper, ".dropdown-item", "City");
    await button.trigger("click");
    emitted = wrapper.emitted("updateGovernmentLevel");
    expect(emitted?.at(emitted.length - 1)?.toString()).toEqual(button.text());
  });
});
