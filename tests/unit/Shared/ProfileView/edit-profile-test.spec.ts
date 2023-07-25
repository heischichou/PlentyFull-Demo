import { VueWrapper, DOMWrapper, mount } from "@vue/test-utils";
import Profile from "@/components/Shared/ProfileView/EditProfile.vue";

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

const factory = () => {
  return mount(Profile as any, {});
};

describe("Edit Profile", () => {
  it("renders successfully", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find("#editProfile").exists()).toBeTruthy();
  });

  it("renders the form's fields correctly", () => {
    const fields = [
      "name",
      "email",
      "contact",
      "bio",
      "streetAddress",
      "barangay",
      "municipality",
      "city",
      "province"
    ];
    const wrapper = factory();

    fields.forEach((field) => {
      expect(wrapper.find(`#${field}`).exists()).toBeTruthy();
    });
  });

  it("renders the form's buttons correctly", () => {
    const wrapper = factory();
    const buttons = [
      findByText(wrapper, ".btn", "Save Changes"),
      findByText(wrapper, ".btn", "Cancel"),
    ];

    buttons.forEach((button) => {
      expect(button.exists()).toBeTruthy();
    });
  });
});
