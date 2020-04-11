import { shallowMount } from "@vue/test-utils";
import PrtTaxForm from "./PrtTaxForm.vue";

describe("PrtTaxForm.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtTaxForm);
    expect(component.contains(".prt-tax-form")).toBe(true);
  });
});

