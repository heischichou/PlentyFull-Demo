import { mount } from "@vue/test-utils";
import RequestsPagination from "@/components/Admin/RegistryView/RequestsPagination.vue";

const factory = () => {
    return mount(RequestsPagination as any, {
        propsData: {
            maxVisibleButtons: 1,
            totalRequests: 3,
            perPage: 3,
            currentPage: 1,
        },
    });
};

describe("Requests Pagination", () => {
    it("renders successfully", () => {
        const wrapper = factory();
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find(".pagination").exists()).toBe(true);
    });

    it("receives props successfully", () => {
        const wrapper = factory();
        expect(wrapper.props("maxVisibleButtons")).toBe(1);
        expect(wrapper.props("totalRequests")).toBe(3);
        expect(wrapper.props("perPage")).toBe(3);
        expect(wrapper.props("currentPage")).toBe(1);
    });

    it("renders pagination buttons correctly", async () => {
        const wrapper = factory();
        expect(wrapper.find(".pagination").findAll("li").length).toBe(3);

        expect(wrapper.find(".previous").exists()).toBe(true);
        expect(wrapper.find(".previous").element.innerHTML).toContain("«");

        expect(wrapper.find(".next").exists()).toBe(true);
        expect(wrapper.find(".next").element.innerHTML).toContain("»");

        expect(wrapper.findAll(".pageBtn").length).toBe(1);
        expect(wrapper.find(".pageBtn").element.innerHTML).toContain("1");

        await wrapper.setProps({ maxVisibleButtons: 3, totalRequests: 9, totalPages: 3, currentPage: 1});

        let number = 0;
        const buttons = wrapper.findAll(".pageBtn");
        expect(wrapper.findAll(".pageBtn").length).toBe(3);
    
        buttons.forEach((button) => {
            number++;
            expect(button.exists()).toBe(true);
            expect(button.element.innerHTML).toContain(number.toString());
            });
        });

    it("startPage() computed property successfully returns the correct value", async () => {
        const wrapper = factory();
        const mockStartPage = jest.spyOn(wrapper.vm, "startPage", "get");
        await wrapper.vm.startPage;
        expect(mockStartPage).toHaveBeenCalled();
        expect(mockStartPage).toHaveReturnedWith(1);

        await wrapper.setProps({ maxVisibleButtons: 3, totalRequests: 9, totalPages: 3, currentPage: 9});
        await wrapper.vm.startPage;
        expect(mockStartPage).toHaveReturnedWith(7);

        await wrapper.setProps({ maxVisibleButtons: 3, totalRequests: 9, totalPages: 3, currentPage: 5});
        await wrapper.vm.startPage;
        expect(mockStartPage).toHaveReturnedWith(4);
    });

    it("getTotalPages() computed property successfully returns the correct value", async () => {
        const wrapper = factory();
        const mockGetTotalPages = jest.spyOn(wrapper.vm, "getTotalPages", "get");
        await wrapper.vm.getTotalPages;
        expect(mockGetTotalPages).toHaveReturnedWith(1);

        await wrapper.setProps({ totalRequests: 9, perPage: 3 });
        await wrapper.vm.getTotalPages;
        expect(mockGetTotalPages).toHaveReturnedWith(3);

        await wrapper.setProps({ totalRequests: 6, perPage: 3 });
        await wrapper.vm.getTotalPages;
        expect(mockGetTotalPages).toHaveReturnedWith(2);
    });

    it("pages() computed property successfully returns the correct values", async () => {
        const wrapper = factory();
        const mockPages = jest.spyOn(wrapper.vm, "pages", "get");
        const expectedPages = [
            { pageNum: 1, isDisabled: true },
            { pageNum: 2, isDisabled: false },
            { pageNum: 3, isDisabled: false },
        ]
        await wrapper.vm.pages;
        expect(mockPages).toHaveBeenCalled();
        expect(mockPages).toHaveReturnedWith([{ pageNum: 1, isDisabled: true }]);

        await wrapper.setProps({ maxVisibleButtons: 3, totalRequests: 9, totalPages: 3, currentPage: 1});
        await wrapper.vm.pages;
        expect(mockPages).toHaveReturnedWith(expectedPages);
    });

    it("isInFirstPage() computed property successfully returns the correct value", async () => {
        const wrapper = factory();
        const mockIsInFirstPage = jest.spyOn(wrapper.vm, "isInFirstPage", "get");
        await wrapper.vm.isInFirstPage;
        expect(mockIsInFirstPage).toHaveBeenCalled();
        expect(mockIsInFirstPage).toHaveReturnedWith(true);

        await wrapper.setProps({ currentPage: 2 });
        await wrapper.vm.isInFirstPage;
        expect(mockIsInFirstPage).toHaveReturnedWith(false);
    });

    it("isInLastPage() computed property successfully returns the correct value", async () => {
        const wrapper = factory();
        const mockIsInLastPage = jest.spyOn(wrapper.vm, "isInLastPage", "get");
        await wrapper.vm.isInLastPage;
        expect(mockIsInLastPage).toHaveBeenCalled();
        expect(mockIsInLastPage).toHaveReturnedWith(true);

        await wrapper.setProps({ currentPage: 2 });
        await wrapper.vm.isInLastPage;
        expect(mockIsInLastPage).toHaveReturnedWith(false);
    });

    it("runs onClickPreviousPage() method successfully", async () => {
        const wrapper = factory();
        await wrapper.setProps({ currentPage: 2 });

        const mockOnClickPreviousPage = jest.spyOn(wrapper.vm, "onClickPreviousPage");
        await wrapper.find(".previous").trigger("click");
        expect(mockOnClickPreviousPage).toHaveBeenCalled();
        expect(wrapper.emitted("pageChanged")?.[0][0]).toBe(1);
    });

    it("runs onClickNextPage() method successfully", async () => {
        const wrapper = factory();
        const mockOnClickNextPage = jest.spyOn(wrapper.vm, "onClickNextPage");
        await wrapper.find(".next").trigger("click");
        expect(mockOnClickNextPage).toHaveBeenCalled();
        expect(wrapper.emitted("pageChanged")?.[0][0]).toBe(2);
    });

    it("runs onClickPage() method successfully", async () => {
        const wrapper = factory();
        const mockOnClickPage = jest.spyOn(wrapper.vm, "onClickPage");
        await wrapper.find(".pageBtn").trigger("click");
        expect(mockOnClickPage).toHaveBeenCalled();
        expect(wrapper.emitted("pageChanged")?.[0][0]).toBe(1);
    });
});