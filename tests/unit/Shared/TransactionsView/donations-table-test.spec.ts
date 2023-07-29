import { mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import Donations from "@/components/Shared/TransactionsView/DonationsTable.vue";

const stubDonations = () => {
  return [
    {
      itemId: uuid.v1(),
      name: "Chicken Breast",
      type: "Meat and Poultry",
      stage: "In Storage",
      quantity: 2,
      weight: 1,
      createdAt: new Date().toString(),
    },
    {
      itemId: uuid.v1(),
      name: "Brussels Sprouts",
      type: "Fruits and Vegetables",
      stage: "Prepared",
      quantity: 1,
      weight: 3,
      createdAt: new Date().toString(),
    },
    {
      itemId: uuid.v1(),
      name: "Tuna Panga",
      type: "Fish and Seafood",
      stage: "In Storage",
      quantity: 2,
      weight: 0.25,
      createdAt: new Date().toString(),
    },
    {
      itemId: uuid.v1(),
      name: "Duck Eggs",
      type: "Eggs and Dairy",
      stage: "Prepared",
      quantity: 2,
      weight: 0.2,
      createdAt: new Date().toString(),
    },
  ];
};

const factory = (donations: Object) => {
  return mount(Donations as any, {
    data() {
      return {
        filterBy: "name",
        ascending: true,
        filteredDonations: [] as any[],
      };
    },
    propsData: {
      headers: [
        { key: "name", label: "Food Item Name" },
        { key: "type", label: "Food Type" },
        { key: "stage", label: "Life Cycle Stage" },
        { key: "quantity", label: "Quantity" },
        { key: "weight", label: "Weight" },
      ],
      donations: donations,
    },
  });
};

describe("Donations Table", () => {
  it("renders successfully", () => {
    const wrapper = factory(stubDonations());
    expect(wrapper.exists()).toBe(true);
  });

  it("receives props successfully", () => {
    const donations = stubDonations();
    const wrapper = factory(donations);
    expect(wrapper.props("donations")).not.toBeNull();
    expect(wrapper.props("donations")).toStrictEqual(donations);
  });

  it("renders the sorting columns successfully", async () => {
    const columns = [
      {
        key: "name",
        ref: "sortByName",
      },
      {
        key: "type",
        ref: "sortByType",
      },
      {
        key: "stage",
        ref: "sortByStage",
      },
      {
        key: "quantity",
        ref: "sortByQuantity",
      },
      {
        key: "weight",
        ref: "sortByWeight",
      },
    ];

    const wrapper = factory(stubDonations());
    columns.forEach((column) => {
      expect(wrapper.find({ ref: column.ref }).exists()).toBe(true);
    });
  });

  it("sorting columns filter correctly", async () => {
    const columns = [
      {
        key: "name",
        ref: "sortByName",
      },
      {
        key: "type",
        ref: "sortByType",
      },
      {
        key: "stage",
        ref: "sortByStage",
      },
      {
        key: "quantity",
        ref: "sortByQuantity",
      },
      {
        key: "weight",
        ref: "sortByWeight",
      },
    ];

    const wrapper = factory(stubDonations());
    columns.forEach((column) => {
      const sortingColumn = wrapper.find({ ref: column.ref });
      sortingColumn.trigger("click");
      expect(wrapper.vm.filterBy).toEqual(column.key);
    });
  });
});
