import { shallowMount } from "@vue/test-utils";
import ReceiveView from "@/views/Charity/ReceiveView.vue";

const transactionItem = () => {
    return {
        transactionID: 1,
        donorName: "DonorName 1",
        donorProfile: "default_profile.png",
        charityName: "Hippodromo Barangay Hall",
        charityProfile: "default_profile.png",
        transactionDate: "May 1, 2022",
        distance: "1.2 km away",
        deliveryMode: "Pick-up",
        requestTime: "8 AM",
        status: "Pending",
        deliveryNotes: "Please deliver the goods to the barangay hall.",
        optionalNotes: "Please deliver the goods to the barangay hall.",
        donateItemsList: [
          {
            itemID: 1,
            itemName: "Chicken Breast",
            foodType: "Meat and Poultry",
            lifeCycleStage: "In Storage",
            itemQuantity: "2 pieces",
            itemWeight: "1 kilo",
          },
          {
            itemID: 2,
            itemName: "Brussels Sprouts",
            foodType: "Fruits and Vegetables",
            lifeCycleStage: "Prepared",
            itemQuantity: "1 piece",
            itemWeight: "3 kilos",
          },
          {
            itemID: 3,
            itemName: "Tuna Panga",
            foodType: "Fish and Seafood",
            lifeCycleStage: "In Storage",
            itemQuantity: "2 pieces",
            itemWeight: "0.25 kilos",
          },
          {
            itemID: 4,
            itemName: "Duck Eggs",
            foodType: "Eggs and Dairy",
            lifeCycleStage: "Prepared",
            itemQuantity: "2 pieces",
            itemWeight: "0.2 kilos",
          },
        ],
    };
};

const factory = () => {
    return shallowMount(ReceiveView as any, {
        data() {
            return {
                role: "Charity",
                transactionList: [] as Array<any>,
                awaiting: true,
                completed: false,
                cancelled: false,
            };
        },
    });
};

describe("Receive View", () => {
    it("role should contain Charity", () => {
        const wrapper = factory();
        expect(wrapper.vm.role).toContain("Charity");
    });
    it("awaitng variable is true", () => {
        const wrapper = factory();
        expect(wrapper.vm.awaiting).toBe(true);
    });
    it("completed variable is false", () => {
        const wrapper = factory();
        expect(wrapper.vm.completed).toBe(false);
    });
    it("cancelled variable is false", () => {
        const wrapper = factory();
        expect(wrapper.vm.cancelled).toBe(false);
    });
    it("it should contain sidebar", () => {
        const wrapper = factory();
        expect(wrapper.find("#sideBar").exists()).toBe(true);
    });
    it("it should contain a page title", () => {
        const wrapper = factory();
        expect(wrapper.find("h1").exists()).toBe(true);
    });
    it("runs the showTransactions method successfully", () => {
        const wrapper = factory();
        const showTransactionsMethod = jest.spyOn(wrapper.vm, "showTransactions");
        wrapper.vm.showTransactions(true, false, false);
        expect(showTransactionsMethod).toHaveBeenCalled();
    });
    it("runs the updateTitle method successfully", () => {
        const wrapper = factory();
        const updateTitleMethod = jest.spyOn(wrapper.vm, "updateTitle");
        wrapper.vm.updateTitle();
        expect(updateTitleMethod).toHaveBeenCalled();
    });
    it("updateTitle method returns the correct values", () => {
        const wrapper = factory();
        const updateTitleMethod = jest.spyOn(wrapper.vm, "updateTitle");
        wrapper.vm.updateTitle();

        wrapper.vm.awaiting = false;
        wrapper.vm.completed = true;
        wrapper.vm.updateTitle();

        wrapper.vm.completed = false;
        wrapper.vm.cancelled = true;
        wrapper.vm.updateTitle();

        expect(updateTitleMethod).toHaveBeenCalledTimes(3);
        expect(updateTitleMethod).nthReturnedWith(1, "Awaiting Transactions");
        expect(updateTitleMethod).nthReturnedWith(2, "Completed Transactions");
        expect(updateTitleMethod).nthReturnedWith(3, "Cancelled Transactions");
    });
    it("runs the getDisplayName method successfully", () => {
        const wrapper = factory();
        const getDisplayNameMethod = jest.spyOn(wrapper.vm, "getDisplayName");
        wrapper.vm.getDisplayName();
        expect(getDisplayNameMethod).toHaveBeenCalled();
    });
    it("getDisplayName method returns the correct display name", () => {
        const wrapper = factory();
        const getDisplayNameMethod = jest.spyOn(wrapper.vm, "getDisplayName");
        wrapper.vm.getDisplayName();

        wrapper.vm.role = "Donor";
        wrapper.vm.getDisplayName();

        expect(getDisplayNameMethod).toHaveBeenCalledTimes(2);
        expect(getDisplayNameMethod).nthReturnedWith(1, "Donor");
        expect(getDisplayNameMethod).nthReturnedWith(2, "Charity");
    });
    it("runs the getTransactionUser method successfully", () => {
        const wrapper = factory();
        const getTransactionUserMethod = jest.spyOn(wrapper.vm, "getTransactionUser");
        wrapper.vm.getTransactionUser(transactionItem());
        expect(getTransactionUserMethod).toHaveBeenCalled();
    });
    it("runs the getTransactionProfile method successfully", () => {
        const wrapper = factory();
        const getTransactionProfileMethod = jest.spyOn(wrapper.vm, "getTransactionProfile");
        wrapper.vm.getTransactionProfile(transactionItem());
        expect(getTransactionProfileMethod).toHaveBeenCalled();
    });
});