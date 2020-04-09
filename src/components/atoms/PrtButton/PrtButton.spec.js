import { shallowMount } from "@vue/test-utils";
import PrtButton from "./PrtButton.vue";

describe("PrtButton.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtButton);
    expect(component.contains(".prt-button")).toBe(true);
  });
});

