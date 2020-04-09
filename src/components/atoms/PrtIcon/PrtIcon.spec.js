import { shallowMount } from "@vue/test-utils";
import PrtIcon from "./PrtIcon.vue";

describe("PrtIcon.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtIcon);
    expect(component.contains(".prt-icon")).toBe(true);
  });
});

