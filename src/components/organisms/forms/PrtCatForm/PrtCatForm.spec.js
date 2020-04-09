import { shallowMount } from "@vue/test-utils";
import PrtCatForm from "./PrtCatForm.vue";

describe("PrtCatForm.vue", () => {
  it("renders a component", () => {
    const component = shallowMount(PrtCatForm);
    expect(component.contains(".prt-cat-form")).toBe(true);
  });
});

