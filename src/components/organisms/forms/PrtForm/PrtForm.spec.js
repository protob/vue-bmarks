import { shallowMount } from "@vue/test-utils";
import PrtForm from "./PrtForm.vue";

describe("PrtForm.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtForm);
    expect(component.contains(".prt-form")).toBe(true);
  });
});

