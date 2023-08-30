import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index";
import { uuid } from "vue-uuid";
import { FoodItem } from "@/types/Donor";
import Donate from "@/views/Donor/DonateView.vue";

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

const foodItems = () => {
  return [
    {
      itemId: uuid.v1(),
      name: "Chicken Breast",
      type: "Meat and Poultry",
      stage: "In Storage",
      quantity: 2,
      weight: 1,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      itemId: uuid.v1(),
      name: "Brussels Sprouts",
      type: "Vegetables",
      stage: "Prepared",
      quantity: 1,
      weight: 3,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      itemId: uuid.v1(),
      name: "Tuna Panga",
      type: "Fish and Seafood",
      stage: "In Storage",
      quantity: 2,
      weight: 0.25,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      itemId: uuid.v1(),
      name: "Duck Eggs",
      type: "Eggs and Dairy",
      stage: "Prepared",
      quantity: 2,
      weight: 0.2,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  ] as FoodItem[];
};

const newItem = (name: string, quantity: number, weight: number) => {
  return {
    itemId: uuid.v1(),
    name: name,
    type: "Eggs and Dairy",
    stage: "In Storage",
    quantity: quantity,
    weight: weight,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  } as FoodItem;
};

const factory = (data = {}) => {
  return mount(Donate as any, {
    data() {
      return {
        windowWidth: window.innerWidth,
        foodTypes: [
          "Eggs and Dairy",
          "Fruits",
          "Vegetables",
          "Meat and Poultry",
          "Fish and Seafood",
          "Grains and Nuts",
        ],
        ...data,
      };
    },
    global: {
      plugins: [router],
    },
  });
};

describe("Donate page", () => {
  it("renders successfully", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find("#searchingForCharities").exists()).toBeTruthy();
    expect(wrapper.find("#donationQueue").exists()).toBeTruthy();
  });

  it("renders Food Items correctly", async () => {
    const itemList = foodItems();
    const wrapper = factory({ foodItems: [] });
    expect(wrapper.find("#foodItems").exists()).toBe(false);
    expect(wrapper.findAll(".food-item").length).toEqual(0);

    await wrapper.setData({ foodItems: itemList });
    expect(wrapper.find("#foodItems").exists()).toBeTruthy();

    const items = wrapper.findAll(".food-item");
    expect(wrapper.findAll(".food-item").length).toBeGreaterThan(0);
    items.forEach((item, index) => {
      const itemEntries = Object.entries(itemList[index]).filter(([key]) => {
        return key !== "itemId" && key !== "createdAt" && key !== "updatedAt";
      });

      itemEntries.forEach(([key, value]) => {
        let column =
          key === "quantity"
            ? findByText(item, "p", value.toString() + " pc.")
            : key === "weight"
            ? findByText(item, "p", value.toString() + " kilograms")
            : findByText(item, "p", value.toString());

        expect(column.exists()).toBeTruthy();
      });
    });
  });

  it("creates Food Items successfully", async () => {
    const mockCreateItem = jest.spyOn(Donate.methods as any, "createItem");
    const wrapper = factory({ foodItems: foodItems(), newItem: {} });
    const oldIndex = wrapper.vm.foodItems.length;
    expect(wrapper.findAll(".food-item").length).toEqual(oldIndex);

    await wrapper.setData({ newItem: newItem("Quail Eggs", 6, 0.2) });
    await wrapper.find({ ref: "newItem" }).trigger("click");
    expect(mockCreateItem).toBeCalled();
    expect(wrapper.findAll(".food-item").length).toEqual(oldIndex + 1);
  });

  it("removes Food Items successfully", async () => {
    const mockRemoveItem = jest.spyOn(Donate.methods as any, "removeItem");
    const wrapper = factory({ foodItems: foodItems() });
    const oldIndex = wrapper.findAll(".food-item").length;
    expect(wrapper.findAll(".food-item").length).toEqual(oldIndex);

    const deletedItem = wrapper.findAll(".food-item").at(0);
    await deletedItem?.find(".remove-item").trigger("click");
    expect(mockRemoveItem).toBeCalled();
    expect(wrapper.findAll(".food-item").length).toEqual(oldIndex - 1);
  });

  it("resets the Donation Form successfully", async () => {
    const mockResetForm = jest.spyOn(Donate.methods as any, "resetForm");
    const wrapper = factory({ foodItems: foodItems() });
    expect(wrapper.findAll(".food-item").length).toBeGreaterThan(0);

    const deletedItem = findByText(wrapper, ".btn", "Reset");
    await deletedItem.trigger("click");
    expect(mockResetForm).toBeCalled();
    expect(wrapper.findAll(".food-item").length).toEqual(0);
  });

  it("listens to window resize", async () => {
    const mockResizeEvent = jest.spyOn(Donate.methods as any, "onResize");
    const wrapper = factory({});
    await window.dispatchEvent(new Event("resize"));
    expect(mockResizeEvent).toBeCalled();
  });
});
