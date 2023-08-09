import { mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import { Report } from "@/types/Admin";
import UserReports from "@/components/Admin/RegistryView/UserReports/UserReports.vue";

const stubReports = () => {
  return [
    {
      notificationId: uuid.v1(),
      reportId: uuid.v1(),
      senderId: uuid.v1(),
      violatorId: uuid.v1(),
      type: "Report",
      subject: "Phallus in Donation Post",
      message:
        "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
      violatorName: "Cebu Food Bank",
      reporterName: "Hippodromo Barangay Hall",
      reportType: "Inappropriate Content",
      resolved: false,
      anonymous: true,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      notificationId: uuid.v1(),
      reportId: uuid.v1(),
      senderId: uuid.v1(),
      violatorId: uuid.v1(),
      type: "Report",
      subject: "Berating Pick-up Staff",
      message:
        "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
      violatorName: "Hippodromo Barangay Hall",
      reporterName: "Mayeen's Catering Services",
      reportType: "Harassment/Ill Conduct",
      resolved: false,
      anonymous: true,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      notificationId: uuid.v1(),
      reportId: uuid.v1(),
      senderId: uuid.v1(),
      violatorId: uuid.v1(),
      type: "Report",
      subject: "Donating Expired Goods",
      message:
        "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
      violatorName: "Itaewon",
      reporterName: "JPIC-IDC Inc.",
      reportType: "Health & Safety Violations",
      resolved: false,
      anonymous: false,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  ] as Report[];
};

const factory = (reports: Report[]) => {
  return mount(UserReports as any, {
    data() {
      return {
        headers: [
          { key: "violatorName", label: "Violator" },
          { key: "reporterName", label: "Reporter" },
          { key: "reportType", label: "Report Type" },
          { key: "subject", label: "Subject" },
          { key: "actions", label: "" },
        ],
        reports: reports,
        visibleButtons: 0,
        totalReports: 0,
        perPage: 5,
        currentPage: 1,
      };
    },
  });
};

describe("User Reports", () => {
  it("renders successfully", () => {
    const wrapper = factory([]);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders Reports correctly", async () => {
    const wrapper = factory([]);
    const states = [
      {
        reports: [],
        boolean: false,
      },
      {
        reports: stubReports(),
        boolean: true,
      },
    ]
    for (const state of states) {
      await wrapper.setData({ reports: state.reports });
      expect(wrapper.find(".pagination").exists()).toBe(state.boolean);
      expect(wrapper.find("#reports").exists()).toBe(state.boolean);
      expect(wrapper.find("h3").exists()).toBe(!state.boolean);
    }
  });

  it("getTotalReports() computed property returns the correct number of requests", async () => {
    const wrapper = factory([]);
    const mockGetTotalReports = jest.spyOn(
      wrapper.vm,
      "getTotalReports",
      "get"
    );
    
    await wrapper.setData({ reports: stubReports() });
    await wrapper.vm.getTotalReports;
    expect(mockGetTotalReports).toHaveBeenCalled();
    expect(mockGetTotalReports).toHaveReturnedWith(3);
  });

  it("setVisibleButtons() computed property returns the correct number of visible buttons", async () => {
    const wrapper = factory([]);
    const mockSetVisibleButtons = jest.spyOn(
      wrapper.vm,
      "setVisibleButtons",
      "get"
    );
    await wrapper.setData({ reports: stubReports(), totalReports: 3 });
    await wrapper.vm.setVisibleButtons;
    expect(mockSetVisibleButtons).toHaveBeenCalled();
    expect(mockSetVisibleButtons).toHaveReturnedWith(1);

    await wrapper.setData({ totalReports: 15 });
    await wrapper.vm.setVisibleButtons;
    expect(mockSetVisibleButtons).toHaveReturnedWith(3);
  });
});
