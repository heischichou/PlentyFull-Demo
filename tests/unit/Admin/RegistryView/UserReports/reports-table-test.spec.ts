import { mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import { Header } from "@/types";
import { Report } from "@/types/Admin";
import Reports from "@/components/Admin/RegistryView/UserReports/ReportsTable.vue";

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
  return mount(Reports as any, {
    data() {
      return {
        filterBy: "violatorName",
        ascending: true,
        filteredReports: [] as Report[],
        searchText: "",
        selectedReport: {} as Report,
      };
    },
    propsData: {
      headers: [
        { key: "violatorName", label: "Violator" },
        { key: "reporterName", label: "Reporter" },
        { key: "reportType", label: "Report Type" },
        { key: "subject", label: "Subject" },
        { key: "actions", label: "" },
      ] as Header[],
      reports: reports,
    },
  });
};

describe("Reports Table", () => {
  it("renders successfully", () => {
    const wrapper = factory(stubReports());
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find("#searchBar").exists()).toBeTruthy();
  });

  it("receives props successfully", () => {
    const reports = stubReports();
    const wrapper = factory(reports);
    expect(wrapper.props("reports")).not.toBeNull();
    expect(wrapper.props("reports")).toStrictEqual(reports);
  });

  it("renders Reports correctly", async () => {
    const wrapper = factory([]);
    expect(wrapper.findAll(".report").length).toEqual(0);
    await wrapper.setProps({ reports: stubReports() });
    expect(wrapper.findAll(".report").length).not.toEqual(0);
  });

  it("runs setSearchText() correctly", async () => {
    const reports = stubReports();
    const states = [
      {
        searchText: "Cebu Food Bank",
        expectedLength: 1,
      },
      {
        searchText: "",
        expectedLength: reports.length,
      },
    ];
    const wrapper = factory(reports);
    const mockSetSearchText = jest.spyOn(
      wrapper.vm,
      "setSearchText"
    );
    let callbacks = 0;

    for (const state of states) {
      await wrapper.vm.setSearchText(state.searchText);
      expect(mockSetSearchText).toHaveBeenCalledTimes(++callbacks);
      expect(wrapper.vm.filteredReports.length).toEqual(state.expectedLength);
    }
  });

  it("runs setSelectedReport() correctly", async () => {
    const reports = stubReports();
    const wrapper = factory(reports);
    const rows = wrapper.findAll(".report");

    for (const [index, row] of rows.entries()) {
      const button = row.find(".btn-outline-primary");
      await button.trigger("click");
      expect(wrapper.vm.selectedReport).toEqual(reports[index]);
    }
  });

  it("renders the sorting columns successfully", async () => {
    const columns = [
      {
        key: "violatorName",
        ref: "sortByViolatorName",
      },
      {
        key: "reporterName",
        ref: "sortByReporterName",
      },
      {
        key: "reportType",
        ref: "sortByReportType",
      },
      {
        key: "subject",
        ref: "sortBySubject",
      },
    ];

    const wrapper = factory(stubReports());
    columns.forEach((column) => {
      expect(wrapper.find({ ref: column.ref }).exists()).toBe(true);
    });
  });

  it("sorting columns filter correctly", async () => {
    const columns = [
      {
        key: "violatorName",
        ref: "sortByViolatorName",
      },
      {
        key: "reporterName",
        ref: "sortByReporterName",
      },
      {
        key: "reportType",
        ref: "sortByReportType",
      },
      {
        key: "subject",
        ref: "sortBySubject",
      },
    ];

    const wrapper = factory(stubReports());
    columns.forEach((column) => {
      const sortingColumn = wrapper.find({ ref: column.ref });
      sortingColumn.trigger("click");
      expect(wrapper.vm.filterBy).toEqual(column.key);
    });
  });
});
