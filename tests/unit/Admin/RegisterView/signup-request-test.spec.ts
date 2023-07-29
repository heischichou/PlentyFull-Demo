import { mount } from "@vue/test-utils";
import { uuid } from "vue-uuid";
import SignUpRequest from "@/components/Admin/RegistryView/SignUpRequest.vue";

const stubRequest = () => {
    return {
        id: uuid.v1(),
        requestName: "Cebu Food Bank",
        organizationType: "Charity",
        description:
          "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
        location: "CMG Bldg, M. C. Briones St, Tipolo, Mandaue City",
        email: "info@cebufoodbank.com",
        phone: "(32) 417 3322",
        proof: "https://my.alfred.edu/zoom/_images/foster-lake.jpg",
        createdAt: "7/13/2023 12:21:00 AM",
    }
};

const factory = (request: Object) => {
    return mount(SignUpRequest as any, {
        propsData: {
            request: request,
            dateDuration: "2 hours ago",
        },          
    });  
};

describe("SignUp Request", () => {
    it("renders successfully", () => {
        const wrapper = factory(stubRequest());
        expect(wrapper.exists()).toBeTruthy();
    });

    it("receives props successfully", () => {
        const request = stubRequest();
        const wrapper = factory(request);
        expect(wrapper.props("request")).toStrictEqual(request);
        expect(wrapper.props("dateDuration")).toBe("2 hours ago");
    });

    it("renders sign up request details correctly", () => {
        const details = [
            { class: ".requestName", key: "requestName" },
            { class: ".orgType", key: "organizationType" },
            { class: ".description", key: "description" },
            { class: ".location", key: "location" },
            { class: ".email", key: "email" },
            { class: ".phone", key: "phone" },
        ];
        const wrapper = factory(stubRequest());

        expect(wrapper.find(".request").exists()).toBeTruthy();
        expect(wrapper.find(".dateDuration").exists()).toBeTruthy();
        expect(wrapper.find(".dateDuration").text()).toBe(wrapper.vm.dateDuration);
        expect(wrapper.find(".proof").exists()).toBeTruthy();
        expect(wrapper.find(".proof").attributes("href")).toBe(wrapper.vm.request.proof);
        
        details.forEach((detail) => {
            const requestWrapper = wrapper.find(detail.class);
            expect(requestWrapper.exists()).toBe(true);
            expect(requestWrapper.text()).toBe(wrapper.vm.request[detail.key]);
        });
    }); 
});