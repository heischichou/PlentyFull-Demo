import { mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import { Account } from "@/types/Admin";
import Registration from "@/components/Admin/RegistryView/UserRegistration/UserRegistration.vue";

const requests = () => {
  return [
    {
      id: uuid.v1(),
      name: "Cebu Food Bank",
      type: "Charity",
      bio: "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
      address: "CMG Bldg, M. C. Briones St, Tipolo, Mandaue City",
      email: "info@cebufoodbank.com",
      contact: "(32) 417 3322",
      proof: "https://my.alfred.edu/zoom/_images/foster-lake.jpg",
      createdAt: new Date().toString(),
    },
    {
      id: uuid.v1(),
      name: "JPIC-IDC Inc.",
      type: "Charity",
      bio: "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
      address: "CMG Bldg, M. C. Briones St, Tipolo, Mandaue City",
      email: "info@JPIC.com",
      contact: "(32) 417 3322",
      proof: "https://www.imagelighteditor.com/img/bg-after.jpg",
      createdAt: "7/13/2023 2:00:00 AM",
    },
    {
      id: uuid.v1(),
      name: "Hipodromo Barangay Hall",
      type: "Charity",
      bio: "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
      address: "CMG Bldg, M. C. Briones St, Tipolo, Mandaue City",
      email: "info@Hipodromo.com",
      contact: "(32) 417 3322",
      proof: "sampleImage.img",
      createdAt: "7/12/2023 1:50:00 AM",
    },
  ] as Account[];
};

const factory = (registrants: Account[]) => {
  return mount(Registration as any, {
    data() {
      return {
        registrants: registrants,
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
    const wrapper = factory(requests());
    expect(wrapper.exists()).toBeTruthy();
  });

  it("getTotalRegistrants() computed property returns the correct number of requests", async () => {
    const wrapper = factory(requests());
    const mockGetTotalRegistrants = jest.spyOn(
      wrapper.vm,
      "getTotalRegistrants",
      "get"
    );

    await wrapper.vm.getTotalRegistrants;
    expect(mockGetTotalRegistrants).toHaveBeenCalled();
    expect(mockGetTotalRegistrants).toHaveReturnedWith(3);
  });

  it("setVisibleButtons() computed property returns the correct number of visible buttons", async () => {
    const wrapper = factory(requests());
    const mockSetVisibleButtons = jest.spyOn(
      wrapper.vm,
      "setVisibleButtons",
      "get"
    );
    const states = [
      {
        data: {
          perPage: 3,
        },
        expected: 1,
      },
      {
        data: {
          perPage: 2,
        },
        expected: 2,
      },
      {
        data: {
          perPage: 3,
          totalRequests: 9,
        },
        expected: 3,
      },
    ];
    let callbacks = 0;

    for (const state of states) {
      await wrapper.setData(state.data);
      await wrapper.vm.setVisibleButtons;
      expect(mockSetVisibleButtons).toHaveBeenCalledTimes(++callbacks);
      expect(mockSetVisibleButtons).toHaveReturnedWith(state.expected);
    }
  });

  it("onPageChange() method successfully returns the correct page number", async () => {
    const wrapper = factory([]);
    const mockOnPageChange = jest.spyOn(wrapper.vm, "onPageChange");

    wrapper.vm.onPageChange(2);
    expect(mockOnPageChange).toHaveBeenCalled();
    expect(wrapper.vm.currentPage).toEqual(2);
  });

  it("renders Registrants correctly", async () => {
    const wrapper = factory([]);
    const states = [
      {
        requests: requests(),
        boolean: true,
      },
      {
        requests: [],
        boolean: false,
      },
    ];

    for (const state of states) {
      await wrapper.setData({ registrants: state.requests });
      expect(wrapper.find("#userRegistration").exists()).toBe(state.boolean);
      expect(wrapper.findAll(".registrant").length).toEqual(
        state.requests.length
      );
    }
  });

  it("convertToDuration() method successfully returns the correct output", async () => {
    const wrapper = factory([]);
    const mockConvertToDuration = jest.spyOn(wrapper.vm, "convertToDuration");
    const testCases = [
      { createdAt: "7/14/2022 12:00:00 AM", output: "1 year ago" },
      { createdAt: "6/14/2023 12:00:00 AM", output: "1 month ago" },
      { createdAt: "7/13/2023 12:00:00 AM", output: "1 day ago" },
      { createdAt: "7/13/2023 11:00:00 AM", output: "13 hours ago" },
      { createdAt: "7/13/2023 11:59:00 PM", output: "1 minute ago" },
      { createdAt: "7/13/2023 11:59:59 PM", output: "1 second ago" },
      { createdAt: "7/14/2023 12:00:00 AM", output: "Just now" },
    ];
    let callbacks = 0;

    const currentDate = new Date("7/14/2023 12:00:00 AM").toISOString();
    testCases.forEach((testCase) => {
      expect(
        wrapper.vm.convertToDuration(testCase.createdAt, currentDate)
      ).toEqual(testCase.output);
      expect(mockConvertToDuration).toHaveBeenCalledTimes(++callbacks);
    });
  });
});
