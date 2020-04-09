import { shallowMount } from "@vue/test-utils";
import PrtItem from "./PrtItem.vue";

describe("PrtItem.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtItem);
    expect(component.contains(".prt-item")).toBe(true);
  });
});

