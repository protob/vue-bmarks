import { shallowMount } from "@vue/test-utils";
import PrtInput from "./PrtInput.vue";

describe("PrtInput.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtInput);
    expect(component.contains(".prt-input")).toBe(true);
  });
});

