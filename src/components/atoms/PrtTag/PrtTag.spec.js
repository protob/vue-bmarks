import { shallowMount } from "@vue/test-utils";
import PrtTag from "./PrtTag.vue";

describe("PrtTag.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtTag);
    expect(component.contains(".prt-tag")).toBe(true);
  });
});

