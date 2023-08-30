import { mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import { Account } from "@/types";
import FindComponent from "@/components/Shared/FindUsersView/FindComponent.vue";

const stubProps = () => {
  return {
    id: uuid.v1(),
    name: "JPIC-IDC Inc.",
    avatar:
      "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    email: "info@jpic-idc.org.ph",
    contact: "(32) 254 5254",
    address: "L. Jaime Street, Maguikay, Mandaue City",
    bio:
      "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements. If the text label isn’t capitalized, it should use a different color, style, or layout from other text.",
  } as Account;
};

const factory = (user: Account) => {
  return mount(FindComponent as any, {
    propsData: {
      user: user,
    },
  });
};

describe("Find Component", () => {
  it("receives props successfully", () => {
    const user = stubProps();
    const wrapper = factory(user);
    expect(wrapper.props("user")).toStrictEqual(user);
  });

  it("runs setURL() correctly", async () => {
    const wrapper = factory(stubProps());
    const mockSetURL = jest.spyOn(wrapper.vm, "setURL");

    wrapper.vm.setURL(wrapper.props("user").avatar);
    expect(mockSetURL).toHaveReturnedWith(wrapper.props("user").avatar);
    
    await wrapper.setProps({ user: { avatar: "default_profile.png" } });
    expect(mockSetURL).toHaveReturnedWith(
      `${require("@/assets/images/Shared/" + wrapper.props("user").avatar)}`
    );
  });

  it("renders User card correctly", () => {
    const cards = [
      { class: ".card-title", key: "name" },
      { class: ".card-subtitle", key: "address" },
      { class: ".bio", key: "bio" },
      { class: ".address", key: "address" },
      { class: ".email", key: "email" },
      { class: ".contact", key: "contact" },
    ];
    const wrapper = factory(stubProps());

    expect(wrapper.find(".avatar").exists()).toBeTruthy();
    expect(wrapper.find(".report-user").exists()).toBeTruthy();
    expect(wrapper.find(".geolocate").exists()).toBeTruthy();
    cards.forEach((card) => {
      const cardWrapper = wrapper.find(card.class);
      expect(cardWrapper.exists()).toBe(true);
      expect(cardWrapper.text()).toBe(wrapper.vm.user[card.key]);
    });
  });
});
