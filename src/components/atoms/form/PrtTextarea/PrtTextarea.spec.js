import { shallowMount } from "@vue/test-utils";
import PrtTextarea from "./PrtTextarea.vue";

describe("PrtTextarea.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtTextarea);
    expect(component.contains(".prt-textarea")).toBe(true);
  });
});

