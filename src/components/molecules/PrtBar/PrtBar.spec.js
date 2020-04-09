import { shallowMount } from "@vue/test-utils";
import PrtBar from "./PrtBar.vue";

describe("PrtBar.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtBar);
    expect(component.contains(".prt-bar")).toBe(true);
  });
});

