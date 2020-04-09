import { shallowMount } from "@vue/test-utils";
import PrtCheckbox from "./PrtCheckbox.vue";

describe("PrtCheckbox.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtCheckbox);
    expect(component.contains(".prt-checkbox")).toBe(true);
  });
});

