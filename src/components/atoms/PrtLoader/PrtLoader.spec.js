import { shallowMount } from "@vue/test-utils";
import PrtLoader from "./PrtLoader.vue";

describe("PrtLoader.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtLoader);
    expect(component.contains(".prt-loader")).toBe(true);
  });
});

