import { mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import Transactions from "@/views/Shared/TransactionsView.vue";

const transactions = () => {
  return [
    {
      transactionId: uuid.v1(),
      donorName: "DonorName 1",
      donorAvatar: "default_profile.png",
      charityName: "Hippodromo Barangay Hall",
      charityAvatar: "default_profile.png",
      distance: 1200,
      deliveryMode: "Pick-up",
      status: "Pending",
      deliveryNotes: "Please deliver the goods to the barangay hall.",
      optionalNotes: "Please deliver the goods to the barangay hall.",
      donations: [
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
      ],
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      transactionId: uuid.v1(),
      donorName: "DonorName 2",
      donorAvatar:
        "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg",
      charityName: "JPIC-IDC Inc.",
      charityAvatar:
        "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg",
      distance: 1500,
      deliveryMode: "Pick-up",
      status: "Cancelled",
      deliveryNotes: "Please deliver the goods",
      optionalNotes: "Please deliver the goods",
      donations: [
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
      ],
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      transactionId: uuid.v1(),
      donorName: "DonorName 3",
      donorAvatar:
        "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      charityName: "Cebu Food Bank",
      charityAvatar:
        "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      distance: 2500,
      deliveryMode: "Pick-up",
      status: "Completed",
      deliveryNotes: "Please deliver the goods to the Food bank",
      optionalNotes: "Please deliver the goods to the Food bank",
      donations: [
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
      ],
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  ];
};

const factory = () => {
  return mount(Transactions as any, {
    data() {
      return {
        role: "Charity",
        windowWidth: window.innerWidth,
        transactions: transactions(),
        filteredTransactions: [] as Array<Object>,
        activeTab: "Completed",
      };
    },
  });
};

describe("Receive View", () => {
  it("renders successfully", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
  });

  it("contains sidebar", () => {
    const wrapper = factory();
    expect(wrapper.find("#sideBar").exists()).toBe(true);
  });

  it("contains a page title", () => {
    const wrapper = factory();
    expect(wrapper.find("h1").exists()).toBe(true);
  });

  it("setActiveTab() computed property returns the correct string", async () => {
    const mockSetActiveTab = jest.spyOn(
      Transactions.computed as any,
      "setActiveTab"
    );
    const wrapper = factory();
    expect(mockSetActiveTab).toReturnWith("Awaiting");

    await wrapper.setData({ role: "Donor" });
    await wrapper.vm.setActiveTab;
    expect(mockSetActiveTab).toReturnWith("Completed");
  });

  it("renders the list of transactions correctly", async () => {
    const wrapper = factory();
    await wrapper.vm.filterTransactions();

    expect(wrapper.find("#transactionsSection").exists()).toBe(true);
    expect(wrapper.findAll(".transaction").length).toEqual(
      wrapper.vm.filteredTransactions.length
    );

    await wrapper.setData({ transactions: [] });
    await wrapper.vm.filterTransactions();
    expect(wrapper.find("#transactionsSection").exists()).toBe(false);
    expect(wrapper.findAll(".transaction").length).toEqual(0);
  });

  it("runs switchTab() and filterTransactions() successfully", async () => {
    const wrapper = factory();
    const refs = [
      { name: "completedTab", tab: "Completed" },
      { name: "awaitingTab", tab: "Awaiting" },
      { name: "cancelledTab", tab: "Cancelled" },
    ];
    let callbacks = 0;
    const mocks = [
      jest.spyOn(wrapper.vm, "switchTab"),
      jest.spyOn(wrapper.vm, "filterTransactions"),
    ];

    refs.forEach((ref) => {
      wrapper.find({ ref: ref.name }).trigger("click");
      callbacks++;
      mocks.forEach((mock) => {
        expect(mock).toHaveBeenCalledTimes(callbacks);
      });
      expect(wrapper.vm.activeTab).toEqual(ref.tab);
    });
  });

  it("listens to window resize", async () => {
    const mockResizeEvent = jest.spyOn(Transactions.methods as any, "onResize");
    const wrapper = factory();

    await window.dispatchEvent(new Event("resize"));
    expect(mockResizeEvent).toBeCalled();
  });
});
