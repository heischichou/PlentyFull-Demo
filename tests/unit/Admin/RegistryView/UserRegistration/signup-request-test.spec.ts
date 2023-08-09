import { mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import { Account } from "@/types/Admin";
import SignUpRequest from "@/components/Admin/RegistryView/UserRegistration/SignUpRequest.vue";

const stubRegistrant = () => {
  return {
    id: uuid.v1(),
    name: "Cebu Food Bank",
    type: "Charity",
    bio: "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
    address: "CMG Bldg, M. C. Briones St, Tipolo, Mandaue City",
    email: "info@cebufoodbank.com",
    contact: "(32) 417 3322",
    proof: "https://my.alfred.edu/zoom/_images/foster-lake.jpg",
    createdAt: "7/13/2023 12:21:00 AM",
  } as Account;
};

const factory = (registrant: Object) => {
  return mount(SignUpRequest as any, {
    propsData: {
      registrant: registrant,
      dateDuration: "2 hours ago",
    },
  });
};

describe("SignUp Request", () => {
  it("renders successfully", () => {
    const wrapper = factory(stubRegistrant());
    expect(wrapper.exists()).toBeTruthy();
  });

  it("receives props successfully", () => {
    const registrant = stubRegistrant();
    const wrapper = factory(registrant);
    expect(wrapper.props()).toStrictEqual({
      registrant: registrant,
      dateDuration: "2 hours ago",
    });
  });

  it("renders sign up request details correctly", () => {
    const wrapper = factory(stubRegistrant());
    const details = [
      { class: ".registrant", key: undefined },
      { class: ".name", key: "name" },
      { class: ".type", key: "type" },
      { class: ".dateDuration", key: undefined },
      { class: ".bio", key: "bio" },
      { class: ".address", key: "address" },
      { class: ".email", key: "email" },
      { class: ".contact", key: "contact" },
      { class: ".proof", key: undefined },
    ];

    details.forEach((detail) => {
      const requestWrapper = wrapper.find(detail.class);
      expect(requestWrapper.exists()).toBeTruthy();

      if (detail.key !== undefined) {
        expect(requestWrapper.text()).toBe(
          wrapper.props("registrant")[detail.key]
        );
      }
    });

    expect(wrapper.find(".dateDuration").text()).toBe(
      wrapper.props("dateDuration")
    );
    expect(wrapper.find(".email").attributes("href")).toEqual(
      `mailto:${wrapper.props("registrant").email}`
    );
    expect(wrapper.find(".proof").attributes("href")).toEqual(
      wrapper.props("registrant").proof
    );
  });
});
