import { mount } from "@vue/test-utils";
import Pagination from "@/components/Admin/RegistryView/RegistryPagination.vue";

const factory = (props: Object) => {
  return mount(Pagination as any, {
    propsData: props,
  });
};

const stubRegistrationProps = () => {
  return {
    maxVisibleButtons: 1,
    totalItems: 3,
    perPage: 3,
    currentPage: 1,
  };
};

const stubReportsProps = () => {
  return {
    maxVisibleButtons: 1,
    totalItems: 15,
    perPage: 5,
    currentPage: 1,
  };
};

describe("Registry Pagination component", () => {
  it("renders successfully", () => {
    const wrapper = factory(stubRegistrationProps());

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(".pagination").exists()).toBeTruthy();
  });

  it("renders pagination buttons correctly", async () => {
    const wrapper = factory(stubRegistrationProps());
    expect(wrapper.find(".pagination").findAll("li").length).toBe(3);

    expect(wrapper.find(".previous").exists()).toBe(true);
    expect(wrapper.find(".previous").element.innerHTML).toContain("«");

    expect(wrapper.find(".next").exists()).toBe(true);
    expect(wrapper.find(".next").element.innerHTML).toContain("»");

    expect(wrapper.findAll(".pageBtn").length).toBe(1);
    expect(wrapper.find(".pageBtn").element.innerHTML).toContain("1");

    await wrapper.setProps({
      maxVisibleButtons: 3,
      totalItems: 9,
      totalPages: 3,
      currentPage: 1,
    });

    let number = 0;
    const buttons = wrapper.findAll(".pageBtn");
    expect(wrapper.findAll(".pageBtn").length).toBe(3);

    buttons.forEach((button) => {
      number++;
      expect(button.exists()).toBe(true);
      expect(button.element.innerHTML).toContain(number.toString());
    });
  });

  it("isInFirstPage() computed property successfully returns the correct value", async () => {
    const wrapper = factory(stubRegistrationProps());
    const mockIsInFirstPage = jest.spyOn(wrapper.vm, "isInFirstPage", "get");
    await wrapper.vm.isInFirstPage;
    expect(mockIsInFirstPage).toHaveBeenCalled();
    expect(mockIsInFirstPage).toHaveReturnedWith(true);

    await wrapper.setProps({ currentPage: 2 });
    await wrapper.vm.isInFirstPage;
    expect(mockIsInFirstPage).toHaveReturnedWith(false);
  });

  it("runs onClickPreviousPage() method successfully", async () => {
    const wrapper = factory(stubRegistrationProps());
    const mockOnClickPreviousPage = jest.spyOn(
      wrapper.vm,
      "onClickPreviousPage"
    );
    await wrapper.setProps({ currentPage: 2 });

    await wrapper.find(".previous").trigger("click");
    expect(mockOnClickPreviousPage).toHaveBeenCalled();
    expect(wrapper.emitted("pageChanged")?.[0][0]).toBe(1);
  });

  it("runs onClickNextPage() method successfully", async () => {
    const wrapper = factory(stubRegistrationProps());
    const mockOnClickNextPage = jest.spyOn(wrapper.vm, "onClickNextPage");

    await wrapper.find(".next").trigger("click");
    expect(mockOnClickNextPage).toHaveBeenCalled();
    expect(wrapper.emitted("pageChanged")?.[0][0]).toBe(2);
  });

  it("runs onClickPage() method successfully", async () => {
    const wrapper = factory(stubRegistrationProps());
    const mockOnClickPage = jest.spyOn(wrapper.vm, "onClickPage");

    await wrapper.find(".pageBtn").trigger("click");
    expect(mockOnClickPage).toHaveBeenCalled();
    expect(wrapper.emitted("pageChanged")?.[0][0]).toBe(1);
  });
});

