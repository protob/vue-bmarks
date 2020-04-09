import { shallowMount } from "@vue/test-utils";
import PrtLoginForm from "./PrtLoginForm.vue";

describe("PrtLoginForm.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtLoginForm);
    expect(component.contains(".prt-login-form")).toBe(true);
  });
});

