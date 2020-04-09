import { shallowMount } from "@vue/test-utils";
import PrtSelect from "./PrtSelect.vue";

describe("PrtSelect.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtSelect);
    expect(component.contains(".prt-select")).toBe(true);
  });
});