describe("User Registration Pagination", () => {
  it("startPage() computed property successfully returns the correct value", async () => {
    const wrapper = factory(stubRegistrationProps());
    const mockStartPage = jest.spyOn(wrapper.vm, "startPage", "get");
    const states = [
      {
        props: undefined,
        expected: 1,
      },
      {
        props: {
          maxVisibleButtons: 3,
          totalItems: 9,
          totalPages: 3,
          currentPage: 9,
        },
        expected: 7,
      },
      {
        props: {
          maxVisibleButtons: 3,
          totalItems: 9,
          totalPages: 3,
          currentPage: 5,
        },
        expected: 4,
      },
    ];

    for (const state of states) {
      if (state.props !== undefined) {
        await wrapper.setProps(state.props);
      }
      await wrapper.vm.startPage;
      expect(mockStartPage).toHaveReturnedWith(state.expected);
      expect(mockStartPage).toHaveBeenCalled();
    }
  });

  it("getTotalPages() computed property successfully returns the correct value", async () => {
    const wrapper = factory(stubRegistrationProps());
    const mockGetTotalPages = jest.spyOn(wrapper.vm, "getTotalPages", "get");
    const states = [
      {
        props: undefined,
        expected: 1,
      },
      {
        props: { totalItems: 9, perPage: 3 },
        expected: 3,
      },
      {
        props: { totalItems: 6, perPage: 3 },
        expected: 2,
      },
    ];

    for (const state of states) {
      if (state.props !== undefined) {
        await wrapper.setProps(state.props);
      }
      await wrapper.vm.getTotalPages;
      expect(mockGetTotalPages).toHaveReturnedWith(state.expected);
    }
  });

  it("pages() computed property successfully returns the correct values", async () => {
    const wrapper = factory(stubRegistrationProps());
    const mockPages = jest.spyOn(wrapper.vm, "pages", "get");
    const expectedPages = [
      { pageNum: 1, isDisabled: true },
      { pageNum: 2, isDisabled: false },
      { pageNum: 3, isDisabled: false },
    ];
    await wrapper.vm.pages;
    expect(mockPages).toHaveBeenCalled();
    expect(mockPages).toHaveReturnedWith([{ pageNum: 1, isDisabled: true }]);

    await wrapper.setProps({
      maxVisibleButtons: 3,
      totalItems: 9,
      totalPages: 3,
    });
    await wrapper.vm.pages;
    expect(mockPages).toHaveReturnedWith(expectedPages);
  });

  it("isInLastPage() computed property successfully returns the correct value", async () => {
    const wrapper = factory(stubRegistrationProps());
    const mockIsInLastPage = jest.spyOn(wrapper.vm, "isInLastPage", "get");
    await wrapper.vm.isInLastPage;
    expect(mockIsInLastPage).toHaveBeenCalled();
    expect(mockIsInLastPage).toHaveReturnedWith(true);

    await wrapper.setProps({ currentPage: 2 });
    await wrapper.vm.isInLastPage;
    expect(mockIsInLastPage).toHaveReturnedWith(false);
  });
});

describe("User Reports Pagination", () => {
  it("startPage() computed property successfully returns the correct value", async () => {
    const wrapper = factory(stubReportsProps());
    const mockStartPage = jest.spyOn(wrapper.vm, "startPage", "get");
    const states = [
      {
        props: undefined,
        expected: 1,
      },
      {
        props: {
          maxVisibleButtons: 3,
          totalItems: 10,
          currentPage: 10,
        },
        expected: 8,
      },
      {
        props: {
          maxVisibleButtons: 3,
          totalItems: 15,
          currentPage: 5,
        },
        expected: 4,
      }
    ];

    for(const state of states){
      if (state.props !== undefined) {
        await wrapper.setProps(state.props);
      }
      await wrapper.vm.startPage;
      expect(mockStartPage).toHaveBeenCalled();
      expect(mockStartPage).toHaveReturnedWith(state.expected);
    }
  });

  it("getTotalPages() computed property successfully returns the correct value", async () => {
    const wrapper = factory(stubReportsProps());
    const mockGetTotalPages = jest.spyOn(wrapper.vm, "getTotalPages", "get");
    const states = [
      {
        totalItems: undefined,
        expected: 3,
      },
      {
        totalItems: 10,
        expected: 2,
      },
      {
        totalItems: 5,
        expected: 1,
      },
    ];

    for(const state of states){
      if(state.totalItems !== undefined){
        await wrapper.setProps({ totalItems: state.totalItems });
      }
      await wrapper.vm.getTotalPages;
      expect(mockGetTotalPages).toHaveBeenCalled();
      expect(mockGetTotalPages).toHaveReturnedWith(state.expected);
    }
  });

  it("pages() computed property successfully returns the correct values", async () => {
    const wrapper = factory(stubReportsProps());
    const mockPages = jest.spyOn(wrapper.vm, "pages", "get");
    const expectedPages = [
      { pageNum: 1, isDisabled: true },
      { pageNum: 2, isDisabled: false },
      { pageNum: 3, isDisabled: false },
    ];
    await wrapper.setProps({ totalItems: 5 });
    await wrapper.vm.pages;
    expect(mockPages).toHaveBeenCalled();
    expect(mockPages).toHaveReturnedWith([{ pageNum: 1, isDisabled: true }]);

    await wrapper.setProps({
      maxVisibleButtons: 3,
      totalItems: 15,
    });
    await wrapper.vm.pages;
    expect(mockPages).toHaveReturnedWith(expectedPages);
  });

  it("isInLastPage() computed property successfully returns the correct value", async () => {
    const wrapper = factory(stubReportsProps());
    const mockIsInLastPage = jest.spyOn(wrapper.vm, "isInLastPage", "get");
    await wrapper.setProps({ currentPage: 3 });
    await wrapper.vm.isInLastPage;
    expect(mockIsInLastPage).toHaveBeenCalled();
    expect(mockIsInLastPage).toHaveReturnedWith(true);

    await wrapper.setProps({ currentPage: 2 });
    await wrapper.vm.isInLastPage;
    expect(mockIsInLastPage).toHaveReturnedWith(false);
  });
});