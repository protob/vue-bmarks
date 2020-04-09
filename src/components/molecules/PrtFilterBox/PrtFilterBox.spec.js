import { shallowMount } from "@vue/test-utils";
import PrtFilterBox from "./PrtFilterBox.vue";

describe("PrtFilterBox.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtFilterBox);
    expect(component.contains(".prt-filter-box")).toBe(true);
  });
});

