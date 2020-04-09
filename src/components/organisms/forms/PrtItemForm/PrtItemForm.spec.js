import { shallowMount } from "@vue/test-utils";
import PrtItemForm from "./PrtItemForm.vue";

describe("PrtItemForm.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtItemForm);
    expect(component.contains(".prt-item-form")).toBe(true);
  });
});

