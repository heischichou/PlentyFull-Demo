import { mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import Registry from "@/views/Admin/RegistryView.vue";

declare interface Request {
  id: string;
  requestName: string;
  organizationType: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  proof: string;
  createdAt: string;
}

declare interface User {
  userId: string;
  name: string;
  address: string;
  contact: string;
  userType: string;
  verified: string;
}

const requests = () => {
  return [
    {
      id: uuid.v1(),
      requestName: "Cebu Food Bank",
      organizationType: "Charity",
      description:
        "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
      location: "CMG Bldg, M. C. Briones St, Tipolo, Mandaue City",
      email: "info@cebufoodbank.com",
      phone: "(32) 417 3322",
      proof: "https://my.alfred.edu/zoom/_images/foster-lake.jpg",
      createdAt: new Date().toString(),
    },
    {
      id: uuid.v1(),
      requestName: "JPIC-IDC Inc.",
      organizationType: "Charity",
      description:
        "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
      location: "CMG Bldg, M. C. Briones St, Tipolo, Mandaue City",
      email: "info@JPIC.com",
      phone: "(32) 417 3322",
      proof: "https://www.imagelighteditor.com/img/bg-after.jpg",
      createdAt: new Date().toString(),
    },
    {
      id: uuid.v1(),
      requestName: "Hipodromo Barangay Hall",
      organizationType: "Charity",
      description:
        "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
      location: "CMG Bldg, M. C. Briones St, Tipolo, Mandaue City",
      email: "info@Hipodromo.com",
      phone: "(32) 417 3322",
      proof: "sampleImage.img",
      createdAt: new Date().toString(),
    },
  ] as Request[];
};

const members = () => {
  return [
    {
      userId: "1",
      name: "Hippodromo Barangay Hall",
      address: "Hippodromo, Cebu City",
      contact: "032 233 1311",
      userType: "Charity",
      verified: "Yes",
    },
    {
      userId: "2",
      name: "Itaewon",
      address: "Juan Luna Ave, Cebu City",
      contact: "032 233 1311",
      userType: "Donor",
      verified: "Yes",
    },
    {
      userId: "3",
      name: "JPIC-IDC Inc.",
      address: "Maguikay, Mandaue City",
      contact: "032 233 1311",
      userType: "Charity",
      verified: "Yes",
    },
    {
      userId: "4",
      name: "Mayeen’s Catering Services",
      address: "Cebu City",
      contact: "032 233 1311",
      userType: "Donor",
      verified: "Yes",
    },
    {
      userId: "5",
      name: "Pabugnawan",
      address: "Sitio Nasipit, Cebu City",
      contact: "032 233 1311",
      userType: "Donor",
      verified: "Yes",
    },
  ] as User[];
};

const factory = (sortedRequests: Request[]) => {
  return mount(Registry as any, {
    data() {
      return {
        role: "Admin",
        activeTab: "Registration",
        show: true,
        requests: requests(),
        sortedRequests: sortedRequests,
        members: members(),
        selectedUsers: [
          {
            userId: "1",
            name: "Hippodromo Barangay Hall",
            address: "Hippodromo, Cebu City",
            contact: "032 233 1311",
            userType: "Charity",
            verified: "Yes",
          },
          {
            userId: "2",
            name: "Itaewon",
            address: "Juan Luna Ave, Cebu City",
            contact: "032 233 1311",
            userType: "Donor",
            verified: "Yes",
          },
          {
            userId: "5",
            name: "Pabugnawan",
            address: "Sitio Nasipit, Cebu City",
            contact: "032 233 1311",
            userType: "Donor",
            verified: "Yes",
          },
        ],
        visibleButtons: 0,
        totalRequests: 0,
        perPage: 3,
        currentPage: 1,
      };
    },
  });
};

describe("Registry View", () => {
  it("renders successfully", () => {
    const wrapper = factory([]);
    expect(wrapper.exists()).toBe(true);
  });

  it("contains sidebar", () => {
    const wrapper = factory([]);
    expect(wrapper.find("#sideBar").exists()).toBe(true);
  });

  it("contains page title", () => {
    const wrapper = factory([]);
    expect(wrapper.find("h1").exists()).toBe(true);
  });

  it("getTotalRequests() computed property returns the correct number of requests", async () => {
    const wrapper = factory([]);
    const mockGetTotalRequests = jest.spyOn(
      wrapper.vm,
      "getTotalRequests",
      "get"
    );
    await wrapper.vm.getTotalRequests;
    expect(mockGetTotalRequests).toHaveBeenCalled();
    expect(mockGetTotalRequests).toHaveReturnedWith(3);
  });

  it("setVisibleButtons() computed property returns the correct number of visible buttons", async () => {
    const wrapper = factory([]);
    const mockSetVisibleButtons = jest.spyOn(
      wrapper.vm,
      "setVisibleButtons",
      "get"
    );
    await wrapper.vm.setVisibleButtons;
    expect(mockSetVisibleButtons).toHaveBeenCalled();
    expect(mockSetVisibleButtons).toHaveReturnedWith(1);

    await wrapper.setData({ perPage: 2 });
    await wrapper.vm.setVisibleButtons;
    expect(mockSetVisibleButtons).toHaveReturnedWith(2);

    await wrapper.setData({ perPage: 3 });
    await wrapper.setData({ totalRequests: 9 });
    await wrapper.vm.setVisibleButtons;
    expect(mockSetVisibleButtons).toHaveReturnedWith(3);
  });

  it("runs switchTab() method successfully", async () => {
    const wrapper = factory([]);
    const tabs = [
      { name: "registrationTab", tab: "Registration" },
      { name: "membersTab", tab: "Members" },
      { name: "reportsTab", tab: "Reports" },
    ];
    let callbacks = 0;
    const mockSwitchTab = jest.spyOn(wrapper.vm, "switchTab");
    tabs.forEach((tab) => {
      wrapper.find(`#${tab.name}`).trigger("click");
      expect(mockSwitchTab).toHaveBeenCalledTimes(++callbacks);
      expect(wrapper.vm.activeTab).toEqual(tab.tab);
    });
  });

  it("runs toggleSideBar() method successfully", async () => {
    const wrapper = factory([]);
    const mockToggleSideBar = jest.spyOn(wrapper.vm, "toggleSidebar");
    wrapper.find({ ref: "sidebarToggle" }).trigger("click");
    expect(mockToggleSideBar).toHaveBeenCalled();
    expect(wrapper.vm.show).toBe(false);
  });

  it("hideSideBarText() method successfully returns correct value based on window size", async () => {
    const wrapper = factory([]);
    const mockHideSideBarText = jest.spyOn(wrapper.vm, "hideSideBarText");
    await window.dispatchEvent(new Event("resize"));
    await wrapper.vm.hideSideBarText();
    expect(mockHideSideBarText).toHaveBeenCalled();

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    await wrapper.vm.hideSideBarText();
    expect(wrapper.vm.show).toBe(true);

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 750,
    });
    await wrapper.vm.hideSideBarText();
    expect(wrapper.vm.show).toBe(false);

    expect(mockHideSideBarText).toHaveBeenCalledTimes(3);
  });

  it("onPageChange() method successfully returns the correct page number", async () => {
    const wrapper = factory([]);
    const mockOnPageChange = jest.spyOn(wrapper.vm, "onPageChange");
    wrapper.vm.onPageChange(2);
    expect(mockOnPageChange).toHaveBeenCalled();
    expect(wrapper.vm.currentPage).toBe(2);
  });

  it("renders the list of requests correctly", async () => {
    const wrapper = factory([]);
    await wrapper.vm.sortRequests();

    expect(wrapper.find("#requestsSection").exists()).toBe(true);
    expect(wrapper.findAll(".request").length).toEqual(
      wrapper.vm.sortedRequests.length
    );

    await wrapper.setData({ requests: [] });
    await wrapper.vm.sortRequests();
    expect(wrapper.find("#requestsSection").exists()).toBe(false);
    expect(wrapper.findAll(".request").length).toEqual(0);
  });

  it("runs sortRequests() method successfully", async () => {
    const wrapper = factory([]);
    const mockSortRequests = jest.spyOn(wrapper.vm, "sortRequests");
    wrapper.vm.sortRequests();
    expect(mockSortRequests).toHaveBeenCalled();
  });

  it("convertToDuration() method successfully returns the correct output", async () => {
    const wrapper = factory([]);
    const mockConvertToDuration = jest.spyOn(wrapper.vm, "convertToDuration");
    let callbacks = 0;
    const currentDate = new Date("7/14/2023 12:00:00 AM").toISOString();
    const testCases = [
      { createdAt: "7/14/2022 12:00:00 AM", output: "1 year ago" },
      { createdAt: "6/14/2023 12:00:00 AM", output: "1 month ago" },
      { createdAt: "7/13/2023 12:00:00 AM", output: "1 day ago" },
      { createdAt: "7/13/2023 11:00:00 AM", output: "13 hours ago" },
      { createdAt: "7/13/2023 11:59:00 PM", output: "1 minute ago" },
      { createdAt: "7/13/2023 11:59:59 PM", output: "1 second ago" },
      { createdAt: "7/14/2023 12:00:00 AM", output: "Just now" },
    ];
    testCases.forEach((testCase) => {
      expect(
        wrapper.vm.convertToDuration(testCase.createdAt, currentDate)
      ).toEqual(testCase.output);
      expect(mockConvertToDuration).toHaveBeenCalledTimes(++callbacks);
    });
  });
});
