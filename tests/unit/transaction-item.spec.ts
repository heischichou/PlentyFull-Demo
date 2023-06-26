import { shallowMount } from "@vue/test-utils";
import TransactionItem from "@/components/TransactionItem.vue";

const transactionItem = () => {
    return {
        transactionID: 1,
        donorName: "DonorName 1",
        donorProfile: "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg",
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
    return shallowMount(TransactionItem as any, {
        propsData: {
            transItem: transactionItem(),
            displayName: "Donor",
            userName: "DonorName 1",
            userProfile: "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg",
        },
        data() {
            return {
              tableOptions: {
                searching: false,
                paging: false,
                info: false,
                lengthChange: false,
              },
              tableColumns: [
                { data: "itemName", title: "Food Item Name" },
                { data: "foodType", title: "Food Type" },
                { data: "lifeCycleStage", title: "Life Cycle Stage" },
                { data: "itemQuantity", title: "Quantity" },
                { data: "itemWeight", title: "Weight" },
              ],
            };
          },
    });
};

describe("Transaction Item", () => {
    it("renders the component successfully", () => {
        const wrapper = factory();
        expect(wrapper.findComponent(TransactionItem).exists()).toBe(true);
    });
    it("renders the DataTable component", () => {
        const wrapper = factory();
        expect(wrapper.findComponent({ name: "DataTable" }).exists()).toBe(true);
    });
    it("receives the transaction item prop successfully", () => {
        const wrapper = factory();
        expect(wrapper.props().transItem).not.toBeNull();
        expect(wrapper.props().transItem).toEqual(transactionItem());
    });
    it("receives the display name prop successfully", () => {
        const wrapper = factory();
        expect(wrapper.props().displayName).not.toBeNull();
        if(wrapper.props().displayName === "Donor"){
            expect(wrapper.props().displayName).toBe("Donor");
        }else if(wrapper.props().displayName === "Charity"){
            expect(wrapper.props().displayName).toBe("Charity");
        }
    });
    it("receives the user name prop successfully", () => {
        const wrapper = factory();
        expect(wrapper.props().userName).not.toBeNull();
        expect(wrapper.props().userName).toBe("DonorName 1");
    });
    it("receives the user name profile successfully", () => {
        const wrapper = factory();
        expect(wrapper.props().userProfile).not.toBeNull();
        expect(wrapper.props().userProfile).toBe("https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg");
    });
    it("tableOptions variable contains the correct values", () => {
        const wrapper = factory();
        expect(wrapper.vm.tableOptions).not.toBeNull();
        expect(wrapper.vm.tableOptions).toEqual({
            searching: false,
            paging: false,
            info: false,
            lengthChange: false,
        });
    });
    it("tableColumns contains the correct values", () => {
        const wrapper = factory();
        expect(wrapper.vm.tableOptions).not.toBeNull();
        expect(wrapper.vm.tableColumns).toEqual([
            { data: "itemName", title: "Food Item Name" },
            { data: "foodType", title: "Food Type" },
            { data: "lifeCycleStage", title: "Life Cycle Stage" },
            { data: "itemQuantity", title: "Quantity" },
            { data: "itemWeight", title: "Weight" },
        ]);
    });
    it("runs the isURL method successfully", () => {
        const wrapper = factory();
        const isUrlMethod = jest.spyOn(wrapper.vm, "isURL");
        wrapper.vm.isURL(wrapper.props().userProfile);
        expect(isUrlMethod).toHaveBeenCalled();
    });
    it("returns true if the profile image is a Url profile image", () => {
        const wrapper = factory();
        const isUrlMethod = jest.spyOn(wrapper.vm, "isURL");
        wrapper.vm.isURL(wrapper.props().userProfile);
        expect(isUrlMethod).toReturnWith(true);
      });
    it("returns false if the profile image is not a Url profile image", () => {
        const wrapper = factory();
        const isUrlMethod = jest.spyOn(wrapper.vm, "isURL");
        wrapper.vm.isURL("default_profile.png");
        expect(isUrlMethod).toReturnWith(false);
    });
    it("renders the component preview information successfully", () => {
        const wrapper = factory();
        const subtitles = wrapper.findAll(".card-subtitle");
        expect(wrapper.find("img").exists()).toBe(true);
        expect(wrapper.find(".card-title").exists()).toBe(true);
        subtitles.forEach((subtitle) => {
            expect(subtitle.exists()).toBe(true);
        });
        expect(wrapper.find("a.link-body-emphasis").exists()).toBe(true);
        expect(wrapper.find(".accordion-button").exists()).toBe(true);
    });
    it("renders the component details successfully", () => {
        const wrapper = factory();
        const details = wrapper.findAll("p.text-start");
        expect(wrapper.find(".accordion-collapse").exists()).toBe(true);
        expect(wrapper.find("h6.text-start").exists()).toBe(true);
        details.forEach((detail) => {
            expect(detail.exists()).toBe(true);
        });
        expect(wrapper.find(".table").exists()).toBe(true);
    });
    it("conditionally renders the component receive depending on displayName", () => {
        const wrapper = factory();
        if (wrapper.props().displayName === "Donor") {
            expect(wrapper.find("button").exists()).toBe(true);
            expect(wrapper.find("button").text()).toBe("Receive");    
        }else if (wrapper.props().displayName === "Charity") {
            expect(wrapper.find("button").exists()).toBe(false);
        }
    });
});