import { shallowMount } from "@vue/test-utils";
import PrtTags from "./PrtTags.vue";

describe("PrtTags.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtTags);
    expect(component.contains(".prt-tags")).toBe(true);
  });
});

