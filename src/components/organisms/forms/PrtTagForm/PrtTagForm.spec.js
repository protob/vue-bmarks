import { shallowMount } from "@vue/test-utils";
import PrtTagForm from "./PrtTagForm.vue";

describe("PrtTagForm.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtTagForm);
    expect(component.contains(".prt-tag-form")).toBe(true);
  });
});

