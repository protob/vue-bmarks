import { shallowMount } from "@vue/test-utils";
import PrtFilterToolbar from "./PrtFilterToolbar.vue";

describe("PrtFilterToolbar.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtFilterToolbar);
    expect(component.contains(".prt-filter-toolbar")).toBe(true);
  });
});

