import { VueWrapper, DOMWrapper, mount } from "@vue/test-utils";
import SecurityAndLogin from "@/components/Shared/ProfileView/SecurityAndLogin.vue";

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
  return mount(SecurityAndLogin as any, {});
};

describe("Security and Login", () => {
  it("renders successfully", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find("#securityAndLogin").exists()).toBeTruthy();
  });

  it("renders the form's fields correctly", () => {
    const fields = [
      "oldPassword",
      "newPassword",
      "confirmPassword",
      "saveLogin",
      "confirmation",
    ];
    const wrapper = factory();

    fields.forEach((field) => {
      expect(wrapper.find(`#${field}`).exists()).toBeTruthy();
    });
  });

  it("renders the form's buttons correctly", () => {
    const wrapper = factory();
    const buttons = [
      findByText(wrapper, ".btn", "Update Password"),
      findByText(wrapper, ".btn", "Cancel"),
      findByText(wrapper, ".btn", "Confirm"),
    ];

    buttons.forEach((button) => {
      expect(button.exists()).toBeTruthy();
    });
  });
});
