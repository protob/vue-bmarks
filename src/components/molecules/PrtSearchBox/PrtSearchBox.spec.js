import { shallowMount } from "@vue/test-utils";
import PrtSearchBox from "./PrtSearchBox.vue";

describe("PrtSearchBox.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtSearchBox);
    expect(component.contains(".prt-search-box")).toBe(true);
  });
});

