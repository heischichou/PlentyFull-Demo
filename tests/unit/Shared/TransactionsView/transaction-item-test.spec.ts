import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import TransactionItem from "@/components/Shared/TransactionsView/TransactionItem.vue";

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

const stubTransaction = () => {
  return {
    transactionId: uuid.v1(),
    donorName: "DonorName 1",
    donorAvatar:
      "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg",
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
  };
};

const factory = (role: string, windowWidth: number, transaction: Object) => {
  return mount(TransactionItem as any, {
    data() {
      return {
        headers: [
          { key: "name", label: "Food Item Name" },
          { key: "type", label: "Food Type" },
          { key: "stage", label: "Life Cycle Stage" },
          { key: "quantity", label: "Quantity" },
          { key: "weight", label: "Weight" },
        ],
      };
    },
    propsData: {
      role: role,
      windowWidth: windowWidth,
      transaction: transaction,
    },
  });
};

describe("Transaction Item", () => {
  it("renders successfully", () => {
    const wrapper = factory("Donor", window.innerWidth, stubTransaction());
    expect(wrapper.exists()).toBe(true);
  });

  it("receives props successfully", () => {
    const transaction = stubTransaction();
    const wrapper = factory("Donor", window.innerWidth, transaction);
    expect(wrapper.props("transaction")).not.toBeNull();
    expect(wrapper.props("transaction")).toStrictEqual(transaction);
  });

  it("renders the DonationsTable component successfully", () => {
    const wrapper = factory("Donor", window.innerWidth, stubTransaction());
    expect(wrapper.find(".donations-table").exists()).toBe(true);
  });

  it("table header contains the correct values", () => {
    const wrapper = factory("Donor", window.innerWidth, stubTransaction());
    expect(wrapper.vm.headers).not.toBeNull();
    expect(wrapper.vm.headers).toEqual([
      { key: "name", label: "Food Item Name" },
      { key: "type", label: "Food Type" },
      { key: "stage", label: "Life Cycle Stage" },
      { key: "quantity", label: "Quantity" },
      { key: "weight", label: "Weight" },
    ]);
  });

  it("runs the setURL() successfully", () => {
    const wrapper = factory("Donor", window.innerWidth, stubTransaction());
    const mockSetURL = jest.spyOn(wrapper.vm, "setURL");
    wrapper.vm.setURL(wrapper.vm.avatar);
    expect(mockSetURL).toHaveBeenCalled();
  });

  it("setURL() returns the correct URL", async () => {
    const wrapper = factory("Charity", window.innerWidth, stubTransaction());
    const mockSetURL = jest.spyOn(wrapper.vm, "setURL");

    wrapper.vm.setURL(wrapper.vm.avatar);
    expect(mockSetURL).toReturnWith(wrapper.props("transaction").donorAvatar);

    await wrapper.setProps({ role: "Donor" });
    wrapper.vm.setURL(wrapper.vm.avatar);
    expect(mockSetURL).toReturnWith(
      `${require("@/assets/images/Shared/" +
        wrapper.props("transaction").charityAvatar)}`
    );
  });

  it("truncateText() returns the correct string value", async () => {
    const wrapper = factory("Charity", window.innerWidth, stubTransaction());
    const mockTruncateText = jest.spyOn(wrapper.vm, "truncateText");

    wrapper.vm.truncateText("Cebu Food Bank");
    expect(mockTruncateText).toReturnWith("Cebu Food Bank");

    await wrapper.setProps({ windowWidth: 576 });
    wrapper.vm.truncateText("Cebu Food Bank");
    expect(mockTruncateText).toReturnWith("Cebu F...");
  });

  it("getTime() returns the correct string value", async () => {
    const wrapper = factory("Charity", window.innerWidth, stubTransaction());
    const mockGetTime = jest.spyOn(wrapper.vm, "getTime");

    wrapper.vm.getTime(
      "Sat Jul 04 2025 14:00:00 GMT+0800 (Philippine Standard Time)"
    );
    expect(mockGetTime).toReturnWith("2:00 PM");

    wrapper.vm.getTime(
      "Sat Jul 04 2025 9:00:00 GMT+0800 (Philippine Standard Time)"
    );
    expect(mockGetTime).toReturnWith("9:00 AM");
  });

  it("renders the transaction accordion header information successfully", async () => {
    const wrapper = factory("Donor", window.innerWidth, stubTransaction());

    expect(wrapper.find(".card-subtitle").exists()).toBe(true);
    expect(wrapper.find(".card-subtitle").text()).toEqual(
      `${wrapper.vm.getDate(wrapper.props("transaction").createdAt)} • ${
        wrapper.props("transaction").distance / 1000
      }km away`
    );

    expect(wrapper.find(".card-title").exists()).toBe(true);
    expect(wrapper.find(".card-title").text()).toEqual(
      wrapper.props("role") === "Charity"
        ? wrapper.props("transaction").donorName
        : wrapper.props("transaction").charityName
    );

    expect(wrapper.find(".avatar").exists()).toBe(true);
    expect(wrapper.find(".avatar").attributes("src")).toEqual(
      wrapper.vm.setURL(wrapper.vm.avatar)
    );

    expect(wrapper.find(".location-pin").exists()).toBe(true);
    expect(wrapper.find(".accordion-button").exists()).toBe(true);
  });

  it("renders the transaciton details successfully", () => {
    const wrapper = factory("Donor", window.innerWidth, stubTransaction());
    const details = wrapper.findAll("p.text-start");
    const detailsColumns = [
      `Donor Name: ${
        wrapper.props("role") === "Charity"
          ? wrapper.props("transaction").donorName
          : wrapper.props("transaction").charityName
      }`,
      `Request Time: ${wrapper.vm.getTime(
        wrapper.props("transaction").createdAt
      )}`,
      "Delivery Mode: " + wrapper.props("transaction").deliveryMode,
      "Status: " + wrapper.props("transaction").status,
      "Delivery Notes: " + wrapper.props("transaction").deliveryNotes,
      "Optional Notes: " + wrapper.props("transaction").optionalNotes,
    ];

    expect(wrapper.find(".accordion-collapse").exists()).toBe(true);
    expect(wrapper.find("h5.text-start").exists()).toBe(true);
    expect(wrapper.find("h5.text-start").text()).toEqual("Donation Details");
    details.forEach((detail, index) => {
      expect(detail.exists()).toBe(true);
      expect(detail.text()).toEqual(detailsColumns[index]);
    });
    expect(wrapper.find(".table").exists()).toBe(true);
  });

  it("conditionally renders the Receive button depending on role", async () => {
    const wrapper = factory("Donor", window.innerWidth, stubTransaction());

    let receiveButton = findByText(wrapper, ".btn", "Receive");
    expect(receiveButton).toBe(undefined);

    await wrapper.setProps({ role: "Charity" });
    receiveButton = findByText(wrapper, ".btn", "Receive");
    expect(receiveButton.exists()).toBe(true);
  });
});
