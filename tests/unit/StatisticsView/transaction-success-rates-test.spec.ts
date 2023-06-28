import { DOMWrapper, VueWrapper, shallowMount } from "@vue/test-utils";
import TransactionSuccessRates from "@/components/StatisticsView/TransactionSuccessRates.vue";

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
    chartData: {
      labels: ["Successful", "Cancelled", "Aborted"],
      datasets: [
        {
          label: "Rate of Successful Transactions",
          data: [86, 10, 4],
          backgroundColor: ["#113333", "#45bf5D", "#56f576"],
        },
      ],
    },
  };
};

const factory = (props = {}) => {
  return shallowMount(TransactionSuccessRates as any, {
    propsData: {
      ...props,
    },
  });
};

describe("Rate of Successful Transactions", () => {
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
      const legendItem = findByText(legend, "p", data.at(index) + "%");
      const pill = legend.find(".pill").attributes("style");

      expect(legendItem.exists()).not.toBe(undefined);
      expect(convertHex(backgroundColor.at(index) as string)).toBe(
        pill?.substring(pill.indexOf("rgb"), pill.length - 1)
      );
    });
  });
});
