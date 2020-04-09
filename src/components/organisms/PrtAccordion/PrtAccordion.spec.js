import { shallowMount } from "@vue/test-utils";
import PrtAccordion from "./PrtAccordion.vue";

describe("PrtAccordion.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtAccordion);
    expect(component.contains(".prt-accordion")).toBe(true);
  });
});

