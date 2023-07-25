import { VueWrapper, DOMWrapper, mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import FindUsers from "@/views/Shared/FindUsersView.vue";

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

declare interface User {
  userId: string;
  username: string;
  avatar: string;
  email: string;
  contact: string;
  address: string;
  description: string;
}

const users = () => {
  return [
    {
      userId: uuid.v1(),
      username: "Cebu Food Bank",
      avatar: "default_profile.png",
      email: "info@cebufoodbank.com",
      contact: "(32) 417 3322",
      address: "Pacific Square Building, Ayala Access Road, Cebu City",
      description:
        "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements. If the text label isn’t capitalized, it should use a different color, style, or layout from other text.",
    },
    {
      userId: uuid.v1(),
      username: "Hipodromo Barangay Hall",
      avatar:
        "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg",
      email: "info@hipodromoBarangayHall.com",
      contact: "(32) 233 1311",
      address: "664 Saint Joseph St., Barangay Hipodromo, Cebu City",
      description:
        "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements. If the text label isn’t capitalized, it should use a different color, style, or layout from other text.",
    },
    {
      userId: uuid.v1(),
      username: "JPIC-IDC Inc.",
      avatar:
        "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      email: "info@jpic-idc.org.ph",
      contact: "(32) 254 5254",
      address: "L. Jaime Street, Maguikay, Mandaue City",
      description:
        "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements. If the text label isn’t capitalized, it should use a different color, style, or layout from other text.",
    },
  ] as User[];
}

const factory = (users: User[]) => {
  return mount(FindUsers as any, {
    data() {
      return {
        role: "",
        searchText: "",
        searchBy: "Name",
        sortBy: "Distance",
        users: users,
        filteredUsers: [] as User[],
      };
    },
  });
};

describe("Find Users page", () => {
  it("renders successfully", () => {
    const wrapper = factory([]);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find("h1").exists()).toBeTruthy();
  });

  it("renders Search Bar successfully", () => {
    const wrapper = factory([]);
    expect(wrapper.find("#searchBar").exists()).toBeTruthy();
  });

  it("renders Search Bar dropdowns correctly", () => {
    const dropdowns = [
      {
        button: "searchBy",
        dropdown: "searchByDropdown",
        options: ["Name", "Address"],
      },
      {
        button: "sortBy",
        dropdown: "sortByDropdown",
        options: ["A to Z", "Z to A", "Distance"],
      },
    ];
    const wrapper = factory([]);

    dropdowns.forEach((dropdown) => {
      const button = wrapper.find(`#${dropdown.dropdown}`);
      expect(button.exists()).toBeTruthy();

      dropdown.options.forEach((option) => {
        const dropdownOption = findByText(button, ".dropdown-item", option);
        expect(dropdownOption.exists()).toBeTruthy();
      });
    });
  });

  it("runs setSearchBy() successfully", async () => {
    const wrapper = factory([]);
    const mockSetSearchBy = jest.spyOn(wrapper.vm, "setSearchBy");
    const options = [
      {
        name: "Name",
        wrapper: findByText(wrapper, ".dropdown-item", "Name")
      },
      {
        name: "Address",
        wrapper: findByText(wrapper, ".dropdown-item", "Address"),
      },
    ];

    options.forEach((option) => {
      option.wrapper.trigger("click");
      expect(mockSetSearchBy).toHaveBeenCalled();
      expect(wrapper.vm.searchBy).toEqual(option.name);
    });
  });

  it("runs setSortBy() successfully", async () => {
    const wrapper = factory([]);
    const mockSetSortBy = jest.spyOn(wrapper.vm, "setSortBy");
    const options = [
      {
        name: "A to Z",
        wrapper: findByText(wrapper, ".dropdown-item", "A to Z"),
      },
      {
        name: "Z to A",
        wrapper: findByText(wrapper, ".dropdown-item", "Z to A"),
      },
      {
        name: "Distance",
        wrapper: findByText(wrapper, ".dropdown-item", "Distance"),
      },
    ];

    options.forEach((option) => {
      option.wrapper.trigger("click");
      expect(mockSetSortBy).toHaveBeenCalled();
      expect(wrapper.vm.sortBy).toEqual(option.name);
    });
  });

  it("renders Users successfully", async () => {
    const userList = users();
    const wrapper = factory([]);

    expect(wrapper.find("#users").exists()).toBeFalsy();
    await wrapper.setData({ filteredUsers: userList });
    expect(wrapper.find("#users").exists()).toBeTruthy();
    expect(wrapper.findAll(".user").length).toEqual(userList.length);
  });
});
